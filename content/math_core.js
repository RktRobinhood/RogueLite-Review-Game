Game.addPack({
    id: "math_core",
    name: "IB Math Core",
    questions: [
        {
            type: "choice", subject: "Math", topic: "Algebra",
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
            type: "choice", subject: "Math", topic: "Calculus",
            gen: () => {
                let p = Math.floor(Math.random()*4)+2;
                return {
                    q: `Differentiate $f(x) = x^${p}$.`,
                    a: `$${p}x^${p-1}$`,
                    w: [`$x^${p-1}$`, `$\\frac{x^${p+1}}{${p+1}}$`, `$${p}x$`]
                };
            }
        },
        {
            type: "choice", subject: "Math", topic: "Functions",
            gen: () => {
                let h = Math.floor(Math.random()*5)+1;
                let k = Math.floor(Math.random()*5)+1;
                return {
                    q: `Find the vertex of $y = 2(x-${h})^2 + ${k}$.`,
                    a: `(${h}, ${k})`,
                    w: [`(-${h}, ${k})`, `(${k}, ${h})`, `(${h}, -${k})`]
                };
            }
        }
    ]
});