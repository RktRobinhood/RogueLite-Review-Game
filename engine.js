const Game = {
    // --- STATE ---
    manifest: [],
    library: [], 
    config: {
        activeFiles: [],
        stats: { hearts:0, timer:0, greed:0 },
        items: { skip:0, fifty:0, freeze:0 },
        gold: 1000, // Starting gold
        best: 0
    },
    player: { face:null, gear:{head:0,body:0,main:0,off:0,feet:0}, unlockedGear:[0] },
    run: { active:false, chain:null },
    scratch: { active:false, ctx:null, isDrawing:false },
    
    // --- INIT ---
    async init() {
        console.log("Engine: Booting v21...");
        this.loadConfig();
        
        // Default Face
        if(!this.player.face) this.player.face = "😐";
        
        // scratchpad removed for simplified UI
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
            const d = localStorage.getItem('rogueConfig_v21');
            if(d) {
                const data = JSON.parse(d);
                this.config = data.config || this.config;
                this.player = data.player || this.player;
                // Ensure newer keys exist when loading older saves
                if(!this.config.stats) this.config.stats = { hearts:0, timer:0, greed:0 };
                if(!this.config.items) this.config.items = { skip:0, fifty:0, freeze:0, double:0, restore:0, focus:0 };
                if(!this.player.gear) this.player.gear = { head:0, body:0, main:0, off:0, feet:0 };
                if(!this.player.unlockedGear) this.player.unlockedGear = [0];
            }
        } catch(e) { console.error("Save corrupt", e); }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v21', JSON.stringify({
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
                { id: 'math_aa_sl_may25', name: 'IB Math AA: May 2025' },
                { id: 'math_core', name: 'IB Math Core' }
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
        // Basic Latex detection: if it has backslashes or carets, wrap in $$
        if(s.match(/[\\^_{}]/) || s.includes('log') || s.includes('sin') || s.includes('pi')) {
            // Avoid double wrapping if already wrapped
            if(!s.trim().startsWith('$$')) return `$$ ${s} $$`;
        }
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
            div.className = 'lib-card selected'; // Default selected
            div.innerHTML = `<span>${lib.name}</span><span class="checkmark">✔</span>`;
            div.onclick = () => {
                div.classList.toggle('selected');
                const check = div.querySelector('.checkmark');
                if(check) check.style.display = div.classList.contains('selected') ? 'block' : 'none';
            };
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
            console.log('Engine: Rendering shops...', {gold:this.config.gold, items:this.config.items, unlocked:(this.player && this.player.unlockedGear)});
            if(!this.config.items) this.config.items = {};
            const defaults = ['fifty','freeze','skip','double','restore','focus'];
            defaults.forEach(k=>{ if(typeof this.config.items[k] === 'undefined') this.config.items[k]=0; });
            let stats = document.getElementById('shopStats');
            let items = document.getElementById('shopItems');
            let gear = document.getElementById('shopGear');
            if(stats) stats.innerText = `Gold: ${this.config.gold}`;
            if(items) items.innerHTML = `
                <div class="shop-row">
                    <div class="shop-item">
                        <div class="shop-title">Fifty / 50-50</div>
                        <div class="shop-desc">Remove two wrong choices</div>
                        <div class="shop-cost">Cost: 10</div>
                        <div class="shop-qty">Qty: <span id="countfifty">${this.config.items.fifty}</span></div>
                        <button onclick="Game.buyItem('fifty',10)">Buy</button>
                    </div>
                    <div class="shop-item">
                        <div class="shop-title">Freeze</div>
                        <div class="shop-desc">Pause timer for 5s</div>
                        <div class="shop-cost">Cost: 20</div>
                        <div class="shop-qty">Qty: <span id="countfreeze">${this.config.items.freeze}</span></div>
                        <button onclick="Game.buyItem('freeze',20)">Buy</button>
                    </div>
                    <div class="shop-item">
                        <div class="shop-title">Skip</div>
                        <div class="shop-desc">Skip current question</div>
                        <div class="shop-cost">Cost: 15</div>
                        <div class="shop-qty">Qty: <span id="countskip">${this.config.items.skip}</span></div>
                        <button onclick="Game.buyItem('skip',15)">Buy</button>
                    </div>
                </div>
                <div class="shop-row">
                    <div class="shop-item">
                        <div class="shop-title">Double</div>
                        <div class="shop-desc">Double points for next correct</div>
                        <div class="shop-cost">Cost: 25</div>
                        <div class="shop-qty">Qty: <span id="countdouble">${this.config.items.double}</span></div>
                        <button onclick="Game.buyItem('double',25)">Buy</button>
                    </div>
                    <div class="shop-item">
                        <div class="shop-title">Restore</div>
                        <div class="shop-desc">Restore health</div>
                        <div class="shop-cost">Cost: 30</div>
                        <div class="shop-qty">Qty: <span id="countrestore">${this.config.items.restore}</span></div>
                        <button onclick="Game.buyItem('restore',30)">Buy</button>
                    </div>
                    <div class="shop-item">
                        <div class="shop-title">Focus</div>
                        <div class="shop-desc">Slow down time for 10s</div>
                        <div class="shop-cost">Cost: 40</div>
                        <div class="shop-qty">Qty: <span id="countfocus">${this.config.items.focus}</span></div>
                        <button onclick="Game.buyItem('focus',40)">Buy</button>
                    </div>
                </div>
            `;
            if(gear && Array.isArray(gearConfig)) {
                let html = '';
                gearConfig.forEach(g=>{
                    let unlocked = this.player.unlockedGear && this.player.unlockedGear.includes(g.id);
                    html += `<div class="gear-item">
                        <div class="gear-name">${g.title}</div>
                        <div class="gear-cost">${unlocked ? 'Unlocked' : 'Cost: '+g.cost}</div>
                        <button onclick="Game.handleGear(${g.id},${g.cost})">${unlocked ? (this.player.gear && this.player.gear[g.type]===g.id ? 'Unequip' : 'Equip') : 'Buy'}</button>
                    </div>`;
                });
                gear.innerHTML = html;
            }
    getCost(lvl) { return Math.floor(100 * Math.pow(1.5, lvl)); },
    
    renderShops() {
        console.log('Engine: Rendering shops...', {gold: this.config.gold, items: this.config.items, unlocked: this.player.unlockedGear});
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
            let items = [
                {k:'fifty',c:50,icon:'✂️',name:'50/50 Chance',desc:'Remove 2 wrong answers'},
                {k:'freeze',c:75,icon:'❄️',name:'Time Freeze',desc:'Pause timer 5 seconds'},
                {k:'skip',c:100,icon:'⏭️',name:'Skip Question',desc:'Skip to next question'},
                {k:'double',c:150,icon:'2️⃣',name:'Double Gold',desc:'2x gold next question'},
                {k:'restore',c:90,icon:'❤️',name:'Health Restore',desc:'Restore 1 HP'},
                {k:'focus',c:70,icon:'🎯',name:'Focus',desc:'Add 10 seconds to timer'}
            ];
            items.forEach(it => {
                if(!this.config.items) this.config.items = {};
                if(!this.config.items[it.k]) this.config.items[it.k] = 0;
                let count = this.config.items[it.k];
                 iDiv.innerHTML += `<div class="shop-item"><div style="font-size:1.5rem">${it.icon}</div><h3>${it.name}</h3><p style="font-size:0.7rem;color:#888">${it.desc}</p><p>Owned: ${count}</p><button class="buy-btn" onclick="Game.buyItem('${it.k}',${it.c})">${it.c}g</button></div>`;
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
        console.log('Engine: buyItem', key, cost, 'goldBefore', this.config.gold);
        if(!this.config.items) this.config.items = {};
        if(typeof this.config.items[key] === 'undefined') this.config.items[key] = 0;
        if(this.config.gold >= cost) {
            this.config.gold -= cost;
            this.config.items[key]++;
            this.saveConfig();
            this.renderShops();
            this.updateMenuUI();
        } else {
            console.warn('Not enough gold for', key, cost, 'have', this.config.gold);
        }
    },
    handleGear(id, cost) {
        console.log('Engine: handleGear', id, cost, 'goldBefore', this.config.gold);
        let item = gearConfig.find(x=>x.id===id);
        if(!item) { console.error('Gear item not found for id', id); return; }
        if(!this.player.unlockedGear) this.player.unlockedGear = [];
        if(this.player.unlockedGear.includes(id)) {
            if(!this.player.gear) this.player.gear = {head:0,body:0,main:0,off:0,feet:0};
            if(this.player.gear[item.type] === id) this.player.gear[item.type] = 0; 
            else this.player.gear[item.type] = id;
        } else {
            if(this.config.gold >= cost) {
                this.config.gold -= cost;
                this.player.unlockedGear.push(id);
                if(!this.player.gear) this.player.gear = {head:0,body:0,main:0,off:0,feet:0};
                this.player.gear[item.type] = id;
            } else {
                console.warn('Not enough gold to buy gear', id, cost, 'have', this.config.gold);
            }
        }
        this.saveConfig();
        this.renderShops();
        this.updateMenuUI();
    },

    switchTab(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        // Highlight active
        let btns = document.querySelectorAll('.nav-btn');
        if(tab === 'stats') btns[0].classList.add('active');
        if(tab === 'items') btns[1].classList.add('active');
        if(tab === 'gear') btns[2].classList.add('active');

        // Show correct section
        ['shopStats','shopItems','shopGear'].forEach(id => {
             const el = document.getElementById(id);
             if(el) el.style.display = 'none';
        });
        
        // Logic for the new UI where play is separate
        if(tab === 'run') {
            // 'run' isn't a tab anymore in the shop view, it's the main menu state
            // But we keep the function signature for compatibility
        } else {
            const el = document.getElementById('shop'+tab.charAt(0).toUpperCase()+tab.slice(1));
            if(el) el.style.display = 'grid';
        }
    },

    // --- GAMEPLAY LOOP ---
    startRun() {
        // Filter deck by active files
        let deck = this.library.filter(q => this.config.activeFiles.includes(q._src));
        if(deck.length === 0) deck = this.library; // Fallback

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

        // 1. Chains
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
        if(!this.run.chain || !this.run.chain.data || !this.run.chain.data.steps) return this.nextQ();
        const stepData = this.run.chain.data.steps[this.run.chain.step];
        const preBox = document.getElementById('preambleBox');
        if(preBox) {
            preBox.style.display = 'block';
            preBox.innerHTML = this.formatMath(this.run.chain.data.preamble);
        }
        // Show chain HUD
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
                 const preBox = document.getElementById('preambleBox');
                 if(preBox) {
                     preBox.style.display = 'block';
                     preBox.innerHTML = this.formatMath(content.preamble);
                 }
            }
        }

        const qText = document.getElementById('qText');
        qText.innerHTML = this.formatMath(content.q);
        
        // Force MathJax Update (typeset entire document to ensure rendering)
        if(window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch(() => {});
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

        if(window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise().catch(()=>{});

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
            this.run.gold += Math.floor(10 * this.run.goldMulti);
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
        ['fifty','freeze','skip','double','restore','focus'].forEach(k => {
            if(document.getElementById('count'+k)) 
                 document.getElementById('count'+k).innerText = this.config.items[k] || 0;
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
            let ansTxt = (this.currentQ.type === 'choice') ? this.currentQ.a.toString() : "See above";
            dAns.innerHTML = this.formatMath(ansTxt);
            if(window.MathJax && window.MathJax.typesetPromise) MathJax.typesetPromise().catch(()=>{});
        }
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

    // scratchpad feature removed

    pauseGame() {
        this.safeClassRemove('pauseOverlay', 'hidden');
        clearInterval(this.run.timerInterval);
    },
    resumeGame() {
        this.safeClassAdd('pauseOverlay', 'hidden');
        this.renderTimer();
        this.run.timerInterval = setInterval(() => {
            if(!this.run.freeze) this.run.timeLeft--;
            this.renderTimer();
            if(this.run.timeLeft <= 0) this.handleAnswer(false);
        }, 1000);
    },
    quitRun() {
        location.reload();
    },

    // --- POWERUPS ---
    usePowerup(type) {
        if(this.config.items[type] <= 0) return;
        if(type === 'skip') {
            this.config.items.skip--;
            this.saveConfig();
            this.nextQ();
        }
        if(type === 'fifty') { 
             // Simplified 50/50
             let grid = document.querySelector('.choice-grid');
             if(grid) {
                 let wrongs = Array.from(grid.children).filter(b => !b.onclick.toString().includes('true'));
                 if(wrongs[0]) wrongs[0].style.opacity = 0;
                 if(wrongs[1]) wrongs[1].style.opacity = 0;
                 this.config.items.fifty--;
                 this.saveConfig();
             }
        }
        if(type === 'freeze') {
            this.run.freeze = true;
            this.config.items.freeze--;
            this.saveConfig();
            setTimeout(() => { this.run.freeze = false; }, 5000); // 5 second freeze
        }
        this.updateHUD();
    }
};

// Configs
const gearConfig = [
    // HEAD GEAR
    { id: 101, type: 'head', name: "Beanie", icon: "🧢", cost: 150, stat: "Time +5" },
    { id: 102, type: 'head', name: "Crown", icon: "👑", cost: 1000, stat: "Gold +50%" },
    { id: 103, type: 'head', name: "Headband", icon: "🎀", cost: 200, stat: "HP +1" },
    { id: 104, type: 'head', name: "Goggles", icon: "🥽", cost: 300, stat: "Time +10" },
    { id: 105, type: 'head', name: "Tiara", icon: "💎", cost: 500, stat: "Gold +25%" },
    { id: 106, type: 'head', name: "Helmet", icon: "⚔️", cost: 400, stat: "HP +2" },
    
    // BODY GEAR
    { id: 201, type: 'body', name: "Tee", icon: "👕", cost: 150, stat: "HP +1" },
    { id: 202, type: 'body', name: "Hoodie", icon: "🧥", cost: 250, stat: "HP +2" },
    { id: 203, type: 'body', name: "Robe", icon: "👘", cost: 350, stat: "Gold +20%" },
    { id: 204, type: 'body', name: "Vest", icon: "🦺", cost: 200, stat: "HP +1, Time +3" },
    { id: 205, type: 'body', name: "Suit", icon: "🤵", cost: 600, stat: "Gold +40%" },
    { id: 206, type: 'body', name: "Kimono", icon: "👙", cost: 400, stat: "HP +2, Gold +10%" },
    
    // MAIN HAND (Weapon/Tool)
    { id: 302, type: 'main', name: "Sword", icon: "⚡", cost: 500, stat: "HP +3" },
    { id: 303, type: 'main', name: "Book", icon: "📚", cost: 200, stat: "Time +8" },
    { id: 304, type: 'main', name: "Wand", icon: "✨", cost: 400, stat: "Gold +15%" },
    { id: 305, type: 'main', name: "Torch", icon: "🔥", cost: 300, stat: "Time +10" },
    { id: 306, type: 'main', name: "Scepter", icon: "👑", cost: 800, stat: "Gold +35%, Time +5" },
    
    // OFF HAND (Shield/Item)
    { id: 401, type: 'off', name: "Shield", icon: "🛡️", cost: 250, stat: "HP +2" },
    { id: 402, type: 'off', name: "Notebook", icon: "📓", cost: 150, stat: "Gold +8%" },
    { id: 403, type: 'off', name: "Compass", icon: "🧭", cost: 350, stat: "Time +12" },
    { id: 404, type: 'off', name: "Mirror", icon: "🪞", cost: 300, stat: "HP +1, Gold +10%" },
    { id: 405, type: 'off', name: "Lantern", icon: "🏮", cost: 400, stat: "Time +15" },
    { id: 406, type: 'off', name: "Orb", icon: "🔮", cost: 600, stat: "HP +2, Gold +25%" },
    
    // FEET GEAR
    { id: 501, type: 'feet', name: "Sneakers", icon: "👟", cost: 100, stat: "Time +5" },
    { id: 502, type: 'feet', name: "Boots", icon: "🥾", cost: 200, stat: "HP +1" },
    { id: 503, type: 'feet', name: "Heels", icon: "👠", cost: 250, stat: "Gold +15%" },
    { id: 504, type: 'feet', name: "Slippers", icon: "🩰", cost: 180, stat: "Time +7" },
    { id: 505, type: 'feet', name: "Winged Shoes", icon: "🦅", cost: 500, stat: "Time +20" },
    { id: 506, type: 'feet', name: "Golden Shoes", icon: "✨", cost: 400, stat: "Gold +30%" }
];

window.onload = () => Game.init();