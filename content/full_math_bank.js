// Full Math Bank - All question types from original version
Game.addPack({
    id: 'math_full_bank',
    name: 'Complete Math Bank (30+ Types)',
    questions: [
        // 1. Arithmetic Sequence
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Sequences',
            gen: (isBoss) => {
                let u1 = Math.floor(Math.random() * 20) - 10;
                let d = Math.floor(Math.random() * 10) - 5;
                if(d === 0) d = 1;
                let n = isBoss ? Math.floor(Math.random() * 10) + 15 : 10;
                let ans = u1 + (n - 1) * d;
                return {
                    q: `Arithmetic Sequence: $u_1=${u1}, d=${d}$. Find $u_{${n}}$.`,
                    a: ans,
                    w: [ans + d, ans - d, ans + 10]
                };
            }
        },
        // 2. Arithmetic Series
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Series',
            gen: (isBoss) => {
                let u1 = Math.floor(Math.random() * 13) + 2;
                let d = Math.floor(Math.random() * 10) - 5;
                if(d === 0) d = 1;
                let n = Math.floor(Math.random() * 5) + 5;
                let sum = (n / 2) * (2 * u1 + (n - 1) * d);
                return {
                    q: `Find $S_{${n}}$ for sequence ${u1}, ${u1 + d}, ...`,
                    a: sum,
                    w: [sum + 10, sum - d, sum * 2]
                };
            }
        },
        // 3. Geometric Sequence
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Sequences',
            gen: (isBoss) => {
                let u1 = Math.floor(Math.random() * 4) + 2;
                let r = isBoss ? (Math.random() > 0.5 ? -3 : -2) : (Math.floor(Math.random() * 2) + 2);
                let n = Math.floor(Math.random() * 3) + 3;
                let term = u1 * Math.pow(r, n - 1);
                return {
                    q: `Geometric Sequence: $u_1=${u1}, r=${r}$. Find $u_{${n}}$.`,
                    a: term,
                    w: [term * r, -term, term / 2]
                };
            }
        },
        // 4. Infinite Geometric Series
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Series',
            gen: (isBoss) => {
                let top = (Math.floor(Math.random() * 20) + 12) * 6;
                let rDen = Math.floor(Math.random() * 2) + 2;
                let rSign = isBoss && Math.random() > 0.5 ? -1 : 1;
                let r = rSign / rDen;
                let sum = top / (1 - r);
                if (!Number.isInteger(sum)) sum = parseFloat(sum.toFixed(1));
                return {
                    q: `Find $S_{\\infty}$ for series $${top}, ${Math.round(top * r)}, ...$`,
                    a: sum,
                    w: [(sum * 1.5).toFixed(1), (sum / 2).toFixed(1), top * 2]
                };
            }
        },
        // 5. Exponential Equation
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Exponents',
            gen: (isBoss) => {
                let b = Math.floor(Math.random() * 4) + 2;
                let ans = isBoss ? -2 : Math.floor(Math.random() * 3) + 2;
                let res = Math.pow(b, ans);
                let display = ans < 0 ? `\\frac{1}{${Math.pow(b, Math.abs(ans))}}` : res;
                return {
                    q: `Solve: $${b}^x = ${display}$`,
                    a: ans,
                    w: [ans + 1, -ans, ans * 2]
                };
            }
        },
        // 6. Exponent Simplification
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Exponents',
            gen: (isBoss) => {
                let p1 = Math.floor(Math.random() * 5) + 3;
                let p2 = Math.floor(Math.random() * 3) + 2;
                let p3 = Math.floor(Math.random() * 3) + 1;
                return {
                    q: `Simplify: $\\frac{x^{${p1}} \\cdot x^{${p2}}}{x^{${p3}}}$`,
                    a: `x^{${p1 + p2 - p3}}`,
                    w: [`x^{${p1 + p2 + p3}}`, `x^{${p1 * p2}}`, `x^{${p1 - p2}}`]
                };
            }
        },
        // 7. Logarithm Evaluation
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Logarithms',
            gen: (isBoss) => {
                let base = Math.floor(Math.random() * 4) + 2;
                let power = isBoss ? 0 : Math.floor(Math.random() * 3) + 2;
                let result = Math.pow(base, power);
                return {
                    q: `Evaluate: $\\log_{${base}}(${result})$`,
                    a: power,
                    w: [power + 1, 1, result]
                };
            }
        },
        // 8. Logarithm Laws
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Logarithms',
            gen: (isBoss) => {
                let a = Math.floor(Math.random() * 4) + 2;
                let b = Math.floor(Math.random() * 4) + 2;
                return {
                    q: `Simplify: $\\ln(${a}) + \\ln(${b})$`,
                    a: `\\ln(${a * b})`,
                    w: [`\\ln(${a + b})`, `\\ln(${a}^${b})`, a + b]
                };
            }
        },
        // 9. Logarithm Equation
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Logarithms',
            gen: (isBoss) => {
                let base = Math.floor(Math.random() * 5) + 2;
                return {
                    q: `Solve: $\\log_{${base}}(x) = 2$`,
                    a: base * base,
                    w: [base * 2, base + 2, 1]
                };
            }
        },
        // 10. Function Composition
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Functions',
            gen: (isBoss) => {
                let m = Math.floor(Math.random() * 10) - 5;
                if(m === 0) m = 1;
                let c = Math.floor(Math.random() * 8) + 1;
                let input = Math.floor(Math.random() * 4) + 1;
                let result = m * (input + c);
                return {
                    q: `$f(x)=${m}x, g(x)=x+${c}$. Find $f(g(${input}))$.`,
                    a: result,
                    w: [m * input + c, result + m, result - m]
                };
            }
        },
        // 11. Inverse Function
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Functions',
            gen: (isBoss) => {
                if(isBoss) {
                    let ra = Math.floor(Math.random() * 5) + 1;
                    return {
                        q: `Find $f^{-1}(x)$ if $f(x) = \\frac{1}{x} - ${ra}$`,
                        a: `\\frac{1}{x + ${ra}}`,
                        w: [`\\frac{1}{x - ${ra}}`, `x + ${ra}`, `-${ra}x`]
                    };
                } else {
                    let slope = Math.floor(Math.random() * 4) + 2;
                    let b = Math.floor(Math.random() * 5) + 1;
                    return {
                        q: `Find $f^{-1}(x)$ if $f(x) = ${slope}x + ${b}$`,
                        a: `\\frac{x - ${b}}{${slope}}`,
                        w: [`\\frac{x + ${b}}{${slope}}`, `${slope}x - ${b}`, `x - ${b}`]
                    };
                }
            }
        },
        // 12. Vertex Form
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Quadratics',
            gen: (isBoss) => {
                let h = Math.floor(Math.random() * 18) - 9;
                if(h === 0) h = 1;
                let k = Math.floor(Math.random() * 18) - 9;
                if(k === 0) k = 1;
                let sign = isBoss && Math.random() > 0.5 ? -1 : 1;
                let signStr = sign === 1 ? '' : '-';
                let hStr = h < 0 ? `+${Math.abs(h)}` : `-${h}`;
                let kStr = k < 0 ? k : `+${k}`;
                return {
                    q: `Find vertex of $y=${signStr}(x${hStr})^2 ${kStr}$`,
                    a: `(${h},${k})`,
                    w: [`(-${h},${k})`, `(${k},${h})`, `(${h}, -${k})`]
                };
            }
        },
        // 13. Discriminant & Roots
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Quadratics',
            gen: (isBoss) => {
                let b = Math.floor(Math.random() * 5) * 2 + 2;
                let crit = (b * b) / 4;
                let mode = Math.floor(Math.random() * 3);
                if (mode === 0) {
                    return {
                        q: `For 2 real roots in $x^2 + ${b}x + k = 0$, find range of $k$:`,
                        a: `k < ${crit}`,
                        w: [`k > ${crit}`, `k = ${crit}`, `k \\le ${crit}`]
                    };
                } else if (mode === 1) {
                    return {
                        q: `For no real roots in $x^2 + ${b}x + k = 0$, find range of $k$:`,
                        a: `k > ${crit}`,
                        w: [`k < ${crit}`, `k = ${crit}`, `k \\ge ${crit}`]
                    };
                } else {
                    return {
                        q: `For 1 real root in $x^2 + ${b}x + k = 0$, find $k$:`,
                        a: `k = ${crit}`,
                        w: [`k < ${crit}`, `k > ${crit}`, `k \\ne ${crit}`]
                    };
                }
            }
        },
        // 14. Vertical Asymptote
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Rational Functions',
            gen: (isBoss) => {
                let va = Math.floor(Math.random() * 8) + 2;
                return {
                    q: `Find vertical asymptote of $y=\\frac{5}{x-${va}}$`,
                    a: `x=${va}`,
                    w: [`y=${va}`, `x=-${va}`, `y=0`]
                };
            }
        },
        // 15. Horizontal Asymptote
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Rational Functions',
            gen: (isBoss) => {
                let ha = Math.floor(Math.random() * 8) + 2;
                return {
                    q: `Find horizontal asymptote of $y=\\frac{${ha}x+1}{x-2}$`,
                    a: `y=${ha}`,
                    w: [`x=${ha}`, `y=2`, `y=0`]
                };
            }
        },
        // 16. Domain
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Functions',
            gen: (isBoss) => {
                let k = Math.floor(Math.random() * 8) + 1;
                return {
                    q: `Find domain of $f(x)=\\sqrt{x-${k}}$`,
                    a: `x \\ge ${k}`,
                    w: [`x > ${k}`, `x \\le ${k}`, `x < ${k}`]
                };
            }
        },
        // 17. Sigma Notation
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Series',
            gen: (isBoss) => {
                let end = isBoss ? 5 : 3;
                let coeff = Math.floor(Math.random() * 2) + 2;
                let sum = coeff * (end * (end + 1)) / 2;
                return {
                    q: `Evaluate $\\sum_{n=1}^{${end}} ${coeff}n$`,
                    a: sum,
                    w: [sum + 5, sum - 3, coeff * end]
                };
            }
        },
        // 18. Gradient
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Lines',
            gen: (isBoss) => {
                let x1 = Math.floor(Math.random() * 8) - 4;
                let y1 = Math.floor(Math.random() * 8) - 4;
                let x2 = x1 + Math.floor(Math.random() * 6) + 1;
                let y2 = y1 + Math.floor(Math.random() * 6) - 3;
                let grad = (y2 - y1) / (x2 - x1);
                if (!Number.isInteger(grad)) grad = grad.toFixed(2);
                return {
                    q: `Find gradient between $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
                    a: grad,
                    w: [grad + 1, grad - 1, -grad]
                };
            }
        },
        // 19. Distance
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Coordinate Geometry',
            gen: (isBoss) => {
                let a = Math.floor(Math.random() * 5) + 3;
                let b = Math.floor(Math.random() * 5) + 3;
                let dist = Math.sqrt(a * a + b * b);
                if (!Number.isInteger(dist)) dist = dist.toFixed(1);
                return {
                    q: `Distance between $(0,0)$ and $(${a}, ${b})$: `,
                    a: dist,
                    w: [a + b, Math.sqrt(a + b), (dist + 1).toFixed(1)]
                };
            }
        },
        // 20. Perpendicular Lines
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Lines',
            gen: (isBoss) => {
                let m1 = Math.floor(Math.random() * 4) + 1;
                let m2 = -1 / m1;
                return {
                    q: `Line perpendicular to slope $${m1}$ has slope:`,
                    a: m2.toFixed(2),
                    w: [-m1, 1 / m1, m1]
                };
            }
        },
        // 21. Exponential Growth
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Exponentials',
            gen: (isBoss) => {
                let A = Math.floor(Math.random() * 50) + 50;
                let r = Math.floor(Math.random() * 20) + 10;
                let t = Math.floor(Math.random() * 3) + 2;
                let result = Math.round(A * Math.pow(1 + r / 100, t));
                return {
                    q: `$A=${A}, r=${r}\\%, t=${t}$. Find $A(1+r)^t$ value:`,
                    a: result,
                    w: [result + 100, result - 50, Math.round(A * (1 + r / 100))]
                };
            }
        },
        // 22. Midpoint
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Coordinate Geometry',
            gen: (isBoss) => {
                let x1 = Math.floor(Math.random() * 10) - 5;
                let y1 = Math.floor(Math.random() * 10) - 5;
                let x2 = x1 + Math.floor(Math.random() * 8) + 2;
                let y2 = y1 + Math.floor(Math.random() * 8) - 2;
                let mx = (x1 + x2) / 2;
                let my = (y1 + y2) / 2;
                return {
                    q: `Midpoint of $(${x1}, ${y1})$ and $(${x2}, ${y2})$:`,
                    a: `(${mx}, ${my})`,
                    w: [`(${x1}, ${y1})`, `(${x2}, ${y2})`, `(${mx + 1}, ${my + 1})`]
                };
            }
        },
        // 23. Range (Downward Parabola)
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Functions',
            gen: (isBoss) => {
                let k = Math.floor(Math.random() * 10) + 5;
                return {
                    q: `Range of $y=-(x-2)^2 + ${k}$:`,
                    a: `y \\le ${k}`,
                    w: [`y \\ge ${k}`, `y = ${k}`, `y > ${k}`]
                };
            }
        },
        // 24. Axis of Symmetry
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Quadratics',
            gen: (isBoss) => {
                let h = Math.floor(Math.random() * 10) - 5;
                return {
                    q: `Axis of symmetry for $y=(x-${h})^2 + 3$:`,
                    a: `x=${h}`,
                    w: [`x=-${h}`, `y=3`, `x=0`]
                };
            }
        },
        // 25. Logarithm Power Rule
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Logarithms',
            gen: (isBoss) => {
                let p = Math.floor(Math.random() * 4) + 2;
                return {
                    q: `Simplify $\\log_3(3^${p})$:`,
                    a: p,
                    w: [p + 1, 3, 1]
                };
            }
        },
        // 26. Linear Inequality
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Inequalities',
            gen: (isBoss) => {
                let a = Math.floor(Math.random() * 8) + 2;
                let b = Math.floor(Math.random() * 10) - 3;
                let sol = -b / a;
                if (!Number.isInteger(sol)) sol = sol.toFixed(1);
                return {
                    q: `Solve $${a}x > ${b}$ for $x$:`,
                    a: `x > ${sol}`,
                    w: [`x < ${sol}`, `x = ${sol}`, `x \\le ${sol}`]
                };
            }
        },
        // 27. Rational Exponent
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Exponents',
            gen: (isBoss) => {
                let base = Math.floor(Math.random() * 6) + 2;
                let n = Math.floor(Math.random() * 3) + 2;
                return {
                    q: `Simplify $${base}^{1/${n}}$:`,
                    a: `\\sqrt[${n}]{${base}}`,
                    w: [`\\frac{${base}}{${n}}`, `${base}/${n}`, `${base}^${n}`]
                };
            }
        },
        // 28. Function Evaluation
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Functions',
            gen: (isBoss) => {
                let a = Math.floor(Math.random() * 6) + 1;
                let b = Math.floor(Math.random() * 6) + 1;
                let x = Math.floor(Math.random() * 5) + 1;
                let result = a * x + b;
                return {
                    q: `If $f(x)=${a}x+${b}$, find $f(${x})$:`,
                    a: result,
                    w: [result + 1, result - 1, a * b]
                };
            }
        },
        // 29. Difference of Squares
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Algebra',
            gen: (isBoss) => {
                let a = Math.floor(Math.random() * 5) + 2;
                let b = Math.floor(Math.random() * 5) + 2;
                return {
                    q: `Factor $x^{${2*a}} - ${b * b}$:`,
                    a: `(x^${a} - ${b})(x^${a} + ${b})`,
                    w: [`(x - ${b})^2`, `(x + ${b})^2`, `x^${2*a - b}`]
                };
            }
        },
        // 30. System of Equations
        {
            type: 'choice',
            subject: 'Math',
            topic: 'Algebra',
            gen: (isBoss) => {
                let x = Math.floor(Math.random() * 8) + 1;
                let y = Math.floor(Math.random() * 8) + 1;
                let a1 = Math.floor(Math.random() * 3) + 1;
                let b1 = Math.floor(Math.random() * 3) + 1;
                let c1 = a1 * x + b1 * y;
                return {
                    q: `Solve: $${a1}x + ${b1}y = ${c1}, x = ${x}$. Find $y$:`,
                    a: y,
                    w: [y + 1, y - 1, x]
                };
            }
        }
    ]
});
