const Game = {
    // --- STATE ---
    manifest: [],
    library: [], 
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 1000,
        best: 0
    },
    player: { face:null, gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },

    // --- INIT ---
    async init() {
        console.log("Engine: Booting...");
        this.loadConfig();
        
        // Default Face
        if(!this.player.face) this.player.face = "😐";
        
        this.initScratchpad();
        
        // 1. Load Manifest
        await this.fetchManifest();

        // 2. Check Content (Loaded via script tags in index.html)
        // Wait a tick for scripts to register
        await new Promise(r => setTimeout(r, 200));

        if(this.library.length === 0) {
            console.warn("Engine: Library empty. Injecting Emergency Backup.");
            this.injectEmergencyQuestions();
        } else {
            console.log(`Engine: Content Ready. ${this.library.length} templates loaded.`);
        }

        // 3. Hide Loader
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = 0;
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }

        // 4. Navigation
        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            this.showSetup();
        } else {
            this.showMenu();
        }
    },

    // Content Registration
    addPack(pack) {
        if(!pack.questions) return;
        pack.questions.forEach(q => {
            q._src = pack.id; 
            q._uid = pack.id + "_" + Math.random().toString(36).substr(2,9);
            this.library.push(q);
        });
        console.log(`Engine: Registered ${pack.name} (${pack.questions.length} Qs)`);
    },

    // --- DATA & SAVES ---
    loadConfig() {
        try {
            const d = localStorage.getItem('rogueConfig_v15');
            if(d) {
                const data = JSON.parse(d);
                this.config = data.config || this.config;
                this.player = data.player || this.player;
            }
        } catch(e) { console.error("Save corrupt", e); }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v15', JSON.stringify({
            config: this.config,
            player: this.player
        }));
        this.updateMenuUI();
    },

    async fetchManifest() {
        this.updateLoader(30);
        try {
            const resp = await fetch('library.json');
            if(resp.ok) this.manifest = await resp.json();
            else throw new Error("404");
        } catch(e) {
            console.log("Engine: Local mode. Using fallback manifest.");
            this.manifest = [
                { id: 'math_aa_sl_may25', name: 'IB Math AA: May 2025' }
            ];
        }
        this.updateLoader(60);
    },

    injectEmergencyQuestions() {
        this.addPack({
            id: 'emergency',
            name: 'Backup Protocol',
            questions: [
                { type:'choice', subject:'System', topic:'Backup', gen:()=>({q:'2+2?', a:'4', w:['3','5','22']}) }
            ]
        });
        this.config.activeFiles = ['emergency'];
    },

    // --- HELPERS ---
    updateLoader(pct) { 
        const bar = document.getElementById('loaderBar');
        if(bar) bar.style.width = pct+"%"; 
    },
    safeClassRemove(id, cls) { const el = document.getElementById(id); if(el) el.classList.remove(cls); },
    safeClassAdd(id, cls) { const el = document.getElementById(id); if(el) el.classList.add(cls); },
    safeText(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; },
    
    formatMath(str) {
        if(!str) return "";
        let s = str.toString();
        if(s.match(/[\\^_{}]/) || s.includes('log') || s.includes('sin') || s.includes('pi')) return `$$ ${s} $$`;
        return s;
    },

    // --- MENU & SETUP ---
    showSetup() {
        this.safeClassAdd('menuScreen', 'hidden');
        this.safeClassRemove('setupScreen', 'hidden');
        const grid = document.getElementById('setupGrid');
        if(!grid) return;
        grid.innerHTML = "";
        
        // Get unique sources
        let sources = this.manifest.length > 0 
            ? this.manifest 
            : [...new Set(this.library.map(q => q._src))].map(s => ({id:s, name:s.toUpperCase()}));

        sources.forEach(lib => {
            let div = document.createElement('div');
            div.className = 'lib-card selected';
            div.innerHTML = `<span>${lib.name}</span><span class="checkmark">✔</span>`;
            div.onclick = () => div.classList.toggle('selected');
            div.dataset.id = lib.id;
            grid.appendChild(div);
        });
    },

    finishSetup() {
        const selected = document.querySelectorAll('.lib-card.selected');
        if(selected.length === 0) return alert("Select at least one!");
        this.config.activeFiles = Array.from(selected).map(el => el.dataset.id);
        this.saveConfig();
        this.safeClassAdd('setupScreen', 'hidden');
        this.showMenu();
    },

    showMenu() {
        this.safeClassRemove('menuScreen', 'hidden');
        this.updateMenuUI();
        this.renderShops();
        this.switchTab('run');
    },

    updateMenuUI() {
        this.safeText('menuGold', this.config.gold);
        this.safeText('menuBest', this.config.best);
        if(this.config.activeFiles) this.safeText('activeSubjectCount', this.config.activeFiles.length);
        this.renderAvatar('p');
    },

    renderAvatar(prefix) {
        this.safeText(prefix+'-face', this.player.face);
        const slots = ['head','body','main','off','feet'];
        slots.forEach(s => {
            let g = gearConfig.find(x => x.id === this.player.gear[s]);
            this.safeText(`${prefix}-${s}`, g ? g.icon : "");
        });
    },

    // --- SHOPS ---
    getCost(lvl) { return Math.floor(100 * Math.pow(1.5, lvl)); },
    
    renderShops() {
        // Stats
        const sDiv = document.getElementById('shopStats');
        if(sDiv) {
            sDiv.innerHTML = "";
            ['hearts', 'timer', 'greed'].forEach(stat => {
                let lvl = this.config.stats[stat];
                let cost = this.getCost(lvl);
                let btn = lvl >= 10 
                    ? `<button class="buy-btn" disabled>MAX</button>` 
                    : `<button class="buy-btn" onclick="Game.buyUpgrade('${stat}')">${cost}g</button>`;
                sDiv.innerHTML += `<div class="shop-item"><h3>${stat.toUpperCase()} ${lvl}</h3><p>Level ${lvl}</p>${btn}</div>`;
            });
        }
        // Items
        const iDiv = document.getElementById('shopItems');
        if(iDiv) {
            iDiv.innerHTML = "";
            [{k:'fifty',c:50},{k:'freeze',c:75},{k:'skip',c:100}].forEach(it => {
                let count = this.config.items[it.k];
                 iDiv.innerHTML += `<div class="shop-item"><h3>${it.k.toUpperCase()}</h3><p>Owned: ${count}</p><button class="buy-btn" onclick="Game.buyItem('${it.k}',${it.c})">${it.c}g</button></div>`;
            });
        }
        // Gear
        const gDiv = document.getElementById('shopGear');
        if(gDiv) {
            gDiv.innerHTML = "";
            gearConfig.forEach(g => {
                let owned = this.player.unlockedGear.includes(g.id);
                let equipped = this.player.gear[g.type] === g.id;
                let btnTxt = owned ? (equipped ? "UNEQUIP" : "EQUIP") : `${g.cost}g`;
                let style = equipped ? "background:var(--gold); color:black;" : (owned ? "background:#444" : "");
                gDiv.innerHTML += `<div class="shop-item"><div style="font-size:2rem">${g.icon}</div><h3>${g.name}</h3><p style="color:var(--gold)">${g.stat}</p><button class="buy-btn" style="${style}" onclick="Game.handleGear(${g.id}, ${g.cost})">${btnTxt}</button></div>`;
            });
        }
    },

    buyUpgrade(stat) {
        let lvl = this.config.stats[stat];
        let cost = this.getCost(lvl);
        if(this.config.gold >= cost && lvl < 10) {
            this.config.gold -= cost;
            this.config.stats[stat]++;
            this.saveConfig();
            this.renderShops();
            this.updateMenuUI();
        }
    },
    buyItem(key, cost) {
        if(this.config.gold >= cost) {
            this.c