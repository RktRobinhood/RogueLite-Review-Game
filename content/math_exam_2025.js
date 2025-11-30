Game.addPack({
    id: "math_aa_sl_may25",
    name: "IB Math AA: May 2025",
    questions: [
        // --- TOPIC 1: ALGEBRA ---
        {
            type: "choice", subject: "Math AA", topic: "Algebra",
            gen: (h) => {
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
            gen: (h) => {
                let n = Math.floor(Math.random()*3)+3; 
                // Binomial coeff of x^2 in (x+2)^n
                // nC2 * 2^(n-2)
                let nC2 = (n*(n-1))/2;
                let pow2 = Math.pow(2, n-2);
                let ans = nC2 * pow2;
                return {
                    q: `Find the coeff of $x^2$ in $(x+2)^${n}$.`,
                    a: ans,
                    w: [ans*2, ans/2, nC2]
                };
            }
        },

        // --- TOPIC 2: FUNCTIONS ---
        {
            type: "choice", subject: "Math AA", topic: "Functions",
            gen: (h) => {
                let hVal = Math.floor(Math.random()*5)+1;
                let k = Math.floor(Math.random()*5)+1;
                return {
                    q: `Find the vertex of $y = 2(x-${hVal})^2 + ${k}$.`,
                    a: `(${hVal}, ${k})`,
                    w: [`(-${hVal}, ${k})`, `(${k}, ${hVal})`, `(${hVal}, -${k})`]
                };
            }
        },

        // --- TOPIC 5: CALCULUS ---
        {
            type: "choice", subject: "Math AA", topic: "Calculus",
            gen: (h) => {
                let p = Math.floor(Math.random()*3)+2;
                return {
                    q: `$\\frac{d}{dx} \\ln(x^${p})$`,
                    a: `$\\frac{${p}}{x}$`,
                    w: [`$\\frac{1}{x^${p}}$`, `$x^${p-1}$`, `$\\frac{1}{${p}x}$`]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "Calculus",
            gen: (h) => {
                return {
                    q: `Find $\\int \\cos x \\, dx$.`,
                    a: `$\\sin x + C$`,
                    w: [`$-\\sin x + C$`, `$\\cos x + C$`, `$-\\cos x + C$`]
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
                    { q: "Find the acceleration function $a(t)$.", a: "$6t - 2$", w: ["$t^3 - t^2$", "$3t - 2$", "$6t$"] },
                    { q: "Find the initial velocity ($t=0$).", a: 0, w: [-2, 3, 1] },
                    { q: "Find the displacement at $t=1$, given $s(0)=0$.", a: "0", w: ["1", "2", "0.5"] } 
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