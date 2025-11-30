const Game = {
    // State
    manifest: [],
    library: [], // The Pool
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 1000,
        best: 0
    },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },
    
    // --- INIT ---
    async init() {
        this.log("Engine: Booting...");
        this.loadConfig();
        if(!this.player) this.player = { face: "😐", gear: {head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] }; 
        
        this.initScratchpad();
        
        // 1. Load Manifest
        await this.fetchManifest();

        // 2. Check Content
        // The <script> tags in index.html execute BEFORE window.onload
        // So Game.addPack should have already run.
        if(this.library.length === 0) {
            this.log("Engine: Library empty. Injecting Emergency Backup.");
            this.injectEmergencyQuestions();
        } else {
            this.log(`Engine: Content Ready. ${this.library.length} templates loaded.`);
        }

        // 3. HIDE LOADER (The Fix)
        // We must ADD the class 'hidden' to make it disappear
        this.log("Engine: Hiding Loader...");
        this.safeClassAdd('loader', 'hidden');

        // 4. Route to Menu or Setup
        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            this.log("Engine: No active subjects. Showing Setup.");
            this.showSetup();
        } else {
            this.log("Engine: Config found. Showing Menu.");
            this.showMenu();
        }
    },

    // Logging Helper
    log(msg) {
        console.log(msg);
        // Optional: print to the loading screen itself so you can see it hanging
        const logEl = document.getElementById('loadLog');
        if(logEl) logEl.innerText = msg;
    },

    // External files call this to register
    addPack(pack) {
        if(!pack.questions) return;
        pack.questions.forEach(q => {
            q._src = pack.id; 
            q._uid = pack.id + "_" + Math.random().toString(36).substr(2,9);
            this.library.push(q);
        });
        console.log(`Engine: Registered ${pack.name} (${pack.questions.length} Qs)`);
    },

    // --- CORE UTILS ---
    loadConfig() {
        try {
            const d = localStorage.getItem('rogueConfig_v15');
            if(d) this.config = JSON.parse(d);
        } catch(e) { console.error("Save corrupt", e); }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v15', JSON.stringify(this.config));
        this.updateMenuUI();
    },

    async fetchManifest() {
        this.updateLoader(30);
        try {
            const resp = await fetch('library.json');
            if(resp.ok) this.manifest = await resp.json();
        } catch(e) {
            this.log("Engine: Local mode (No fetch). Using Script Tags.");
            // Fallback for menu naming if JSON fails
            this.manifest = [
                { id: 'math_may25', name: 'IB Math AA: May 2025 Exam' }
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

    updateLoader(pct) { 
        const bar = document.getElementById('loaderBar');
        if(bar) bar.style.width = pct+"%"; 
    },

    safeClassRemove(id, cls) { const el = document.getElementById(id); if(el) el.classList.remove(cls); },
    safeClassAdd(id, cls) { const el = document.getElementById(id); if(el) el.classList.add(cls); },
    safeText(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; },

    // --- MENU & SETUP ---
    showSetup() {
        this.safeClassAdd('menuScreen', 'hidden');
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
    },

    // --- SHOPS (Stats, Items, Gear) ---
    // Simplified for stability - restores the HTML generation
    renderShops() {
        // Stats
        const sDiv = document.getElementById('shopStats');
        if(sDiv) {
            sDiv.innerHTML = "";
            ['hearts', 'timer', 'greed'].forEach(stat => {
                let lvl = this.config.stats[stat];
                let cost = Math.floor(100 * Math.pow(1.5, lvl));
                let btn = lvl >= 10 
                    ? `<button class="buy-btn" disabled>MAX</button>` 
                    : `<button class="buy-btn" onclick="Game.buyUpgrade('${stat}')">${cost}g</button>`;
                sDiv.innerHTML += `<div class="shop-item"><h3>${stat.toUpperCase()} ${lvl}</h3><p>Level ${lvl}</p>${btn}</div>`;
            });
        }
    },

    buyUpgrade(stat) {
        let lvl = this.config.stats[stat];
        let cost = Math.floor(100 * Math.pow(1.5, lvl));
        if(this.config.gold >= cost && lvl < 10) {
            this.config.gold -= cost;
            this.config.stats[stat]++;
            this.saveConfig();
            this.renderShops();
            this.updateMenuUI();
        }
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

    // --- GAMEPLAY LOOP ---
    startRun() {
        let deck = this.library.filter(q => this.config.activeFiles.includes(q._src));
        if(deck.length === 0) deck = this.library; // Fallback
        
        if(deck.length === 0) return alert("Critical Error: No questions.");

        let hpBonus = this.config.stats.hearts; 
        let timeBonus = this.config.stats.timer * 5;

        this.run = {
            hp: 3 + Math.floor(hpBonus/2),
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

        if(this.run.chain) {
            this.run.chain.step++;
            if(this.run.chain.step >= this.run.chain.data.steps.length) {
                this.run.chain = null; 
            } else {
                this.renderChainStep();
                return;
            }
        }

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
            } catch(e) {
                console.error("Gen Error", e);
                return this.nextQ();
            }
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
        this.renderInput('choice', stepData, true);
    },

    renderInput(type, content, keepPreamble = false) {
        this.currentQ = { ...content, type: type };

        if(!keepPreamble) {
            const pre = document.getElementById('preambleBox');
            if(pre) pre.style.display = 'none';
            if(content.preamble) {
                 pre.style.display = 'block';
                 pre.innerHTML = this.formatMath(content.preamble);
            }
        }

        const qText = document.getElementById('qText');
        qText.innerHTML = this.formatMath(content.q);
        
        if(window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([document.getElementById('qArea')]).catch(e=>console.log(e));
        }

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

        // Timer
        this.run.timeLeft = this.run.timerMax;
        clearInterval(this.run.timerInterval);
        this.renderTimer();
        this.run.timerInte