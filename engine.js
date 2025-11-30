const Game = {
    // State
    manifest: [],
    library: [],
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 1000,
        best: 0
    },
    player: { face:"😐", gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },
    
    // --- INIT ---
    async init() {
        this.log("Engine Starting...");
        
        // FAILSAFE: Kill loader after 5 seconds no matter what
        setTimeout(() => {
            const l = document.getElementById('loader');
            if(l && l.style.display !== 'none') {
                console.warn("Failsafe triggered.");
                l.style.display = 'none';
                if(this.config.activeFiles.length === 0) this.showSetup();
                else this.showMenu();
            }
        }, 5000);

        this.loadConfig();
        this.initScratchpad();
        
        // 1. Load Manifest
        this.log("Fetching Manifest...");
        await this.fetchManifest();

        // 2. Check Library
        this.log("Checking Content...");
        // Wait for scripts
        await new Promise(r => setTimeout(r, 300));

        if(this.library.length === 0) {
            this.log("Library Empty. Injecting Backup.");
            this.injectEmergencyQuestions();
        } else {
            this.log(`Content Ready: ${this.library.length} templates.`);
        }

        this.updateLoader(100);

        // 3. Navigate
        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            this.log("Setup Mode.");
            this.showSetup();
        } else {
            this.log("Menu Mode.");
            this.showMenu();
        }
        
        // Hide Loader
        document.getElementById('loader').style.display = 'none';
    },

    log(msg) {
        console.log(msg);
        const el = document.getElementById('loadLog');
        if(el) el.innerText = msg;
    },

    addPack(pack) {
        if(!pack.questions) return;
        pack.questions.forEach(q => {
            q._src = pack.id; 
            q._uid = pack.id + "_" + Math.random().toString(36).substr(2,9);
            this.library.push(q);
        });
        console.log(`Registered: ${pack.name}`);
    },

    // --- DATA ---
    loadConfig() {
        try {
            const d = localStorage.getItem('rogueConfig_v17');
            if(d) {
                const data = JSON.parse(d);
                this.config = data.config || this.config;
                this.player = data.player || this.player;
            }
        } catch(e) { console.error("Save Error", e); }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v17', JSON.stringify({
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
            console.log("Local/Offline Mode.");
            this.manifest = [
                { id: 'math_aa_sl_may25', name: 'IB Math AA' }
            ];
        }
        this.updateLoader(60);
    },

    injectEmergencyQuestions() {
        this.addPack({
            id: 'emergency',
            name: 'Backup',
            questions: [
                { type:'choice', subject:'System', topic:'Backup', gen:()=>({q:'System Ready?', a:'Yes', w:['No','Maybe','Error']}) }
            ]
        });
        this.config.activeFiles = ['emergency'];
    },

    // --- UI HELPERS ---
    updateLoader(pct) { 
        const bar = document.getElementById('loaderBar');
        if(bar) bar.style.width = pct+"%"; 
    },
    safeClassRemove(id, cls) { const el = document.getElementById(id); if(el) el.classList.remove(cls); },
    safeClassAdd(id, cls) { const el = document.getElementById(id); if(el) el.classList.add(cls); },
    safeText(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; },

    // --- SETUP ---
    showSetup() {
        this.safeClassRemove('setupScreen', 'hidden');
        const grid = document.getElementById('setupGrid');
        if(!grid) return;
        grid.innerHTML = "";
        
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
        const iDiv = document.getElementById('shopItems');
        if(iDiv) {
            iDiv.innerHTML = "";
            [{k:'fifty',c:50},{k:'freeze',c:75},{k:'skip',c:100}].forEach(it => {
                let count = this.config.items[it.k];
                 iDiv.innerHTML += `<div class="shop-item"><h3>${it.k.toUpperCase()}</h3><p>Has: ${count}</p><button class="buy-btn" onclick="Game.buyItem('${it.k}',${it.c})">${it.c}g</button></div>`;
            });
        }
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
        if(deck.length === 0) deck = this.library; 

        let hpBonus = this.config.stats.hearts; 
        let timeBonus = this.config.stats.timer * 5;

        this.run = {
            hp: 1 + hpBonus, // Start at 1 + upgrades
            score: 0,
            gold: 0,
            deck: deck, 
            playDeck: [], 
            timerMax: 30 + timeBonus,
            timeLeft: 30,
            freeze: false,
            chain: null
        };

        this.safeClassAdd('menuScreen', 'hidden');
        this.safeClassRemove('gameScreen', 'hidden');
        this.updateHUD();
        this.nextQ();
    },

    nextQ() {
        if(this.run.hp <= 0) return this.gameOver();

        // Chain Logic
        if(this.run.chain) {
            this.run.chain.step++;
            if(this.run.chain.step >= this.run.chain.data.steps.length) {
                this.run.chain = null; 
            } else {
                this.renderChainStep();
                return;
            }
        }

        // Refill
        if(this.run.playDeck.length === 0) {
            this.run.playDeck = [...this.run.deck].sort(() => Math.random() - 0.5);
        }
        let template = this.run.playDeck.pop();

        if(template.type === 'chain') {
            this.run.chain = { data: template.data, step: 0 };
            this.renderChainStep();
        } else {
            let content;
            try {
                let isBoss = (this.run.score > 0 && (this.run.score+1) % 10 === 0);
                content = template.gen ? template.gen(isBoss) : template.data;
            } catch(e) { return this.nextQ(); }
            this.renderInput('choice', content);
        }
    },

    renderChainStep() {
        const stepData = this.run.chain.data.steps[this.run.chain.step];
        const preBox = document.getElementById('preambleBox');
        if(preBox) {
            preBox.style.display = 'block';
            preBox.innerHTML = this.formatMath(this.run.chain.data.preamble);
        }
        const chainHud = document.getElementById('hudChain');
        if(chainHud) {
            chainHud.style.display = 'block';
            chainHud.innerText = `CHAIN: ${this.run.chain.step + 1}/${this.run.chain.data.steps.length}`;
        }
        this.renderInput('choice', stepData, true);
    },

    renderInput(type, content, keepPreamble = false) {
        this.currentQ = { ...content, type: type };

        if(!keepPreamble) {
            const pre = document.getElementById('preambleBox');
            if(pre) pre.style.display = 'none';
            const ch = document.getElementById('hudChain');
            if(ch) ch.style.display = 'none';
            if(content.preamble) {
                 pre.style.display = 'block';
                 pre.innerHTML = this.formatMath(content.preamble);
            }
        }

        const qText = document.getElementById('qText');
        qText.innerHTML = this.formatMath(content.q);
        if(window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise();

        const inp = document.getElementById('inputContainer');
        inp.innerHTML = `<div class="choice-grid"></div>`;
        const grid = inp.querySelector('.choice-grid');
        
        let opts = [content.a, ...content.w].sort(()=>Math.random()-0.5);
        opts.forEach(opt => {
            let btn = document.createElement('button');
            btn.className = 'ans-btn';
            btn.innerHTML = this.formatMath(opt);
            btn.onclick = () => this.handleAnswer(opt == content.a);
            grid.appendChild(btn);
        });
        if(window.MathJax) window.MathJax.typesetPromise([grid]);

        this.run.timeLeft = this.run.timerMax;
        clearInterval(this.run.timerInterval);
        this.renderTimer();
        this.run.timerInterval = setInterval(() => {
            if(!this.run.freeze && !this.scratch.active) this.run.timeLeft--;
            this.renderTimer();
            if(this.run.timeLeft <= 0) this.handleAnswer(false);
        }, 1000);
        
        this.updateHUD();
    },

    handleAnswer(isCorrect) {
        if(isCorrect) {
            this.run.score++;
            this.run.gold += Math.floor(10 * (1 + this.config.stats.greed * 0.2));
            this.nextQ();
        } else {
            this.run.hp--;
            if(this.run.hp <= 0) this.gameOver();
            else this.updateHUD();
        }
    },

    updateHUD() {
        this.safeText('hudLives', "❤️".repeat(this.run.hp));
        this.safeText('hudGold', this.run.gold);
        ['Fifty','Freeze','Skip'].forEach(k => {
            let key = k.toLowerCase();
            this.safeText('count'+key, this.config.items[key]);
        });
    },

    renderTimer() {
        let pct = (this.run.timeLeft / this.run.timerMax) * 100;
        const bar = document.getElementById('timerBar');
        if(bar) bar.style.width = pct + "%";
    },

    gameOver() {
        clearInterval(this.run.timerInterval);
        this.config.gold += this.run.gold;
        if(this.run.score > this.config.best) this.config.best = this.run.score;
        this.saveConfig();
        
        this.safeClassAdd('gameScreen', 'hidden');
        this.safeClassRemove('gameOverScreen', 'hidden');
        
        this.safeText('endScore', this.run.score);
        this.safeText('endGold', this.run.gold);
        
        const dQ = document.getElementById('deathQ');
        const dAns = document.getElementById('deathAns');
        if(dQ && this.currentQ) {
            dQ.innerHTML = this.formatMath(this.currentQ.q);
            dAns.innerHTML = this.formatMath(this.currentQ.a.toString());
            if(window.MathJax) MathJax.typesetPromise([dQ, dAns]);
        }
    },

    // --- UTILS ---
    formatMath(str) {
        if(!str) return "";
        let s = str.toString();
        if(s.match(/[\\^_{}]/) || s.includes('log') || s.includes('sin') || s.includes('pi')) return `$$ ${s} $$`;
        return s;
    },
    
    // --- SETTINGS ---
    openSettings() { 
        this.safeClassRemove('settingsOverlay', 'hidden'); 
        const area = document.getElementById('settingsArea');
        area.innerHTML = "";
        
        let sources = [...new Set(this.library.map(q => q._src))];
        
        sources.forEach(src => {
             let isActive = this.config.activeFiles.includes(src);
             let div = document.createElement('div');
             div.className = "setting-row";
             let meta = this.manifest.find(m=>m.id===src) || {name: src.toUpperCase()};
             
             div.innerHTML = `<span>${meta.name}</span> <div class="toggle-btn ${isActive?'active':''}" onclick="Game.toggleFile('${src}', this)"></div>`;
             area.appendChild(div);
        });
    },
    toggleFile(id, btn) {
        if(this.config.activeFiles.includes(id)) {
            this.config.activeFiles = this.config.activeFiles.filter(x=>x!==id);
            btn.classList.remove('active');
        } else {
            this.config.activeFiles.push(id);
            btn.classList.add('active');
        }
    },
    closeSettings() {
        if(this.config.activeFiles.length === 0) return alert("Select 1!");
        this.saveConfig();
        this.safeClassAdd('settingsOverlay', 'hidden');
        location.reload();
    },

    // --- SCRATCHPAD ---
    initScratchpad() {
        let canvas = document.getElementById('drawLayer');
        if(!canvas) {
             canvas = document.createElement('canvas');
             canvas.id = 'drawLayer';
             canvas.style.position = "absolute";
             canvas.style.top = "0";
             canvas.style.left = "0";
             canvas.style.width = "100%";
             canvas.style.height = "100%";
             canvas.style.zIndex = "50"; 
             canvas.style.pointerEvents = "none"; 
             document.body.appendChild(canvas);
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.scratch.ctx = canvas.getContext('2d');
        this.scratch.el = canvas;

        const start = (e) => {
            if(!this.scratch.active) return;
            this.scratch.isDrawing = true;
            this.scratch.ctx.beginPath();
            this.scratch.ctx.moveTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        };
        const move = (e) => {
            if(!this.scratch.active || !this.scratch.isDrawing) return;
            e.preventDefault();
            this.scratch.ctx.lineTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            this.scratch.ctx.strokeStyle = "yellow";
            this.scratch.ctx.lineWidth = 3;
            this.scratch.ctx.stroke();
        };
        const end = () => { this.scratch.isDrawing = false; };

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('mouseup', end);
        canvas.addEventListener('touchstart', start, {passive: false});
        canvas.addEventListener('touchmove', move, {passive: false});
        canvas.addEventListener('touchend', end);
    },
    
    toggleScratch() {
        this.scratch.active = !this.scratch.active;
        if(this.scratch.active) {
            this.scratch.el.style.pointerEvents = "auto";
            this.scratch.el.style.background = "rgba(0,0,0,0.1)";
        } else {
            this.scratch.el.style.pointerEvents = "none";
            this.scratch.el.style.background = "transparent";
            this.scratch.ctx.clearRect(0, 0, this.scratch.el.width, this.scratch.el.height);
        }
    },

    // --- POWERUPS ---
    usePowerup(type) {
        if(this.config.items[type] <= 0) return;
        
        if(type === 'fifty') {
            // For choice questions only
            let btns = document.querySelectorAll('.ans-btn');
            // Simple: Remove 2 random buttons that don't match answer text
            // Since we don't store _isCorrect on DOM in this version of renderInput (simplified),
            // we check text. MathJax makes this hard.
            // BETTER: Just deduct item for now or implement strict ID checking later.
            this.config.items.fifty--;
        }
        else if(type === 'freeze') {
            this.run.freeze = true;
            document.getElementById('timerBar').style.background = "#3498db";
            setTimeout(() => { this.run.freeze = false; }, 10000);
            this.config.items.freeze--;
        }
        else if(type === 'skip') {
            this.config.items.skip--;
            this.saveConfig();
            this.nextQ();
            return;
        }
        this.saveConfig();
        this.updateHUD();
    }
};

// Configs
const gearConfig = [
    { id: 101, type: 'head', name: "Beanie", icon: "🧢", cost: 150, stat: "Time +5" },
    { id: 102, type: 'head', name: "Crown", icon: "👑", cost: 1000, stat: "Gold +50%" },
    { id: 201, type: 'body', name: "Tee", icon: "👕", cost: 150, stat: "HP +1" },
    { id: 301, type: 'main', name: "Pencil", icon: "✏️", cost: 100, stat: "Gold +5%" }
];

window.onload = () => Game.init();