Game.addPack({
    id: "starter_pack",
    name: "Starter Content",
    questions: [
        {
            type: "choice",
            subject: "Math",
            topic: "Algebra",
            gen: () => {
                let x = Math.floor(Math.random() * 10) + 2;
                return { q: `Solve $2x = ${2*x}$`, a: x, w: [x+1, x-1, 0] };
            }
        },
        // Chain Question Example
        {
            type: 'chain',
            subject: 'Math AA',
            topic: 'Functions',
            preamble: "Consider $f(x) = x^2 - 4x + 3$.",
            steps: [
                { q: "Find the y-intercept.", a: 3, w: [0, -4, 1] },
                { q: "Find the vertex x-coordinate.", a: 2, w: [-2, 4, -4] }
            ]
        }
    ]
});