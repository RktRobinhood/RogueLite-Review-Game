Game.addPack({
    id: "starter_pack_01",
    name: "Starter Content",
    questions: [
        // --- NEW TYPE: MATCHING (Psychology Example) ---
        {
            subject: "Psychology",
            topic: "Biological",
            type: "match",
            data: {
                q: "Match the Localization",
                pairs: [
                    { left: "Hippocampus", right: "Memory" },
                    { left: "Amygdala", right: "Emotion" },
                    { left: "Broca Area", right: "Speech Prod." },
                    { left: "Wernicke Area", right: "Understanding" }
                ]
            }
        },
        // --- NEW TYPE: BLANK (TOK Example) ---
        {
            subject: "TOK",
            topic: "Core",
            type: "blank",
            data: {
                q: "___ is justified true belief.",
                a: "Knowledge",
                w: ["Truth", "Wisdom", "Evidence", "Perspective"]
            }
        },
        // --- OLD TYPE: MATH (Dynamic) ---
        {
            subject: "IB Math AA",
            topic: "Algebra",
            type: "choice",
            gen: (isBoss) => {
                let u1 = Math.floor(Math.random()*20)-10;
                let d = Math.floor(Math.random()*10)-5 || 2;
                let n = 10;
                return {
                    q: `u_1=${u1}, d=${d}. \\text{ Find } u_{${n}}`,
                    a: u1 + (n-1)*d,
                    w: [u1+n*d, u1+(n+1)*d, u1-d]
                };
            }
        },
        {
            subject: "IB Math AA",
            topic: "Calculus",
            type: "choice",
            gen: (isBoss) => {
                let p = Math.floor(Math.random()*4)+2;
                return {
                    q: `\\frac{d}{dx} x^${p}`,
                    a: `${p}x^${p-1}`,
                    w: [`x^${p-1}`, `x^${p+1}`, `${p}x`]
                };
            }
        }
    ]
});