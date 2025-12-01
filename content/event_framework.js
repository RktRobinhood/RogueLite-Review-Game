// Event Framework: builds an index of loaded questions and provides a way
// to schedule special events (boss, mini-boss, dungeon, quest) periodically.

window.EventFramework = (function(){
    const idx = { bySubject: {} };

    function buildIndex(library) {
        idx.bySubject = {};
        library.forEach(q => {
            const subj = q.subject || 'General';
            const topic = q.topic || 'Misc';
            if(!idx.bySubject[subj]) idx.bySubject[subj] = {};
            if(!idx.bySubject[subj][topic]) idx.bySubject[subj][topic] = [];
            idx.bySubject[subj][topic].push(q);
        });
        console.log('EventFramework: built index', Object.keys(idx.bySubject));
    }

    function init(game) {
        // attach index to game for inspection
        game.contentIndex = idx;
        // default settings
        game.eventSettings = game.eventSettings || { interval: 10 };
        console.log('EventFramework: init (interval=', game.eventSettings.interval, ')');
    }

    function sampleFromLibrary(game, filterFn) {
        const pool = game.library.filter(filterFn || (()=>true));
        if(pool.length === 0) return null;
        return pool[Math.floor(Math.random()*pool.length)];
    }

    // helpers
    function randInt(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

    // Create a boss template: wraps an existing question and adds boss metadata
    function makeBossTemplate(game, difficulty='boss') {
        const q = sampleFromLibrary(game, q=>q.type === 'choice');
        if(!q) return null;
        // derive HP and reward by difficulty
        let maxHp = 30;
        if(difficulty === 'mini') maxHp = randInt(12, 22);
        else if(difficulty === 'boss') maxHp = randInt(40, 80);
        else if(difficulty === 'elite') maxHp = randInt(80, 140);

        // allow game-level tuning via game.eventSettings
        const settings = (game && game.eventSettings) ? game.eventSettings : {};
        const hpScale = settings.bossHpScale || 1;
        const rewardScale = settings.bossRewardScale || 1;
        const dmgScale = settings.bossDamageScale || 1;

        maxHp = Math.max(6, Math.floor(maxHp * hpScale));

        const reward = { gold: Math.max(5, Math.floor((maxHp/4) * rewardScale)), xp: Math.max(1, Math.floor((maxHp/10) * rewardScale)) };

        const template = {
            type: 'boss',
            // data holds the question payload to render in the boss encounter
            data: (() => {
                try {
                    const content = q.gen ? q.gen(true) : (q.data || {});
                    return content;
                } catch(e) { console.error('boss gen error', e); return q.data || {}; }
            })(),
            _meta: {
                event: difficulty,
                sourceId: q.id || q.name || 'unknown',
                subjects: [q.subject || 'General'],
                    maxHp: maxHp,
                    hp: maxHp,
                    reward: reward,
                    dmgPerHit: Math.max(3, Math.floor((maxHp/8) * dmgScale)),
                    phases: []
            }
        };
        return template;
    }

    // Create a chain/dungeon template with several questions. Optionally cross subjects.
    function makeChainTemplate(game, length=3, crossSubjects=false) {
        const steps = [];
        if(crossSubjects && idx.bySubject) {
            const subjects = Object.keys(idx.bySubject);
            // pick up to `length` distinct subjects
            const chosen = [];
            for(let i=0;i<Math.min(length, subjects.length); i++) {
                const s = subjects.splice(Math.floor(Math.random()*subjects.length),1)[0];
                if(!s) break;
                // pick a random topic in subject
                const topics = Object.keys(idx.bySubject[s]||{});
                if(topics.length === 0) continue;
                const t = topics[Math.floor(Math.random()*topics.length)];
                const pool = idx.bySubject[s][t] || [];
                if(pool.length === 0) continue;
                const q = pool[Math.floor(Math.random()*pool.length)];
                try { steps.push(q.gen ? q.gen(false) : q.data); } catch(e) { steps.push(q.data); }
            }
        }

        // fallback / default sampling from full library
        while(steps.length < length) {
            const q = sampleFromLibrary(game, q=>q.type === 'choice');
            if(!q) break;
            try { steps.push(q.gen ? q.gen(false) : q.data); } catch(e) { steps.push(q.data); }
        }

        if(steps.length === 0) return null;
        // gather subject list for the chain
        const subjects = [];
        steps.forEach(s => { if(s && s.subject && subjects.indexOf(s.subject) === -1) subjects.push(s.subject); });
        return {
            type:'chain',
            data: { preamble: 'Dungeon Run', steps: steps },
            _meta: { subjects: subjects, length: steps.length, reward: { gold: Math.max(3, steps.length*3) } }
        };
    }

    function maybeInject(game) {
        if(!game || !game.run) return null;
        // count only questions shown in this run
        const n = game.run.qCount || 0;
        const interval = (game.eventSettings && game.eventSettings.interval) || 10;
        if(n > 0 && n % interval === 0) {
            // choose event type
            const roll = Math.random();
            if(roll < 0.15) return makeBossTemplate(game, 'boss');
            if(roll < 0.35) return makeBossTemplate(game, 'mini');
            if(roll < 0.6) return makeChainTemplate(game, 3, true); // short cross-subject chain
            if(roll < 0.85) return makeChainTemplate(game, 3, false);
            return makeChainTemplate(game, 5, true); // longer cross-subject quest
        }
        return null;
    }

    return {
        buildIndex,
        init,
        maybeInject
    };
})();
