Game.addPack({
    id: "extras_pack",
    name: "Psych, TOK & Chains",
    questions: [
        // --- PSYCHOLOGY (Matching) ---
        {
            type: "match",
            subject: "Psychology",
            topic: "Biological",
            data: {
                q: "Match the Brain Function",
                pairs: [
                    { left: "Hippocampus", right: "Memory" },
                    { left: "Amygdala", right: "Emotion" },
                    { left: "Broca's Area", right: "Speech" }
                ]
            }
        },
        
        // --- TOK (Fill in Blank) ---
        {
            type: "blank",
            subject: "TOK",
            topic: "Core",
            data: {
                q: "Knowledge is defined as justified true ___.",
                a: "belief",
                w: ["opinion", "evidence", "logic", "wisdom", "fact"]
            }
        },

        // --- MATH CHAIN (Multi-Step) ---
        {
            type: "chain",
            subject: "Math AA",
            topic: "Functions",
            data: {
                preamble: "Consider the function $f(x) = x^2 - 4x + 3$.",
                steps: [
                    { 
                        q: "Step 1: Find the y-intercept.", 
                        a: 3, 
                        w: [1, -4, 0] 
                    },
                    { 
                        q: "Step 2: Find the x-coordinate of the vertex.", 
                        a: 2, 
                        w: [-2, 4, 1] 
                    },
                    { 
                        q: "Step 3: Factorize the function.", 
                        a: "$(x-3)(x-1)$", 
                        w: ["$(x+3)(x+1)$", "$(x-4)(x+1)$"] 
                    }
                ]
            }
        }
    ]
});