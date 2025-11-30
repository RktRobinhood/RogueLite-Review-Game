const Game = {
    manifest: [],
    library: [],
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 0,
        best: 0
    },
    player: { face:null, gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false },

    // --- INIT ---
    async init() {
        this.loadConfig();
        if(!this.player.face) this.player.face = "😐"; // Default face
        
        await this.fetchManifest();
        await this.loadContent();
        
        // If no questions loaded, use emergency backup
        if(this.library.length === 0) {
            console.warn("Library empty. Injecting Emergency Protocol.");
            this.injectEmergencyQuestions();
        }

        document.getElementById('loader').classList.add('hidden');
        
        if(this.config.activeFiles.length === 0) {
            this.showSetup();
        } else {
            this.showMenu();
        }
    },

    loadConfig() {
        let d = localStorage.getItem('rogue_v11_master');
        if(d) {
            let data = JSON.parse(d);
            this.config = data.config || this.config;
            this.player = data.player || this.player;
        }
    },
    saveConfig() {
        localStorage.setItem('rogue_v11_master', JSON.stringify({
            config: this.config,
            player: this.player
        }));
        this.updateMenuUI();
    },

    async fetchManifest() {
        this.updateLoader(20);
        try {
            const resp = await fetch('library.json');
            if(!resp.ok) throw new Error();
            this.manifest = await resp.json();
        } catch(e) {
            console.log("Local mode detected. Using manual manifest.");
            this.manifest = [
                { id: 'math_core', name: 'IB Math Core', file: 'content/math_core.js' },
                { id: 'extras', name: 'Extras', file: 'content/extras.js' }
            ];
        }
        this.updateLoader(40);
    },

    async loadContent() {
        this.library = [];
        // Wait for scripts to parse
        await new Promise(r => setTimeout(r, 300));
        this.updateLoader(100);
    },

    addPack(pack) {
        pack.questions.forEach(q => {
            q._src = pack.id;
            this.library.push(q);
        });
        console.log(`Pack Loaded: ${pack.name} (${pack.questions.length})`);
    },
    
    injectEmergencyQuestions() {
        // Fallback if files fail
        this.addPack({
            id: 'emergency',
            name: 'Emergency Backup',
            questions: [
                { type:'choice', subject:'Math', topic:'Algebra', gen:()=>({q:'2+2=?', a:'4', w:['3','5','22']}) },
                { type:'choice', subject:'Math', topic:'Algebra', gen:()=>({q:'3x=12', a:'4', w:['3','9','36']}) },
                { type:'choice', subject:'Math', topic:'Calculus', gen:()=>({q:'d/dx (x^2)', a:'2x', w:['x','2','x^2']}) }
            ]
        });
        this.config.activeFiles = ['emergency']; // Force enable
    },

    // --- UI & MENU ---
    updateLoader(pct) { document.getElementById('loaderBar').style.width = pct+"%"; },

    showSetup() {
        document.getElementById('setupScreen').classList.remove('hidden');
        const grid = document.getElementById('setupGrid');
        grid.innerHTML = "";
        this.manifest.forEach(lib => {
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
        document.getElementById('setupScreen').classList.add('hidden');
        this.showMenu();
    },

    showMenu() {
        document.getElementById('menuScreen').classList.remove('hidden');
        this.updateMenuUI();
        this.renderShops();
        // Default Tab
        this.switchTab('stats'); 
    },

    updateMenuUI() {
        document.getElementById('menuGold').innerText = this.config.gold;
        document.getElementById('menuBest').innerText = this.config.best;
        this.renderAvatar('p');
    },

    renderAvatar(prefix) {
        document.getElementById(prefix+'-face').innerText = this.player.face;
        // Render Gear Icons (Simple text for now)
        const slots = ['head','body','main','off','feet'];
        slots.forEach(s => {
            let g = gearConfig.find(x => x.id === this.player.gear[s]);
            let el = document.getElementById(`${prefix}-${s}`);
            if(el) el.innerText = g ? g.icon : "";
        });
    },

    switchTab(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        // Find button by text or index (simplified)
        let btnMap = { 'stats':0, 'items':1, 'gear':2 };
        if(document.querySelectorAll('.nav-btn')[btnMap[tab]]) 
            document.querySelectorAll('.nav-btn')[btnMap[tab]].classList.add('active');

        ['shopStats','shopItems','shopGear'].forEach(id => document.getElementById(id).style.display = 'none');
        document.getElementById('shop'+tab.charAt(0).toUpperCase()+tab.slice(1)).style.display = 'grid';
    },

    // --- SHOPS ---
    renderShops() {
        // 1. UPGRADES
        const sDiv = document.getElementById('shopStats');
        sDiv.innerHTML = "";
        const stats = [
            {k:'hearts', n:'Vitality', d:'+1 Heart'},
            {k:'timer', n:'Chronos', d:'+10s Time'},
            {k:'greed', n:'Greed', d:'+20% Gold'}
        ];
        stats.forEach(s => {
            let lvl = this.config.stats[s.k];
            let cost = Math.floor(100 * Math.pow(1.5, lvl));
            let btn = lvl>=10 ? `<button class="buy-btn" disabled>MAX</button>` 
                              : `<button class="buy-btn" onclick="Game.buyStat('${s.k}', ${cost})">${cost}g</button>`;
            sDiv.innerHTML += `
            <div class="shop-item">
                <h3>${s.n} <span style="color:var(--gold)">Lv.${lvl}</span></h3>
                <p>${s.d}</p>
                <div class="upgrade-dots">${Array(10).fill(0).map((_,i)=>`<div class="dot ${i<lvl?'active':''}"></div>`).join('')}</div>
                ${btn}
            </div>`;
        });

        // 2. ITEMS
        const iDiv = document.getElementById('shopItems');
        iDiv.innerHTML = "";
        const items = [
            {k:'fifty', n:'50/50', i:'✂️', c:50},
            {k:'freeze', n:'Freeze', i:'❄️', c:75},
            {k:'skip', n:'Skip', i:'⏭️', c:100}
        ];
        items.forEach(it => {
            let count = this.config.items[it.k];
            iDiv.innerHTML += `
            <div class="shop-item" style="border-color:var(--blue)">
                <div style="font-size:2rem">${it.i}</div>
                <h3>${it.n}</h3>
                <p>Owned: <strong>${count}</strong></p>
                <button class="buy-btn" style="background:var(--blue)" onclick="Game.buyItem('${it.k}', ${it.c})">${it.c}g</button>
            </div>`;
        });

        // 3. GEAR
        const gDiv = document.getElementById('shopGear');
        gDiv.innerHTML = "";
        gearConfig.sort((a,b)=>a.cost - b.cost);
        gearConfig.forEach(g => {
            let owned = this.player.unlockedGear.includes(g.id);
            let equipped = this.player.gear[g.type] === g.id;
            let btnTxt = owned ? (equipped ? "UNEQUIP" : "EQUIP") : `${g.cost}g`;
            let btnCls = equipped ? "buy-btn" : (owned ? "buy-btn" : "buy-btn"); // Simplify styling
            let style = equipped ? "background:var(--gold); color:black;" : (owned ? "background:#444" : "");
            
            gDiv.innerHTML += `
            <div class="shop-item">
                <div style="font-size:2rem">${g.icon}</div>
                <h3>${g.name}</h3>
                <p style="color:var(--gold)">${g.stat}</p>
                <button class="buy-btn" style="${style}" onclick="Game.handleGear(${g.id}, ${g.cost})">${btnTxt}</button>
            </div>`;
        });
    },

    buyStat(key, cost) {
        if(this.config.gold >= cost) {
            this.config.gold -= cost;
            this.config.stats[key]++;
            this.saveConfig();
            this.renderShops();
            this.updateMenuUI();
        }
    },
    buyItem(key, cost) {
        if(this.config.gold >= cost) {
            this.config.gold -= cost;
            this.config.items[key]++;
            this.saveConfig();
            this.renderShops();
            this.updateMenuUI();
        }
    },
    handleGear(id, cost) {
        if(this.player.unlockedGear.includes(id)) {
            let item = gearConfig.find(x=>x.id===id);
            if(this.player.gear[item.type] === id) this.player.gear[item.type] = 0; // Unequip
            else this.player.gear[item.type] = id; // Equip
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

    // --- GAMEPLAY ---
    startRun() {
        // Build Deck
        let deck = [];
        if(this.config.activeFiles.includes('emergency')) {
            deck = this.library.filter(q => q._src === 'emergency');
        } else {
            // Filter logic: In a real app, filter by subject. Here we grab all loaded for simplicity
            // or filter by ID if we had a sophisticated topic selector.
            deck = this.library;
        }

        if(deck.length === 0) {
            this.injectEmergencyQuestions();
            deck = this.library.filter(q => q._src === 'emergency');
        }

        this.run = {
            hp: 3 + Math.floor(this.config.stats.hearts/2),
            score: 0,
            gold: 0,
            deck: deck,
            timerMax: 30 + (this.config.stats.timer * 5),
            timeLeft: 30,
            freeze: false
        };

        this.renderAvatar('g');
        this.updateHUD();
        document.getElementById('menuScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.nextQ();
    },

    nextQ() {
        if(this.run.hp <= 0) return this.gameOver();

        // Pick Q
        let template = this.run.deck[Math.floor(Math.random() * this.run.deck.length)];
        let content = template.gen ? template.gen() : template.data;
        this.currentQ = { ...content, type: template.type };

        // Render
        const qText = document.getElementById('qText');
        const inp = document.getElementById('inputContainer');
        inp.innerHTML = ""; 

        qText.innerHTML = this.formatMath(content.q);
        if(window.MathJax) MathJax.typesetPromise([qText]);

        // Choice Renderer
        if(template.type === 'choice') {
            inp.innerHTML = `<div class="choice-grid"></div>`;
            let grid = inp.querySelector('.choice-grid');
            let opts = [content.a, ...content.w].sort(()=>Math.random()-0.5);
            
            opts.forEach(opt => {
                let btn = document.createElement('button');
                btn.className = 'ans-btn';
                btn.inne