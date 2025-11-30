Game.addPack({
    id: "math_aa_sl_may25",
    name: "IB Math AA: May 2025",
    questions: [
        // --- TOPIC 1: ALGEBRA ---
        {
            type: "choice", subject: "Math AA", topic: "Algebra",
            gen: () => {
                let u1 = Math.floor(Math.random()*10)+2;
                let d = Math.floor(Math.random()*5)+2;
                return { 
                    q: `Arithmetic Seq: $u_1=${u1}, d=${d}$. Find $u_{10}$.`, 
                    a: u1 + 9*d, 
                    w: [u1+10*d, u1*Math.pow(d,9), u1+8*d] 
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "Algebra",
            gen: () => {
                let n = Math.floor(Math.random()*3)+3; 
                // Binomial coeff of x^2 in (x+2)^n
                let ans = (n*(n-1)/2) * 4;
                return {
                    q: `Find the coeff of $x^{${n-2}}$ in $(x+2)^${n}$.`,
                    a: ans,
                    w: [ans*2, ans/2, ans+4]
                };
            }
        },

        // --- TOPIC 2: FUNCTIONS ---
        {
            type: "choice", subject: "Math AA", topic: "Functions",
            gen: () => {
                let h = Math.floor(Math.random()*5)+1;
                let k = Math.floor(Math.random()*5)+1;
                return {
                    q: `Find the vertex of $y = 2(x-${h})^2 + ${k}$.`,
                    a: `(${h}, ${k})`,
                    w: [`(-${h}, ${k})`, `(${k}, ${h})`, `(${h}, -${k})`]
                };
            }
        },

        // --- TOPIC 5: CALCULUS ---
        {
            type: "choice", subject: "Math AA", topic: "Calculus",
            gen: () => {
                let p = Math.floor(Math.random()*3)+2;
                return {
                    q: `$\\frac{d}{dx} \\ln(x^${p})$`,
                    a: `$\\frac{${p}}{x}$`,
                    w: [`$\\frac{1}{x^${p}}$`, `$x^${p-1}$`, `$\\frac{1}{${p}x}$`]
                };
            }
        },

        // --- CHAIN: KINEMATICS ---
        {
            type: "chain",
            subject: "Math AA",
            topic: "Calculus",
            data: {
                preamble: "A particle moves with velocity $v(t) = 3t^2 - 2t$ m/s.",
                steps: [
                    { q: "Find the initial acceleration.", a: "-2", w: ["0", "3", "-1"] },
                    { q: "Find the velocity at $t=2$.", a: "8", w: ["6", "10", "4"] },
                    { q: "Find the displacement at $t=1$, given $s(0)=0$.", a: "0", w: ["1", "2", "0.5"] } // s = t^3 - t^2
                ]
            }
        },

        // --- CHAIN: PROBABILITY ---
        {
            type: "chain",
            subject: "Math AA",
            topic: "Statistics",
            data: {
                preamble: "Events A and B are independent. $P(A)=0.4, P(B)=0.5$.",
                steps: [
                    { q: "Find $P(A \\cap B)$.", a: 0.2, w: [0.9, 0.1, 0.5] },
                    { q: "Find $P(A \\cup B)$.", a: 0.7, w: [0.9, 0.2, 0.8] },
                    { q: "Find $P(A|B)$.", a: 0.4, w: [0.5, 0.2, 0.1] }
                ]
            }
        }
    ]
});