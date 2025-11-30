const Game = {
    // State
    manifest: [],
    library: [], // Question Pool
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 0,
        best: 0
    },
    player: { face:null, gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },

    // --- INIT ---
    async init() {
        console.log("Engine: Booting v18...");
        
        // 1. Load User Data
        this.loadConfig();
        if(!this.player.face) this.player.face = FACES[Math.floor(Math.random() * FACES.length)];
        this.initScratchpad();

        // 2. Fetch Manifest (UI Names)
        await this.fetchManifest();

        // 3. Check Content (Loaded via HTML Scripts)
        if (this.library.length === 0) {
            alert("CRITICAL: No content files loaded.\nCheck console for file path errors.");
            return;
        }
        console.log(`Engine: ${this.library.length} questions loaded.`);

        // 4. Hide Loader
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'none';

        // 5. Navigation
        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            this.showSetup();
        } else {
            this.showMenu();
        }
    },

    // Called by content files
    addPack(pack) {
        if(!pack.questions) return;
        pack.questions.forEach(q => {
            q._src = pack.id;
            q._uid = pack.id + "_" + Math.random().toString(36).substr(2,9);
            this.library.push(q);
        });
        console.log(`Engine: Loaded Pack '${pack.name}'`);
    },

    // --- DATA ---
    loadConfig() {
        try {
            const d = localStorage.getItem('rogue_v18_clean');
            if(d) {
                const data = JSON.parse(d);
                this.config = data.config || this.config;
                this.player = data.player || this.player;
            }
        } catch(e) { console.error("Save read error", e); }
    },
    saveConfig() {
        localStorage.setItem('rogue_v18_clean', JSON.stringify({
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
        } catch(e) {
            console.log("Engine: Local/Offline Mode. Using simplified manifest.");
        }
        this.updateLoader(60);
    },

    // --- SETUP & SETTINGS ---
    showSetup() {
        this.safeClassAdd('menuScreen', 'hidden');
        this.safeClassRemove('setupScreen', 'hidden');
        this.renderSetupGrid();
    },

    renderSetupGrid() {
        const grid = document.getElementById('setupGrid');
        if(!grid) return;
        grid.innerHTML = "";

        // Determine available IDs from actual loaded library
        const availableIDs = [...new Set(this.library.map(q => q._src))];

        availableIDs.forEach(id => {
            // Try to find nice name in manifest, else use ID
            let meta = this.manifest.find(m => m.id === id) || { name: id.toUpperCase(), id: id };
            
            let div = document.createElement('div');
            div.className = 'lib-card selected'; // Default select all
            div.innerHTML = `<span>${meta.name}</span><span class="checkmark">✔</span>`;
            div.onclick = () => div.classList.toggle('selected');
            div.dataset.id = meta.id;
            grid.appendChild(div);
        });
    },

    finishSetup() {
        const selected = document.querySelectorAll('.lib-card.selected');
        if(selected.length === 0) return alert("Select at least one module!");
        
        this.config.activeFiles = Array.from(selected).map(el => el.dataset.id);
        this.saveConfig();
        this.safeClassAdd('setupScreen', 'hidden');
        this.showMenu();
    },

    openSettings() {
        this.safeClassRemove('settingsOverlay', 'hidden');
        const area = document.getElementById('settingsArea');
        area.innerHTML = "";
        
        const availableIDs = [...new Set(this.library.map(q => q._src))];
        
        availableIDs.forEach(id => {
            let isActive = this.config.activeFiles.includes(id);
            let meta = this.manifest.find(m => m.id === id) || { name: id.toUpperCase() };
            
            let row = document.createElement('div');
            row.className = "setting-row";
            row.innerHTML = `
                <span>${meta.name}</span>
                <div class="toggle-btn ${isActive ? 'active' : ''}" onclick="Game.toggleFile('${id}', this)">
                    <div class="toggle-knob"></div>
                </div>`;
            area.appendChild(row);
        });
    },

    toggleFile(id, btn) {
        if(this.config.activeFiles.includes(id)) {
            this.config.activeFiles = this.config.activeFiles.filter(x => x !== id);
            btn.classList.remove('active');
        } else {
            this.config.activeFiles.push(id);
            btn.classList.add('active');
        }
    },

    closeSettings() {
        if(this.config.activeFiles.length === 0) return alert("Must have at least one active module!");
        this.saveConfig();
        this.safeClassAdd('settingsOverlay', 'hidden');
        location.reload();
    },

    // --- MENU ---
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
                sDiv.innerHTML += `<div class="shop-item"><h3>${stat.toUpperCase()} ${lvl}</h3>${btn}</div>`;
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
        let cost = this.getCost(this.config.stats[stat]);
        if(this.config.gold >= cost && this.config.stats[stat] < 10) {
            this.config.gold -= cost; this.config.stats[stat]++; 
            this.saveConfig(); this.renderShops(); this.updateMenuUI();
        }
    },
    buyItem(key, cost) {
        if(this.config.gold >= cost) {
            this.config.gold -= cost; this.config.items[key]++; 
            this.saveConfig(); this.renderShops(); this.updateMenuUI();
        }
    },
    handleGear(id, cost) {
        if(this.player.unlockedGear.includes(id)) {
            let item = gearConfig.find(x=>x.id===id);
            if(this.player.gear[item.type] === id) this.player.gear[item.type] = 0; 
            else this.player.gear[item.type] = id;
        } else {
            if(this.config.gold >= cost) {
                this.config.gold -= cost;
                this.player.unlockedGear.push(id);
                let item = gearConfig.find(x=>x.id===id);
                this.player.gear[item.type] = id;
            }
        }
        this.saveConfig();
        this.renderShops();
        this.updateMenuUI();
    },

    switchTab(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        ['tabRun','shopStats','shopItems','shopGear'].forEach(id => {
             const el = document.getElementById(id);
             if(el) el.style.display = 'none';
        });
        
        if(tab === 'run') document.getElementById('tabRun').style.display = 'flex';
        else {
            const el = document.getElementById('shop'+tab.charAt(0).toUpperCase()+tab.slice(1));
            if(el) el.style.display = 'grid';
        }
    },

    // --- GAMEPLAY ---
    startRun() {
        let deck = this.library.filter(q => this.config.activeFiles.includes(q._src));
        
        // Fallback if selection is invalid/empty
        if(deck.length === 0) deck = this.library;
        
        // Apply Gear Stats
        let gearStats = { hp:0, time:0, gold:0 };
        Object.values(this.player.gear).forEach(id => {
            let g = gearConfig.find(x=>x.id===id);
            if(g) {
                if(g.stat.includes("Time")) gearStats.time += parseInt(g.stat.split('+')[1]);
                if(g.stat.includes("HP")) gearStats.hp += parseInt(g.stat.split('+')[1]);
                if(g.stat.includes("Gold")) gearStats.gold += parseInt(g.stat.split('+')[1]);
            }
        });

        this.run = {
            hp: 1 + Math.floor(this.config.stats.hearts/2) + gearStats.hp,
            score: 0,
            gold: 0,
            deck: deck, 
            playDeck: [], 
            timerMax: 30 + (this.config.stats.timer * 5) + gearStats.time,
            timeLeft: 30,
            freeze: false,
            chain: null,
            goldMulti: 1 + (this.config.stats.greed * 0.1) + (gearStats.gold / 100)
        };

        this.renderAvatar('g');
        this.safeClassAdd('menuScreen', 'hidden');
        this.safeClassRemove('gameScreen', 'hidden');
        this.updateHUD();
        this.nextQ();
    },

    nextQ() {
        if(this.run.hp <= 0) return this.gameOver();

        // Chain Logic
        if(this.run.chain) {
    