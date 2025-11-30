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
        this.loadConfig();
        if(!this.player.face) this.player.face = "😐";
        this.initScratchpad();
        
        await this.fetchManifest();
        await this.loadContent();
        
        if(this.library.length === 0) {
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
        if(el) el.classList.add(cls); // 'hidden' usually adds display:none
    },
    safeClassAdd(id, cls) {
        const el = document.getElementById(id);
        if(el) el.classList.remove(cls); // removing 'hidden' shows it
    },
    safeText(id, txt) {
        const el = document.getElementById(id);
        if(el) el.innerText = txt;
    },

    loadConfig() {
        let d = localStorage.getItem('rogueConfig_v12');
        if(d) {
            let data = JSON.parse(d);
            this.config = data.config || this.config;
            this.player = data.player || this.player;
        }
    },
    saveConfig() {
        localStorage.setItem('rogueConfig_v12', JSON.stringify({
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
            console.log("Using Local Fallback Manifest");
            this.manifest = [
                { id: 'math_core', name: 'IB Math Core', file: 'content/math_core.js' },
                { id: 'extras', name: 'Extras', file: 'content/extras.js' }
            ];
        }
        this.updateLoader(50);
    },

    async loadContent() {
        this.library = [];
        // Wait for scripts
        await new Promise(r => setTimeout(r, 200));
        this.updateLoader(100);
    },

    addPack(pack) {
        pack.questions.forEach(q => {
            q._src = pack.id;
            this.library.push(q);
        });
        console.log(`Loaded: ${pack.name}`);
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
  