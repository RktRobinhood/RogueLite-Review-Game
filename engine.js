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
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },
    
    // --- INIT ---
    async init() {
        console.log("Engine: Booting...");
        this.loadConfig();
        
        // Legacy save fix
        if(!this.player) this.player = { face: "😐", gear: {head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] }; 
        
        this.initScratchpad();
        
        // 1. Load Manifest
        await this.fetchManifest();

        // 2. Check Content
        if(this.library.length === 0) {
            console.warn("Engine: Library empty. Injecting Emergency Backup.");
            this.injectEmergencyQuestions();
        } else {
            console.log(`Engine: Content Ready. ${this.library.length} templates loaded.`);
        }

        // 3. FORCE HIDE LOADER (The Fix)
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = 0;
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }

        // 4. Route to Menu or Setup
        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            console.log("Engine: First run. Showing Setup.");
            this.showSetup();
        } else {
            console.log("Engine: Returning user. Showing Menu.");
            this.showMenu();
        }
    },

    // Register content
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
            console.log("Engine: Local mode (No fetch). Using Script Tags.");
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

    // --- GAMEPLAY LOOP ---
    startRun() {
        let deck = this.library.filter(q => this.config.activeFiles.includes(q._src));
        
        if(deck.length === 0) {
            console.warn("No questions matched selection. Loading ALL.");
            deck = this.library;
        }
        
        if(deck.length === 0) return alert("Critical Error: No questions in memory.");

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

        // 1. Handle Chains
        if(this.run.chain) {
            this.run.chain.step++;
            if(this.run.chain.step >= this.run.chain.data.steps.length) {
                this.run.chain = null; 
            } else {
                this.renderChainStep();
                return;
            }
        }

        // 2. Refill Deck
        if(this.run.playDeck.length === 0) {
            this.run.playDeck = [...this.run.deck].sort(() => Math.random() - 0.5);
        }

        // 3. Pick
        let template = this.run.playDeck.pop();

        // 4. Render
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
        // Update Chain HUD indicator
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

        this.run.timeLeft = this.run.timerMax;
        clearInterval(this.run.timerInterval);
        this.renderTimer();
        this.run.timerInterval = setInterval(() => {
            if(!this.run.freeze) this.run.timeLeft--;
            this.renderTimer();
            if(this.run.timeLeft <= 0) this.handleAnswer(false);
        }, 1000);
        
        this.updateHUD();
    },

    handleAnswer(isCorrect) {
        if(isCorrect) {
            this.run.score++;
            this.run.gold += Math.floor(10 * (1 + this.config.stats.greed * 0.2));
            document.getElementById('gameHUD').style.backgroundColor = "rgba(46, 204, 113, 0.3)";
            setTimeout(() => {
                document.getElementById('gameHUD').style.backgroundColor = "rgba(0,0,0,0.4)";
                this.nextQ();
            }, 200);
        } else {
            this.run.hp--;
            document.body.style.background = "#500";
            setTimeout(()=>document.body.style.background="var(--bg)", 200);
            
            if(this.run.hp <= 0) this.gameOver();
            else this.updateHUD();
        }
    },

    updateHUD() {
        this.safeText('hudLives', "❤️".repeat(this.run.hp));
        this.safeText('hudGold', this.run.gold);
        ['Fifty','Freeze','Skip'].forEach(k => {
            let key = k.toLowerCase();
            if(document.getElementById('count'+k)) {
                 document.getElementById('count'+k).innerText = this.config.items[key];
            }
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
            dAns.innerHTML = this.formatMath(this.currentQ.a);
            if(window.MathJax) MathJax.typesetPromise([dQ, dAns]);
        }
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
                sDiv.innerHTML += `<div class="shop-item"><h3>${stat.toUpperCase()} ${lvl}</h3><p>Level ${lvl}</p>${btn}</div>`;
            });
        }
        const iDiv = document.getElementById('shopItems');
        if(iDiv) {
            iDiv.innerHTML = "";
            [{k:'fifty',c:50},{k:'freeze',c:75},{k:'skip',c:100}].forEach(it => {
                 iDiv.innerHTML += `<div class="shop-item"><h3>${it.k.toUpperCase()}</h3><p>Owned: ${this.config.items[it.k]}</p><button class="buy-btn" onclick="Game.buyItem('${it.k}',${it.c})">${it.c}g</button></div>`;
            });
        }
    },

    buyUpgrade(stat) {
        let lvl = this.config.stats[stat];
        let cost = this.getCost(lvl);
        if(this.config.gold >= cost && lvl < 10) {
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

    // --- SCRATCHPAD ---
    initScratchpad() {
        let canvas = document.getElementById('drawLayer');
        if(!canvas) {
             canvas = document.createElement('canvas');
             canvas.id = 'drawLayer';
             canvas.style.zIndex = "5"; 
             canvas.style.pointerEvents = "none"; 
             document.body.appendChild(canvas);
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.scratch.ctx = canvas.getContext('2d');
        
        // DRAWING LOGIC
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
   