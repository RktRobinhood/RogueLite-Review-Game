const Game = {
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

    async init() {
        this.loadConfig();
        this.initScratchpad();
        await this.fetchManifest();
        
        // If no active files saved, force setup
        if(this.config.activeFiles.length === 0) {
            this.showSetup();
        } else {
            await this.loadContent();
            this.showMenu();
        }
    },

    loadConfig() {
        const d = localStorage.getItem('rogueConfig_v9');
        if(d) this.config = JSON.parse(d);
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v9', JSON.stringify(this.config));
        this.updateMenuUI();
    },

    async fetchManifest() {
        this.updateLoader(20);
        try {
            const resp = await fetch('library.json');
            if(!resp.ok) throw new Error("404");
            this.manifest = await resp.json();
        } catch(e) {
            console.warn("Using Local Fallback");
            this.manifest = [
                { id: 'math_core', name: 'IB Math Core', file: 'content/math_core.js' },
                { id: 'extras', name: 'Psych & TOK Demo', file: 'content/extras.js' }
            ];
        }
        this.updateLoader(50);
    },

    async loadContent() {
        this.library = [];
        // For local dev: if StarterContent exists from script tags, ingest it
        if(typeof StarterContent !== 'undefined') {
             // No-op, script tags handled by index.html
        }
        this.updateLoader(100);
    },

    addPack(pack) {
        pack.questions.forEach(q => {
            q._src = pack.id;
            this.library.push(q);
        });
        console.log(`Loaded ${pack.name}: ${pack.questions.length} items`);
    },

    // --- UI ---
    updateLoader(pct) { document.getElementById('loaderBar').style.width = pct+"%"; },
    
    showSetup() {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('setupScreen').classList.remove('hidden');
        const grid = document.getElementById('setupGrid');
        grid.innerHTML = "";
        this.manifest.forEach(lib => {
            let div = document.createElement('div');
            div.className = 'lib-card selected'; // DEFAULT SELECTED
            div.innerHTML = `<span>${lib.name}</span><span class="checkmark">✔</span>`;
            div.onclick = () => div.classList.toggle('selected');
            div.dataset.id = lib.id;
            grid.appendChild(div);
        });
    },

    finishSetup() {
        const selected = document.querySelectorAll('.lib-card.selected');
        if(selected.length === 0) return alert("Select at least one subject!");
        this.config.activeFiles = Array.from(selected).map(el => el.dataset.id);
        this.saveConfig();
        document.getElementById('setupScreen').classList.add('hidden');
        this.showMenu();
    },

    showMenu() {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('menuScreen').classList.remove('hidden');
        this.renderShops();
        this.updateMenuUI();
    },
    
    updateMenuUI() {
        document.getElementById('menuGold').innerText = this.config.gold;
        document.getElementById('menuBest').innerText = this.config.best;
        document.getElementById('activeSubjectCount').innerText = this.config.activeFiles.length;
    },

    // --- SETTINGS ---
    openSettings() {
        document.getElementById('settingsOverlay').classList.remove('hidden');
        const area = document.getElementById('settingsArea');
        area.innerHTML = "";
        
        // We need to know available files vs active files
        this.manifest.forEach(lib => {
             let isActive = this.config.activeFiles.includes(lib.id);
             let div = document.createElement('div');
             div.className = "setting-row";
             div.innerHTML = `
                <span>${lib.name}</span>
                <div class="toggle-btn ${isActive?'active':''}" onclick="Game.toggleFile('${lib.id}', this)">
                    <div class="toggle-knob"></div>
                </div>`;
             area.appendChild(div);
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
        if(this.config.activeFiles.length === 0) return alert("Must have 1 active!");
        this.saveConfig();
        document.getElementById('settingsOverlay').classList.add('hidden');
        // Ideally reload content here, but simple refresh for now
        location.reload();
    },

    // --- SHOPS ---
    getCost(lvl) { return Math.floor(100 * Math.pow(1.5, lvl)); },
    
    renderShops() {
        const statsDiv = document.getElementById('shopStats');
        statsDiv.innerHTML = "";
        ['hearts', 'timer', 'greed'].forEach(stat => {
            let lvl = this.config.stats[stat];
            let cost = this.getCost(lvl);
            let btn = (lvl >= 10) ? `<button class="buy-btn" disabled>MAX</button>` 
                                  : `<button class="buy-btn" onclick="Game.buyUpgrade('${stat}')">${cost}g</button>`;
            statsDiv.innerHTML += `<div class="shop-item"><h3 style="margin:0; text-transform:capitalize;">${stat}</h3><div class="upgrade-dots">${Array(10).fill(0).map((_,i)=>`<div class="dot ${i<lvl?'active':''}"></div>`).join('')}</div>${btn}</div>`;
        });

        // Items
        const itemsDiv = document.getElementById('shopItems');
        itemsDiv.innerHTML = "";
        const items = [
            {k:'fifty', n:'50/50', c:50, i:'✂️'},
            {k:'freeze', n:'Freeze', c:75, i:'❄️'},
            {k:'skip', n:'Skip', c:100, i:'⏭️'}
        ];
        items.forEach(it => {
            let count = this.config.items[it.k];
            itemsDiv.innerHTML += `
            <div class="shop-item">
                <div style="font-size:1.5rem">${it.i}</div>
                <h3>${it.n}</h3>
                <p>Owned: ${count}</p>
                <button class="buy-btn" ${this.config.gold < it.c ? 'disabled' : ''} onclick="Game.buyItem('${it.k}', ${it.c})">${it.c}g</button>
            </div>`;
        });
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

    switchTab(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
        ['tabRun','shopStats','shopItems'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        if(tab==='run') document.getElementById('tabRun').style.display = 'flex';
        else if(tab==='stats') document.getElementById('shopStats').style.display = 'grid';
        else if(tab==='items') document.getElementById('shopItems').style.display = 'grid';
    },

    // --- GAMEPLAY ---
    startRun() {
        // Filter Library based on Active Files
        // Since we loaded everything into pool, we filter by _src (which matches file ID)
        // Wait, simple solution: Just use the pool. The user selected files to load.
        // If we want topic toggle later, we add that.
        
        if(this.library.length === 0) return alert("No questions loaded!");
        
        this.run = {
            hp: 3 + Math.floor(this.config.stats.hearts/2),
            score: 0,
            gold: 0,
            chain: null,
            timerMax: 30 + (this.config.stats.timer * 5),
            timeLeft: 30,
            freeze: false
        };

        document.getElementById('menuScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
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

        let template = this.library[Math.floor(Math.random() * this.library.length)];
        
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
        preBox.style.display = 'block';
        preBox.innerHTML = this.formatMath(this.run.chain.data.preamble);
        
        const hudC = document.getElementById('chainStatus');
        hudC.style.display = 'block';
        hudC.innerText = `CHAIN: ${this.run.chain.step + 1} / ${this.run.chain.data.steps.length}`;
        
        this.renderInput('choice', stepData, true); 
    },

    renderInput(type, content, keepPreamble = false) {
        this.currentQ = { ...content, type: type }; 

        if(!keepPreamble) {
            document.getElementById('preambleBox').style.display = 'none';
            document.getElementById('chainStatus').style.display = 'none';
            if(content.preamble) {
                document.getElementById('preambleBox').style.display = 'block';
                document.getElementById('preambleBox').innerHTML = this.formatMath(content.preamble);
            }
        }

        const qText = document.getElementById('qText');
        qText.innerHTML = this.formatMath(content.q);
        if(window.MathJax) MathJax.typesetPromise();

        const inp = document.getElementById('inputContainer');
        inp.innerHTML = ""; 

        // --- RENDERERS ---
        if(type === 'choice') {
            inp.innerHTML = `<div class="choice-grid"></div>`;
            let grid = inp.querySelector('.choice-grid');
            let opts = [content.a, ...content.w].sort(()=>Math.random()-0.5);
            opts.forEach(opt => {
                let btn = document.createElement('button');
                btn.className = 'ans-btn';
                btn.innerHTML = this.formatMath(opt);
                btn._isCorrect = (opt == content.a);
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

        // Reset Timer
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
        document.getElementById('hudLives').innerText = "❤️".repeat(this.run.hp);
        document.getElementById('hudScore').innerText = this.run.score;
        document.getElementById('hudGold').innerText = this.run.gold;
        
        ['Fifty','Freeze','Skip'].forEach(k => {
            let key = k.toLowerCase();
            document.getElementById('count'+k).innerText = this.config.items[key];
            let btn = document.getElementById('btn'+k);
            if(this.config.items[key] > 0 && btn.style.opacity != "0.3") {
                 btn.classList.remove('disabled');
            } else if (this.config.items[key] <= 0) {
                 btn.classList.add('disabled');
            }
        });
    },

    usePowerup(type) {
        if(this.config.items[type] <= 0) return;
        if(type === 'fifty') {
            let grid = document.querySelector('.choice-grid');
            if(!grid) return;
            let wrongs = Array.from(grid.children).filter(b => !b._isCorrect);
            wrongs.sort(()=>Math.random()-0.5);
            if(wrongs[0]) wrongs[0].classList.add('vanish');
            if(wrongs[1]) wrongs[1].classList.add('vanish');
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
    },

    renderTimer() {
        let pct = (this.run.timeLeft / this.run.timerMax) * 100;
        let bar = document.getElementById('timerBar');
        bar.style.width = pct + "%";
        if(!this.run.freeze) bar.style.background = pct < 30 ? "#c0392b" : "#27ae60";
    },

    gameOver() {
        clearInterval(this.run.timerInterval);
        this.config.gold += this.run.gold; 
        if(this.run.score > this.config.best) this.config.best = this.run.score;
        this.saveConfig();
        alert(`Run Ended!\nScore: ${this.run.score}\nGold: ${this.run.gold}`);
        location.reload();
    },

    formatMath(str) {
        if(!str) return "";
        let s = str.toString();
        if(s.match(/[\\^_{}]/) || s.includes('log')) return `$$ ${s} $$`;
        return s;
    },

    // --- SCRATCHPAD ---
    initScratchpad() {
        let canvas = document.createElement('canvas');
        canvas.id = 'drawLayer';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        this.scratch.ctx = canvas.getContext('2d');
        
        const start = (e) => {
            if(!this.scratch.active) return;
            this.scratch.isDrawing = true;
            this.scratch.ctx.beginPath();
            this.scratch.ctx.moveTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        };
        const move = (e) => {
            if(!this.scratch.active || !this.scratch.isDrawing) return;
            this.scratch.ctx.lineTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            this.scratch.ctx.strokeStyle = "yellow";
            this.scratch.ctx.lineWidth = 3;
            this.scratch.ctx.stroke();
        };
        const end = () => { this.scratch.isDrawing = false; };

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('mouseup', end);
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchmove', move);
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
    }
};

window.onload = () => Game.init();