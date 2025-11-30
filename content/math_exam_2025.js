Game.addPack({
    id: "math_aa_sl_may25",
    name: "IB Math AA: May 2025 Exam",
    questions: [
        // --- TOPIC 1: NUMBER & ALGEBRA ---
        {
            type: "choice", subject: "Math AA", topic: "1.2 Sequences",
            gen: (h) => {
                // Arithmetic Sequence
                let u1 = Math.floor(Math.random()*10)+2;
                let d = Math.floor(Math.random()*5)+2;
                let n = 10;
                return {
                    q: `In an arithmetic sequence, $u_1 = ${u1}$ and $d = ${d}$. Find $u_{${n}}$.`,
                    a: u1 + (n-1)*d,
                    w: [u1 + n*d, u1 + (n+1)*d, u1*Math.pow(d, n-1)]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "1.3 Logs",
            gen: (h) => {
                let b = Math.floor(Math.random()*3)+2;
                let p = Math.floor(Math.random()*3)+2;
                return {
                    q: `Evaluate $\\log_${b} (${Math.pow(b, p)})$.`,
                    a: p,
                    w: [1, Math.pow(b, p), 0]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "1.4 Financial",
            gen: (h) => {
                // Simple Binomial Expansion Coeff
                let n = 4;
                return {
                    q: `Find the coefficient of the $x^2$ term in the expansion of $(x+2)^${n}$.`,
                    a: 24, // 4C2 * 2^2 = 6 * 4
                    w: [6, 12, 16]
                };
            }
        },

        // --- TOPIC 2: FUNCTIONS ---
        {
            type: "choice", subject: "Math AA", topic: "2.2 Functions",
            gen: (h) => {
                let c = Math.floor(Math.random()*5)+1;
                return {
                    q: `Find the inverse function of $f(x) = 2x + ${c}$.`,
                    a: `$\\frac{x-${c}}{2}$`,
                    w: [`$\\frac{x+${c}}{2}$`, `$2x-${c}$`, `$\\frac{1}{2x+${c}}$`]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "2.6 Quadratics",
            gen: (h) => {
                let k = Math.floor(Math.random()*5)+2;
                return {
                    q: `Find the coordinates of the vertex of $y = (x-${k})^2 + 3$.`,
                    a: `(${k}, 3)`,
                    w: [`(-${k}, 3)`, `(3, ${k})`, `(${k}, -3)`]
                };
            }
        },
        
        // --- TOPIC 3: TRIGONOMETRY ---
        {
            type: "choice", subject: "Math AA", topic: "3.2 Unit Circle",
            gen: (h) => {
                return {
                    q: `Find the exact value of $\\cos(120^\\circ)$.`,
                    a: `$-\\frac{1}{2}$`,
                    w: [`$\\frac{1}{2}$`, `$-\\frac{\\sqrt{3}}{2}$`, `$\\frac{\\sqrt{3}}{2}$`]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "3.3 Triangles",
            gen: (h) => {
                return {
                    q: `In $\\triangle ABC$, $AB=5$, $BC=6$, $\\angle B = 90^\\circ$. Find $AC$.`,
                    a: `$\\sqrt{61}$`,
                    w: [`11`, `$\\sqrt{11}$`, `30`]
                };
            }
        },

        // --- TOPIC 4: STATISTICS ---
        {
            type: "choice", subject: "Math AA", topic: "4.5 Probability",
            gen: (h) => {
                return {
                    q: `If $P(A) = 0.4$, $P(B) = 0.5$ and events are independent, find $P(A \\cap B)$.`,
                    a: 0.2,
                    w: [0.9, 0.1, 0.5]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "4.7 Distributions",
            gen: (h) => {
                return {
                    q: `Given $X \\sim B(10, 0.5)$, find the expected value $E(X)$.`,
                    a: 5,
                    w: [0.5, 10, 2.5]
                };
            }
        },

        // --- TOPIC 5: CALCULUS ---
        {
            type: "choice", subject: "Math AA", topic: "5.3 Derivative",
            gen: (h) => {
                let p = Math.floor(Math.random()*4)+2;
                return {
                    q: `Differentiate $f(x) = x^${p}$.`,
                    a: `$${p}x^${p-1}$`,
                    w: [`$x^${p-1}$`, `$\\frac{x^${p+1}}{${p+1}}$`, `$${p}x$`]
                };
            }
        },
        {
            type: "choice", subject: "Math AA", topic: "5.5 Integration",
            gen: (h) => {
                return {
                    q: `Find $\\int \\cos x \\, dx$.`,
                    a: `$\\sin x + C$`,
                    w: [`$-\\sin x + C$`, `$\\cos x + C$`, `$-\\cos x + C$`]
                };
            }
        },

        // --- CHAIN QUESTIONS (DUNGEONS) ---
        {
            type: "chain",
            subject: "Math AA",
            topic: "Functions",
            data: {
                preamble: "Consider the function $f(x) = x^2 - 6x + 5$.",
                steps: [
                    { q: "Find the $y$-intercept.", a: 5, w: [-6, 1, 0] },
                    { q: "Factorize the expression.", a: "$(x-5)(x-1)$", w: ["$(x+5)(x+1)$", "$(x-3)(x-2)$", "$(x-6)(x+1)$"] },
                    { q: "Find the x-coordinate of the vertex.", a: 3, w: [-3, 6, 2.5] }
                ]
            }
        },
        {
            type: "chain",
            subject: "Math AA",
            topic: "Calculus",
            data: {
                preamble: "A particle moves with velocity $v(t) = 3t^2 - 2t$.",
                steps: [
                    { q: "Find the acceleration function $a(t)$.", a: "$6t - 2$", w: ["$t^3 - t^2$", "$3t - 2$", "$6t$"] },
                    { q: "Find the initial velocity ($t=0$).", a: 0, w: [-2, 3, 1] },
                    { q: "Find the displacement $s(t)$ if $s(0)=5$.", a: "$t^3 - t^2 + 5$", w: ["$t^3 - t^2$", "$6t - 2 + C$", "$t^3 - t^2 + C$"] }
                ]
            }
        }
    ]
});