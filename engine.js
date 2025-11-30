const Game = {
    // --- STATE ---
    manifest: [],
    library: [], // ALL loaded questions
    config: {
        activeTopics: [], // CHANGED: Stores "Subject_Topic" keys
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
        console.log("Engine: Booting v15.2...");
        this.loadConfig();
        
        if(!this.player.face) this.player.face = "😐";
        this.initScratchpad();
        
        // 1. Load Manifest & Content
        await this.fetchManifest();
        await this.loadContent();
        
        // 2. Verify Content
        if(this.library.length === 0) {
            console.warn("Engine: Empty. Injecting Backup.");
            this.injectEmergencyQuestions();
        } else {
            console.log(`Engine: Ready. ${this.library.length} questions.`);
        }

        // 3. Hide Loader
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = 0;
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }

        // 4. Navigation
        if(!this.config.activeTopics || this.config.activeTopics.length === 0) {
            this.showSetup();
        } else {
            this.showMenu();
        }
    },

    // --- DATA LOADING ---
    addPack(pack) {
        if(!pack.questions) return;
        pack.questions.forEach(q => {
            q._src = pack.id;
            q._uid = pack.id + "_" + Math.random().toString(36).substr(2,9);
            this.library.push(q);
        });
    },

    loadConfig() {
        try {
            const d = localStorage.getItem('rogueConfig_v15_2');
            if(d) {
                const data = JSON.parse(d);
                this.config = data.config || this.config;
                this.player = data.player || this.player;
            }
        } catch(e) { console.error("Save corrupt", e); }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v15_2', JSON.stringify({
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
            this.manifest = [{ id: 'math_may25', name: 'IB Math AA' }];
        }
        this.updateLoader(60);
    },

    async loadContent() {
        // Wait for <script> tags
        await new Promise(r => setTimeout(r, 200));
        this.updateLoader(100);
    },

    injectEmergencyQuestions() {
        this.addPack({
            id: 'emergency',
            name: 'System',
            questions: [
                { type:'choice', subject:'System', topic:'Backup', gen:()=>({q:'System Ready?', a:'Yes', w:['No','Maybe','Error']}) }
            ]
        });
    },

    // --- SETUP SCREEN (New Tree View) ---
    showSetup() {
        this.safeClassAdd('menuScreen', 'hidden');
        this.safeClassRemove('setupScreen', 'hidden');
        const grid = document.getElementById('setupGrid');
        if(!grid) return;
        grid.innerHTML = "";
        
        // Group questions by Subject -> Topic
        const tree = {};
        this.library.forEach(q => {
            if(!tree[q.subject]) tree[q.subject] = new Set();
            tree[q.subject].add(q.topic);
        });

        // Render
        for(let subject in tree) {
            const group = document.createElement('div');
            group.className = 'setup-group';
            
            const title = document.createElement('div');
            title.className = 'setup-subject';
            title.innerText = subject;
            group.appendChild(title);

            const chipContainer = document.createElement('div');
            chipContainer.className = 'topic-grid';

            tree[subject].forEach(topic => {
                const chip = document.createElement('div');
                chip.className = 'topic-chip selected'; // Default Selected
                chip.innerText = topic;
                chip.dataset.key = `${subject}_${topic}`;
                chip.onclick = () => chip.classList.toggle('selected');
                chipContainer.appendChild(chip);
            });

            group.appendChild(chipContainer);
            grid.appendChild(group);
        }
    },

    finishSetup() {
        const selected = document.querySelectorAll('.topic-chip.selected');
        if(selected.length === 0) return alert("Select at least one topic!");
        
        this.config.activeTopics = Array.from(selected).map(el => el.dataset.key);
        this.saveConfig();
        this.safeClassAdd('setupScreen', 'hidden');
        this.showMenu();
    },

    // --- MENU & SHOPS ---
    showMenu() {
        this.safeClassRemove('menuScreen', 'hidden');
        this.updateMenuUI();
        this.renderShops();
        this.switchTab('run');
    },

    updateMenuUI() {
        this.safeText('menuGold', this.config.gold);
        this.safeText('menuBest', this.config.best);
        if(this.config.activeTopics) this.safeText('activeSubjectCount', this.config.activeTopics.length);
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

    getCost(lvl) { 
        // Exponential Cost: 100 * 1.5^lvl
        return Math.floor(100 * Math.pow(1.5, lvl)); 
    },
    
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
        // Filter by TOPIC key
        let deck = this.library.filter(q => this.config.activeTopics.includes(`${q.subject}_${q.topic}`));
        
        if(deck.length === 0) {
            console.warn("Selection empty. Loading fallback.");
            deck = this.library;
        }
        
        if(deck.length === 0) return alert("Critical Error: No questions.");

        let hpBonus = this.config.stats.hearts; 
        let timeBonus = this.config.stats.timer * 5;

        this.run = {
            hp: 1 + hpBonus, // BASE HP is now 1 + Upgrades
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
        if(window.MathJax) window.MathJax.typesetPromise();

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
            if(document.getElementById('count'+key)) 
                 document.getElementById('count'+key).innerText = this.config.items[key];
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
    initScratchpad() { /* ...same as before... */ },
    toggleScratch() { /* ...same as before... */ },
    usePowerup(type) { /* ...same as before... */ },
    openSettings() { /* ...same as before... */ },
    closeSettings() { this.safeClassAdd('settingsOverlay','hidden'); location.reload(); }
};

// Gear config same as before...
const gearConfig = [
    { id: 101, type: 'head', name: "Beanie", icon: "🧢", cost: 150, stat: "Time +5" },
    { id: 102, type: 'head', name: "Crown", icon: "👑", cost: 1000, stat: "Gold +50%" },
    { id: 201, type: 'body', name: "Tee", icon: "👕", cost: 150, stat: "HP +1" },
    { id: 301, type: 'main', name: "Pencil", icon: "✏️", cost: 100, stat: "Gold +5%" }
];

window.onload = () => Game.init();