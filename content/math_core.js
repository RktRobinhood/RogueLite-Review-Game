Game.addPack({
    id: "math_core",
    name: "IB Math AA (Core)",
    questions: [
        // --- ALGEBRA ---
        {
            type: "choice",
            subject: "Math AA",
            topic: "Algebra",
            gen: (isBoss) => {
                // Simple Linear Equation: 2x = 4
                let x = Math.floor(Math.random() * 10) + 2;
                let coeff = Math.floor(Math.random() * 5) + 2;
                return { 
                    q: `\\text{Solve for } x: ${coeff}x = ${coeff*x}`, 
                    a: x, 
                    w: [x+1, x-1, 0] 
                };
            }
        },
        {
            type: "choice",
            subject: "Math AA",
            topic: "Algebra",
            gen: (isBoss) => {
                // Exponents
                let b = Math.floor(Math.random() * 3) + 2;
                let p = Math.floor(Math.random() * 3) + 2;
                return { 
                    q: `\\text{Evaluate } ${b}^${p}`, 
                    a: Math.pow(b, p), 
                    w: [Math.pow(b, p-1), b*p, Math.pow(b, p)+b] 
                };
            }
        },

        // --- CALCULUS ---
        {
            type: "choice",
            subject: "Math AA",
            topic: "Calculus",
            gen: (isBoss) => {
                // Power Rule Derivative
                let p = Math.floor(Math.random() * 4) + 2;
                return { 
                    q: `\\frac{d}{dx} x^${p}`, 
                    a: `${p}x^${p-1}`, 
                    w: [`x^${p-1}`, `\\frac{x^${p+1}}{${p+1}}`, `${p}x`] 
                };
            }
        },
        {
            type: "choice",
            subject: "Math AA",
            topic: "Calculus",
            gen: (isBoss) => {
                // Integral of Constant
                let k = Math.floor(Math.random() * 9) + 1;
                return { 
                    q: `\\int ${k} \\, dx`, 
                    a: `${k}x + C`, 
                    w: [`${k} + C`, `x + C`, `0`] 
                };
            }
        },

        // --- TRIGONOMETRY ---
        {
            type: "choice",
            subject: "Math AA",
            topic: "Trig",
            gen: (isBoss) => {
                // Exact Values (Cosine)
                return { 
                    q: `\\cos(120^{\\circ})`, 
                    a: `-0.5`, 
                    w: [`0.5`, `\\frac{\\sqrt{3}}{2}`, `-\\frac{\\sqrt{3}}{2}`] 
                };
            }
        }
    ]
});