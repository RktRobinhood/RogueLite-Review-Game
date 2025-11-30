const Game = {
    manifest: [],
    library: [],
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 1000, // Dev money
        best: 0
    },
    player: { face:null, gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },

    async init() {
        console.log("Engine: Initializing...");
        this.loadConfig();
        if(!this.player.face) this.player.face = "😐";
        this.initScratchpad();
        
        await this.fetchManifest();
        await this.loadContent();
        
        if(this.library.length === 0) {
            console.warn("Engine: Library empty. Injecting emergency content.");
            this.injectEmergencyQuestions();
        }
        
        this.safeClassRemove('loader', 'hidden');

        if(!this.config.activeFiles || this.config.activeFiles.length === 0) {
            this.showSetup();
        } else {
            this.showMenu();
        }
    },

    // --- UTILS ---
    safeClassRemove(id, cls) {
        const el = document.getElementById(id);
        if(el) el.classList.add(cls);
    },
    safeClassAdd(id, cls) {
        const el = document.getElementById(id);
        if(el) el.classList.remove(cls);
    },
    safeText(id, txt) {
        const el = document.getElementById(id);
        if(el) el.innerText = txt;
    },

    loadConfig() {
        let d = localStorage.getItem('rogueConfig_v13');
        if(d) {
            let data = JSON.parse(d);
            this.config = data.config || this.config;
            this.player = data.player || this.player;
        }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v13', JSON.stringify({
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
            console.log("Engine: Manifest load failed. Using internal fallback list.");
            this.manifest = [
                { id: 'math_core', name: 'IB Math Core', file: 'content/math_core.js' },
                { id: 'extras', name: 'Extras', file: 'content/extras.js' }
            ];
        }
        this.updateLoader(50);
    },

    async loadContent() {
        this.library = [];
        // Wait for script tags to finish parsing
        await new Promise(r => setTimeout(r, 300));
        this.updateLoader(100);
    },

    addPack(pack) {
        pack.questions.forEach(q => {
            q._src = pack.id;
            this.library.push(q);
        });
        console.log(`Engine: Loaded ${pack.name} (${pack.questions.length} items)`);
    },

    injectEmergencyQuestions() {
        this.addPack({
            id: 'emergency',
            name: 'Backup',
            questions: [
                { type:'choice', subject:'Math', topic:'Core', gen:()=>({q:'2+2=?', a:'4', w:['3','5','22']}) }
            ]
        });
        this.config.activeFiles = ['emergency'];
    },

    // --- UI ---
    updateLoader(pct) { 
        const bar = document.getElementById('loaderBar');
        if(bar) bar.style.width = pct+"%"; 
    },

    showSetup() {
        this.safeClassAdd('setupScreen', 'hidden');
        const grid = document.getElementById('setupGrid');
        if(!grid) return;
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
        this.safeClassRemove('setupScreen', 'hidden');
        this.showMenu();
    },

    showMenu() {
        this.safeClassAdd('menuScreen', 'hidden');
        this.updateMenuUI();
        this.renderShops();
        this.switchTab('run');
    },

    updateMenuUI() {
        this.safeText('menuGold', this.config.gold);
        this.safeText('menuBest', this.config.best);
        if(this.config.activeFiles) {
            this.safeText('activeSubjectCount', this.config.activeFiles.length);
        }
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

    switchTab(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        ['tabRun','shopStats','shopItems','shopGear'].forEach(id => {
             const el = document.getElementById(id);
             if(el) el.style.display = 'none';
        });

        if(tab === 'run') {
             const el = document.getElementById('tabRun');
             if(el) el.style.display = 'flex';
        } else {
             const id = 'shop'+tab.charAt(0).toUpperCase()+tab.slice(1);
             const el = document.getElementById(id);
             if(el) el.style.display = 'grid';
        }
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
                sDiv.innerHTML += `<div class="shop-item"><h3>${stat} Lv.${lvl}</h3><div class="upgrade-dots">${Array(10).fill(0).map((_,i)=>`<div class="dot ${i<lvl?'active':''}"></div>`).join('')}</div>${btn}</div>`;
            });
        }

        // Items
        const iDiv = document.getElementById('shopItems');
        if(iDiv) {
            iDiv.innerHTML = "";
            const items = [{k:'fifty',n:'50/50',c:50,i:'✂️'},{k:'freeze',n:'Freeze',c:75,i:'❄️'},{k:'skip',n:'Skip',c:100,i:'⏭️'}];
            items.forEach(it => {
                let count = this.config.items[it.k] || 0;
                iDiv.innerHTML += `<div class="shop-item consumable"><div style="font-size:1.5rem">${it.i}</div><h3>${it.n}</h3><p>Owned: ${count}</p><button class="buy-btn" onclick="Game.buyItem('${it.k}',${it.c})">${it.c}g</button></div>`;
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
            if(!this.config.items[key]) this.config.items[key] = 0;
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

    // --- GAMEPLAY ---
    startRun() {
        let deck = this.library.filter(q => this.config.activeFiles.includes(q._src));
        
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
            freeze: false,
            chain: null
        };

        this.renderAvatar('g');
        this.safeClassRemove('menuScreen', 'hidden');
        this.safeClassAdd('gameScreen', 'hidden');
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

        let template = this.run.deck[Math.floor(Math.random() * this.run.deck.length)];
        
        if(template.type === 'chain') {
            this.run.chain = { data: template, step: 0 };
            this.renderChainStep();
        } else {
            let content = template.gen ? template.gen() : template.data;
            this.renderInput(template.type, content);
        }
    },

    renderChainStep() {
        const stepData = this.run.chain.data.steps[this.run.chain.step];
        const preBox = document.getElementById('preambleBox');
        if(preBox) {
            preBox.style.display = 'block';
            preBox.innerHTML = this.formatMath(this.run.chain.data.preamble);
        }
        
        const chainStat = document.getElementById('chainStatus');
        if(chainStat) {
            chainStat.style.display = 'block';
            chainStat.innerText = `CHAIN: ${this.run.chain.step + 1} / ${this.run.chain.data.steps.length}`;
        }
        
        this.renderInput('choice', stepData, true);
    },

    renderInput(type, content, keepPreamble = false) {
        this.currentQ = { ...content, type: type }; 
        
        if(!keepPreamble) {
             const pre = document.getElementById('preambleBox');
             if(pre) pre.style.display = 'none';
             
             const ch = document.getElementById('chainStatus');
             if(ch) ch.style.display = 'none';

             if(content.preamble) {
                if(pre) {
                    pre.style.display = 'block';
                    pre.innerHTML = this.formatMath(content.preamble);
                }
            }
        }

        const qText = document.getElementById('qText');
        qText.innerHTML = this.formatMath(content.q);
        if(window.MathJax) MathJax.typesetPromise();

        const inp = document.getElementById('inputContainer');
        inp.innerHTML = ""; 

        if(type === 'choice') {
            inp.innerHTML = `<div class="choice-grid"></div>`;
            let grid = inp.querySelector('.choice-grid');
            let opts = [content.a, ...content.w].sort(()=>Math.random()-0.5);
            opts.forEach(opt => {
                let btn = document.createElement('button');
                btn.className = 'ans-btn';
                btn.innerHTML = this.formatMath(opt);
                btn.onclick = () => this.handleAnswer(opt == content.a);
                grid.appendChild(btn);
            });
            if(window.MathJax) MathJax.typesetPromise([grid]);
        }
        else if (type === 'match') {
            inp.innerHTML = `<div class="match-grid"></div>`;
            let grid = inp.querySelector('.match-grid');
            let lefts = content.pairs.map((p,i)=>({t:p.left, id:i})).sort(()=>Math.random()-0.5);
            let rights = content.pairs.map((p,i)=>({t:p.right, id:i})).sort(()=>Math.random()-0.5);
            let sel = null;
            let matched = 0;

            const check = (side, item, el) => {
                if(el.classList.contains('solved')) return;
                if(sel && sel.side !== side) {
                    if(sel.item.id === item.id) {
                        el.classList.add('solved'); sel.el.classList.add('solved');
                        matched++;
                        if(matched >= content.pairs.length) this.handleAnswer(true);
                    } else {
                        this.handleAnswer(false);
                    }
                    sel.el.classList.remove('selected'); sel = null;
                } else {
                    if(sel) sel.el.classList.remove('selected');
                    el.classList.add('selected'); sel = {side, item, el};
                }
            };

            lefts.forEach(i => { let d=document.createElement('div'); d.className='match-item'; d.innerHTML=i.t; d.onclick=()=>check('L',i,d); grid.appendChild(d); });
            rights.forEach(i => { let d=document.createElement('div'); d.className='match-item'; d.innerHTML=i.t; d.onclick=()=>check('R',i,d); grid.appendChild(d); });
        }
        else if(type === 'blank') {
            let parts = content.q.split('___');
            qText.innerHTML = parts.join('<span class="blank-slot">?</span>');
            let bank = [...content.w, content.a].sort(()=>Math.random()-0.5);
            inp.innerHTML = `<div class="word-bank"></div>`;
            let div = inp.querySelector('.word-bank');
            bank.forEach(w => {
                let b = document.createElement('div'); b.className='word-chip'; b.innerHTML=w;
                b.onclick = () => this.handleAnswer(w == content.a);
                div.appendChild(b);
            });
        }

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
            this.run.gold += Math.floor(10 * (1 + this.config.stats.greed * 0.1));
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
            this.safeText('count'+key, this.config.items[key]);
        });
    },

    renderTimer() {
        let pct = (this.run.timeLeft / this.run.timerMax) * 100;
        document.getElementById('timerBar').style.width = pct + "%";
    },

    gameOver() {
        clearInterval(this.run.timerInterval);
        this.config.gold += this.run.gold;
        if(this.run.score > this.config.best) this.config.best = this.run.score;
        this.saveConfig();
        
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.remove('hidden');
        document.getElementById('endScore').innerText = this.run.score;
        document.getElementById('endGold').innerText = this.run.gold;
        
        let dQ = document.getElementById('deathQ');
        dQ.innerHTML = this.formatMath(this.currentQ.q);
        let dAns = document.getElementById('deathAns');
        
        if(this.currentQ.type === 'choice') dAns.innerText = this.currentQ.a.toString();
        else dAns.innerText = "See above";
        
        if(window.MathJax) MathJax.typesetPromise([dQ]);
    },

    formatMath(str) {
        if(!str) return "";
        let s = str.toString();
        if(s.match(/[\\^_{}]/) || s.includes('log')) return `$$ ${s} $$`;
        return s;
    },

    // --- SETTINGS ---
    openSettings() { 
        this.safeClassAdd('settingsOverlay', 'hidden'); 
        const area = document.getElementById('settingsArea');
        area.innerHTML = "";
        this.manifest.forEach(lib => {
             let isActive = this.config.activeFiles.includes(lib.id);
             let div = document.createElement('div');
             div.className = "setting-row";
             div.innerHTML = `<span>${lib.name}</span> <div class="toggle-btn ${isActive?'active':''}" onclick="Game.toggleFile('${lib.id}', this)"></div>`;
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
        this.safeClassRemove('settingsOverlay', 'hidden');
        location.reload();
    },

    // --- SCRATCHPAD ---
    initScratchpad() {
        let canvas = document.getElementById('drawLayer');
        if(!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.scratch.ctx = canvas.getContext('2d');
        
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
        let cvs = document.getElementById('drawLayer');
        if(this.scratch.active) {
            cvs.classList.add('active');
        } else {
            cvs.classList.remove('active');
            this.scratch.ctx.clearRect(0, 0, cvs.width, cvs.height);
        }
    },

    // --- POWERUPS ---
    usePowerup(type) {
        if(this.config.items[type] <= 0) return;
        if(type === 'skip') {
            this.config.items.skip--;
            this.saveConfig();
            this.nextQ();
        }
        // ... others
        this.updateHUD();
    }
};

const gearConfig = [
    { id: 101, type: 'head', name: "Beanie", icon: "🧢", cost: 150, stat: "Time +5" },
    { id: 301, type: 'main', name: "Pencil", icon: "✏️", cost: 100, stat: "Gold +5%" }
];

window.onload = () => Game.init();