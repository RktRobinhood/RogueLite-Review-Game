// Placeholder for AA SL Sequences & Series packs
// Pack collection: ~100 questions covering Arithmetic/Geometric sequences, Series, Convergence

// Pack: AA SL - Sequences (Batch 1)
// Coverage: Arithmetic sequences, basic properties, sum formulas
Game.addPack({
    id: 'aa_sequences_01',
    name: 'AA SL - Sequences (Batch 1)',
    _src: 'AA_SL/sequences.js',
    questions: [
        // 1
        { type: 'choice', subject: 'Sequences', topic: 'Arithmetic sequence', q: 'Sequence 2, 5, 8, 11,... has common difference', a: '3', w: ['2','5','1'] },
        // 2
        { type: 'choice', subject: 'Sequences', topic: 'Arithmetic formula', q: 'nth term of arithmetic sequence: a_n =', a: 'a_1 + (n-1)d', w: ['a_1*d^(n-1)','n*d','a_1 + nd'] },
        // 3
        { type: 'choice', subject: 'Sequences', topic: 'Find term', q: '10th term of sequence 3, 7, 11,... is', a: '39', w: ['30','43','35'] },
        // 4
        { type: 'choice', subject: 'Sequences', topic: 'Common difference', q: 'If a_1=5 and a_5=17, common difference d is', a: '3', w: ['5','4','2'] },
        // 5
        { type: 'choice', subject: 'Sequences', topic: 'Sum formula', q: 'Sum of first n terms: S_n =', a: '(n/2)(a_1 + a_n)', w: ['n*a_1 + d','(n/2)(2a_1 + (n-1)d)','n*d'] },
        // 6
        { type: 'choice', subject: 'Sequences', topic: 'Sum arithmetic', q: 'Sum of first 10 terms of 2, 5, 8,... is', a: '155', w: ['150','160','140'] },
        // 7
        { type: 'choice', subject: 'Sequences', topic: 'Position of term', q: 'Term 50 in sequence 1, 3, 5,... has position', a: '50', w: ['49','25','75'] },
        // 8
        { type: 'choice', subject: 'Sequences', topic: 'Arithmetic mean', q: 'Arithmetic mean of 2 and 10 is', a: '6', w: ['8','5','12'] },
        // 9
        { type: 'choice', subject: 'Sequences', topic: 'Insert terms', q: 'Insert 2 terms between 3 and 12 to form arithmetic sequence', a: '3, 6, 9, 12', w: ['3, 5, 11, 12','3, 7, 10, 12','3, 4, 8, 12'] },
        // 10
        { type: 'choice', subject: 'Sequences', topic: 'Negative difference', q: 'Sequence 20, 15, 10, 5,... has d =', a: '-5', w: ['5','-4','-10'] },
        // 11
        { type: 'choice', subject: 'Sequences', topic: 'Constant sequence', q: 'Sequence 5, 5, 5,... is arithmetic with d =', a: '0', w: ['5','1','-5'] },
        // 12
        { type: 'choice', subject: 'Sequences', topic: 'Sum to position', q: 'Sum from position 5 to 10 (of arithmetic sequence)', a: 'S_10 - S_4', w: ['S_5 + S_10','10*a_5','a_5 + a_10'] },
        // 13
        { type: 'choice', subject: 'Sequences', topic: 'Term in sequence', q: 'Is 50 in sequence 2, 7, 12, 17,...?', a: 'Yes', w: ['No','Cannot determine','Only if d=3'] },
        // 14
        { type: 'choice', subject: 'Sequences', topic: 'Last term formula', q: 'Last term of arithmetic sequence (n terms) is', a: 'a_1 + (n-1)d', w: ['a_1 + nd','a_1*d','a_n + d'] },
        // 15
        { type: 'choice', subject: 'Sequences', topic: 'Find difference', q: 'Sequence 100, 94, 88,... has d =', a: '-6', w: ['6','-8','100'] },
        // 16
        { type: 'choice', subject: 'Sequences', topic: 'Sum formula alt', q: 'S_n = (n/2)(2a_1 + (n-1)d) equivalent to', a: 'S_n = (n/2)(a_1 + a_n)', w: ['S_n = n*d','S_n = n*a_1','S_n = a_n - a_1'] },
        // 17
        { type: 'choice', subject: 'Sequences', topic: 'Pattern', q: 'Sequence 1, 4, 7, 10,... follows pattern a_n =', a: '3n - 2', w: ['2n - 1','n + 3','n^2'] },
        // 18
        { type: 'choice', subject: 'Sequences', topic: 'General term', q: 'General term of sequence with a_1=-3, d=2', a: 'a_n = 2n - 5', w: ['a_n = -3 + 2n','a_n = 2n - 3','a_n = -5 + 2n'] },
        // 19
        { type: 'choice', subject: 'Sequences', topic: 'Sum first 20', q: 'Sum of first 20 odd numbers 1+3+5+...+39', a: '400', w: ['380','420','190'] },
        // 20
        { type: 'choice', subject: 'Sequences', topic: 'Summary', q: 'Arithmetic sequence key: constant', a: 'Difference', w: ['Ratio','Sum','Product'] }
    ]
});

// Pack: AA SL - Sequences (Batch 2)
// Coverage: Geometric sequences, basic properties, sum formulas
Game.addPack({
    id: 'aa_sequences_02',
    name: 'AA SL - Sequences (Batch 2)',
    _src: 'AA_SL/sequences.js',
    questions: [
        // 21
        { type: 'choice', subject: 'Sequences', topic: 'Geometric sequence', q: 'Sequence 2, 6, 18, 54,... has common ratio', a: '3', w: ['2','4','6'] },
        // 22
        { type: 'choice', subject: 'Sequences', topic: 'Geometric formula', q: 'nth term of geometric sequence: a_n =', a: 'a_1 * r^(n-1)', w: ['a_1 + (n-1)r','a_1 * r^n','a_1 + nr'] },
        // 23
        { type: 'choice', subject: 'Sequences', topic: 'Find term geometric', q: '5th term of sequence 2, 4, 8,... is', a: '32', w: ['16','64','10'] },
        // 24
        { type: 'choice', subject: 'Sequences', topic: 'Common ratio', q: 'If a_1=3 and a_4=81, common ratio r is', a: '3', w: ['27','9','2'] },
        // 25
        { type: 'choice', subject: 'Sequences', topic: 'Sum geometric', q: 'Sum of first n terms of geometric series (r≠1): S_n =', a: 'a_1(1-r^n)/(1-r)', w: ['a_1/(1-r)','n*a_1','a_1*r^n'] },
        // 26
        { type: 'choice', subject: 'Sequences', topic: 'Geometric mean', q: 'Geometric mean of 4 and 9 is', a: '6', w: ['6.5','7','5'] },
        // 27
        { type: 'choice', subject: 'Sequences', topic: 'Ratio less than 1', q: 'Sequence 16, 8, 4, 2,... has r =', a: '0.5', w: ['2','0.25','-0.5'] },
        // 28
        { type: 'choice', subject: 'Sequences', topic: 'Negative ratio', q: 'Sequence 2, -6, 18, -54,... has r =', a: '-3', w: ['3','-2','6'] },
        // 29
        { type: 'choice', subject: 'Sequences', topic: 'Sum geometric finite', q: 'Sum of first 6 terms of 1, 2, 4,... (r=2)', a: '63', w: ['64','32','127'] },
        // 30
        { type: 'choice', subject: 'Sequences', topic: 'Infinite series', q: 'Infinite geometric series with |r|<1 converges to', a: 'a_1/(1-r)', w: ['a_1/(1+r)','a_1*r','0'] },
        // 31
        { type: 'choice', subject: 'Sequences', topic: 'Convergence condition', q: 'Geometric series converges if', a: '|r| < 1', w: ['r > 0','r < 0','r ≠ 0'] },
        // 32
        { type: 'choice', subject: 'Sequences', topic: 'Infinite sum', q: 'Sum of infinite series 1 + 1/2 + 1/4 + ... (r=0.5)', a: '2', w: ['1','1.5','3'] },
        // 33
        { type: 'choice', subject: 'Sequences', topic: 'Diverges', q: 'Series 1 + 2 + 4 + 8 + ... diverges because', a: 'r = 2 > 1', w: ['r < 0','r = 1','All series diverge'] },
        // 34
        { type: 'choice', subject: 'Sequences', topic: 'Ratio sign', q: 'If r < 0, geometric sequence', a: 'Alternates signs', w: ['Always positive','Always negative','Converges'] },
        // 35
        { type: 'choice', subject: 'Sequences', topic: 'Find ratio', q: 'Sequence 5, 10, 20,... has ratio r =', a: '2', w: ['5','1','3'] },
        // 36
        { type: 'choice', subject: 'Sequences', topic: 'Term value', q: '7th term of 3, 6, 12,... is', a: '192', w: ['144','256','108'] },
        // 37
        { type: 'choice', subject: 'Sequences', topic: 'Infinite sum decimal', q: 'Sum of 0.3̄ = 0.333... as fraction', a: '1/3', w: ['0.3','3/10','1/2'] },
        // 38
        { type: 'choice', subject: 'Sequences', topic: 'Repeating decimal', q: 'Sum of 0.1̄6̄ = 0.161616... as fraction', a: '16/99', w: ['16/100','1/6','16/90'] },
        // 39
        { type: 'choice', subject: 'Sequences', topic: 'Formula alternate', q: 'S_n = a_1(r^n - 1)/(r - 1) used when', a: 'r > 1', w: ['r < 1','r = 1','Always'] },
        // 40
        { type: 'choice', subject: 'Sequences', topic: 'Summary', q: 'Geometric sequence key: constant', a: 'Ratio', w: ['Difference','Sum','Product'] }
    ]
});

// Pack: AA SL - Sequences (Batch 3)
// Coverage: Series notation, summation, more complex series
Game.addPack({
    id: 'aa_sequences_03',
    name: 'AA SL - Sequences (Batch 3)',
    _src: 'AA_SL/sequences.js',
    questions: [
        // 41
        { type: 'choice', subject: 'Series', topic: 'Sigma notation', q: 'Σ(n=1 to 5) n means', a: '1+2+3+4+5', w: ['1*2*3*4*5','n','5n'] },
        // 42
        { type: 'choice', subject: 'Series', topic: 'Summation', q: 'Σ(k=1 to n) k =', a: 'n(n+1)/2', w: ['n^2','n!','n(n-1)/2'] },
        // 43
        { type: 'choice', subject: 'Series', topic: 'Sum of squares', q: 'Σ(k=1 to n) k^2 =', a: 'n(n+1)(2n+1)/6', w: ['n^2(n+1)/2','n(n+1)^2/6','n^3/3'] },
        // 44
        { type: 'choice', subject: 'Series', topic: 'Sum of cubes', q: 'Σ(k=1 to n) k^3 =', a: '[n(n+1)/2]^2', w: ['n^2(n+1)^2/4','n(n+1)(n+2)/6','n^4/4'] },
        // 45
        { type: 'choice', subject: 'Series', topic: 'Arithmetic series sum', q: 'Σ(n=1 to 10)(3n+2) =', a: '185', w: ['180','195','150'] },
        // 46
        { type: 'choice', subject: 'Series', topic: 'Geometric series sum', q: 'Σ(n=0 to 4) 2^n =', a: '31', w: ['32','16','15'] },
        // 47
        { type: 'choice', subject: 'Series', topic: 'Constant sum', q: 'Σ(k=1 to n) c =', a: 'nc', w: ['c','n','c^n'] },
        // 48
        { type: 'choice', subject: 'Series', topic: 'Linearity', q: 'Σ(af(k) + bg(k)) =', a: 'aΣf(k) + bΣg(k)', w: ['Σ(af(k)) + g(k)','abΣf(k)g(k)','Σ(a+b)f(k)g(k)'] },
        // 49
        { type: 'choice', subject: 'Series', topic: 'Telescoping', q: 'Σ(k=1 to n)(1/k - 1/(k+1)) simplifies to', a: '1 - 1/(n+1)', w: ['1','n','1/(n+1)'] },
        // 50
        { type: 'choice', subject: 'Series', topic: 'Partial fractions', q: '1/(k(k+1)) = 1/k - 1/(k+1), so Σ equals', a: '1 - 1/(n+1)', w: ['1/n','n','0'] },
        // 51
        { type: 'choice', subject: 'Series', topic: 'Factorial series', q: 'Σ(n=0 to ∞) 1/n! =', a: 'e', w: ['π','√e','e-1'] },
        // 52
        { type: 'choice', subject: 'Series', topic: 'Harmonic series', q: 'Σ(n=1 to ∞) 1/n', a: 'Diverges', w: ['Converges to 1','Converges to e','Converges to π'] },
        // 53
        { type: 'choice', subject: 'Series', topic: 'p-series', q: 'Σ(n=1 to ∞) 1/n^p converges if', a: 'p > 1', w: ['p ≥ 0','p > 0','p ≥ 1'] },
        // 54
        { type: 'choice', subject: 'Series', topic: 'Test convergence', q: 'Series passes nth term test (diverges) if lim(a_n) ≠', a: '0', w: ['1','∞','-∞'] },
        // 55
        { type: 'choice', subject: 'Series', topic: 'Ratio test', q: 'Ratio test: if lim(a_(n+1)/a_n) = L < 1,', a: 'Series converges', w: ['Series diverges','Test inconclusive','L = 1'] },
        // 56
        { type: 'choice', subject: 'Series', topic: 'Alternating series', q: 'Alternating series test requires', a: 'Decreasing terms, lim=0', w: ['Increasing terms','All positive','Ratios < 1'] },
        // 57
        { type: 'choice', subject: 'Series', topic: 'Comparison test', q: 'If 0 ≤ a_n ≤ b_n and Σb_n converges, then', a: 'Σa_n converges', w: ['Σa_n diverges','Test fails','Σa_n = Σb_n'] },
        // 58
        { type: 'choice', subject: 'Series', topic: 'Power series', q: 'Σ(n=0 to ∞) x^n = 1/(1-x) for', a: '|x| < 1', w: ['|x| > 1','All x','x > 0'] },
        // 59
        { type: 'choice', subject: 'Series', topic: 'Maclaurin series', q: 'e^x = Σ(n=0 to ∞) x^n/n! converges for', a: 'All x', w: ['|x| < 1','|x| = 1','x > 0'] },
        // 60
        { type: 'choice', subject: 'Series', topic: 'Summary', q: 'Σ notation summarizes multiple terms as', a: 'Single expression', w: ['Sequence','Function','Limit'] }
    ]
});

// Pack: AA SL - Sequences (Batch 4)
// Coverage: Recurrence relations, finite differences
Game.addPack({
    id: 'aa_sequences_04',
    name: 'AA SL - Sequences (Batch 4)',
    _src: 'AA_SL/sequences.js',
    questions: [
        // 61
        { type: 'choice', subject: 'Sequences', topic: 'Recurrence relation', q: 'Recurrence: u_n = 2u_(n-1) + 3 with u_1=1 gives u_2=', a: '5', w: ['4','6','2'] },
        // 62
        { type: 'choice', subject: 'Sequences', topic: 'Recurrence definition', q: 'u_n = u_(n-1) + u_(n-2) defines', a: 'Fibonacci sequence', w: ['Arithmetic','Geometric','Constant'] },
        // 63
        { type: 'choice', subject: 'Sequences', topic: 'First order linear', q: 'u_n = au_(n-1) + b is', a: 'Linear recurrence', w: ['Non-linear','Homogeneous','Power series'] },
        // 64
        { type: 'choice', subject: 'Sequences', topic: 'Homogeneous solution', q: 'Homogeneous u_n = 2u_(n-1) general solution', a: 'u_n = c*2^(n-1)', w: ['u_n = c + 2n','u_n = 2n','u_n = e^n'] },
        // 65
        { type: 'choice', subject: 'Sequences', topic: 'Particular solution', q: 'Particular solution to u_n = 2u_(n-1) + 3', a: 'Constant -3', w: ['2n','3n','1'] },
        // 66
        { type: 'choice', subject: 'Sequences', topic: 'General solution', q: 'General solution u_n = 2u_(n-1) + 3', a: 'u_n = c*2^n - 3', w: ['u_n = 2n - 3','u_n = 2^n','u_n = 3n'] },
        // 67
        { type: 'choice', subject: 'Sequences', topic: 'Equilibrium', q: 'Fixed point of u_n = 0.5u_(n-1) + 2', a: '4', w: ['2','0','0.5'] },
        // 68
        { type: 'choice', subject: 'Sequences', topic: 'Stability', q: 'u_n = 0.5u_(n-1) + c converges to', a: 'Fixed point', w: ['Diverges','Oscillates','Undefined'] },
        // 69
        { type: 'choice', subject: 'Sequences', topic: 'Fibonacci', q: 'Fibonacci: u_1=1, u_2=1, u_3=', a: '2', w: ['1','3','1.5'] },
        // 70
        { type: 'choice', subject: 'Sequences', topic: 'Fibonacci ratio', q: 'Ratio u_(n+1)/u_n in Fibonacci approaches', a: 'Golden ratio φ', w: ['e','π','√2'] },
        // 71
        { type: 'choice', subject: 'Sequences', topic: 'Non-linear recurrence', q: 'u_n = u_(n-1)^2 with u_1=2', a: 'Diverges to ∞', w: ['Converges','Oscillates','u_2=4'] },
        // 72
        { type: 'choice', subject: 'Sequences', topic: 'Logistic map', q: 'u_n = r*u_(n-1)(1-u_(n-1)) exhibits', a: 'Chaos for large r', w: ['Always diverges','Always converges','Always oscillates'] },
        // 73
        { type: 'choice', subject: 'Sequences', topic: 'Finite differences', q: 'Sequence 1, 4, 9, 16,... first differences are', a: '3, 5, 7,...', w: ['1, 1, 1,...','3, 3, 3,...','2, 3, 4,...'] },
        // 74
        { type: 'choice', subject: 'Sequences', topic: 'Second difference', q: 'First difference of 3, 5, 7,... is', a: '2, 2, 2,...', w: ['1, 2, 3,...','3, 5, 7,...','2, 3, 4,...'] },
        // 75
        { type: 'choice', subject: 'Sequences', topic: 'Polynomial degree', q: 'Sequence with constant 2nd differences is', a: 'Quadratic', w: ['Linear','Cubic','Exponential'] },
        // 76
        { type: 'choice', subject: 'Sequences', topic: 'Cubic sequence', q: 'Sequence with constant 3rd differences is', a: 'Cubic', w: ['Quadratic','Linear','Quartic'] },
        // 77
        { type: 'choice', subject: 'Sequences', topic: 'Find formula', q: 'Sequence 2, 6, 12, 20,... has formula', a: 'n(n+1)', w: ['n^2','2n','n^2 + 1'] },
        // 78
        { type: 'choice', subject: 'Sequences', topic: 'Backward difference', q: 'Backward difference Δu_n = u_n - u_(n-1) when Δu = constant', a: 'Arithmetic', w: ['Geometric','Quadratic','Cubic'] },
        // 79
        { type: 'choice', subject: 'Sequences', topic: 'Discrete calculus', q: 'Discrete derivative (finite difference) analogous to', a: 'Continuous derivative', w: ['Integral','Limit','Sequence'] },
        // 80
        { type: 'choice', subject: 'Sequences', topic: 'Summary', q: 'Recurrence relation expresses term in terms of', a: 'Previous terms', w: ['Position','Formula','Limit'] }
    ]
});

// Pack: AA SL - Sequences (Batch 5)
// Coverage: Applications, mathematical induction, advanced topics
Game.addPack({
    id: 'aa_sequences_05',
    name: 'AA SL - Sequences (Batch 5)',
    _src: 'AA_SL/sequences.js',
    questions: [
        // 81
        { type: 'choice', subject: 'Sequences', topic: 'Mathematical induction', q: 'Proof by induction step: if true for n, show true for', a: 'n+1', w: ['n+2','2n','n-1'] },
        // 82
        { type: 'choice', subject: 'Sequences', topic: 'Base case', q: 'In induction, base case typically proves', a: 'n = 1', w: ['All n','n = 0','Any n'] },
        // 83
        { type: 'choice', subject: 'Sequences', topic: 'Induction example', q: 'Prove 1+2+...+n = n(n+1)/2 assumes true for n, proves for', a: 'n+1', w: ['n','Any n','2n'] },
        // 84
        { type: 'choice', subject: 'Sequences', topic: 'Application: finance', q: 'Compound interest A = P(1+r)^n uses', a: 'Geometric sequence', w: ['Arithmetic','Fibonacci','Harmonic'] },
        // 85
        { type: 'choice', subject: 'Sequences', topic: 'Application: growth', q: 'Exponential growth N = N_0*e^(kt) models', a: 'Population/bacteria', w: ['Linear decline','Periodic cycle','Constant'] },
        // 86
        { type: 'choice', subject: 'Sequences', topic: 'Application: decay', q: 'Radioactive decay N = N_0*e^(-kt) models', a: 'Half-life reduction', w: ['Compound growth','Linear decrease','Periodic'] },
        // 87
        { type: 'choice', subject: 'Sequences', topic: 'Half-life', q: 'Half-life t_(1/2) satisfies N(t_(1/2)) =', a: 'N_0/2', w: ['N_0/4','0','N_0'] },
        // 88
        { type: 'choice', subject: 'Sequences', topic: 'Annuity', q: 'Future value of annuity (regular deposits) uses', a: 'Geometric series sum', w: ['Arithmetic sum','Fibonacci','Harmonic'] },
        // 89
        { type: 'choice', subject: 'Sequences', topic: 'Loan repayment', q: 'Monthly payment calculation uses', a: 'Geometric series', w: ['Arithmetic','Power series','Telescoping'] },
        // 90
        { type: 'choice', subject: 'Sequences', topic: 'Zeno paradox', q: '0.999... = 1 proven using infinite series:', a: 'Geometric sum', w: ['Harmonic','Telescoping','Ratio test'] },
        // 91
        { type: 'choice', subject: 'Sequences', topic: 'Stirling approximation', q: 'n! ≈ √(2πn) * (n/e)^n for large n uses', a: 'Asymptotic expansion', w: ['Exact formula','Induction','Recursion'] },
        // 92
        { type: 'choice', subject: 'Sequences', topic: 'Generating function', q: 'Generating function F(x) = Σ a_n*x^n used for', a: 'Analyzing sequences', w: ['Computing limits','Graphing','Sorting'] },
        // 93
        { type: 'choice', subject: 'Sequences', topic: 'Partition function', q: 'Partition of n: number of ways to write n as sum uses', a: 'Generating functions', w: ['Direct formula','Recursion only','Induction'] },
        // 94
        { type: 'choice', subject: 'Sequences', topic: 'Catalan numbers', q: 'Catalan number C_n counts', a: 'Balanced parentheses', w: ['Prime numbers','Fibonacci','Factorials'] },
        // 95
        { type: 'choice', subject: 'Sequences', topic: 'Combinatorial identity', q: 'Pascal triangle row n sums to', a: '2^n', w: ['n!','Fibonacci','2n'] },
        // 96
        { type: 'choice', subject: 'Sequences', topic: 'Arithmetic-Geometric', q: 'Sequence mixing arithmetic + geometric: Σ(n*r^n)', a: 'Requires calculus trick', w: ['Sum formula direct','Telescoping','Induction'] },
        // 97
        { type: 'choice', subject: 'Sequences', topic: 'Vieta jumping', q: 'Vieta jumping proves statements using', a: 'Infinite descent', w: ['Direct proof','Induction','Contradiction'] },
        // 98
        { type: 'choice', subject: 'Sequences', topic: 'Recurrence solving', q: 'Characteristic equation for u_n = au_(n-1) + bu_(n-2) is', a: 'r^2 = ar + b', w: ['r = a + b','r^n = a','b*r^n'] },
        // 99
        { type: 'choice', subject: 'Sequences', topic: 'Complex roots', q: 'If characteristic equation has complex roots, sequence', a: 'Oscillates periodically', w: ['Diverges always','Converges','Stays constant'] },
        // 100
        { type: 'choice', subject: 'Sequences', topic: 'Summary', q: 'Sequences core: pattern, term formula, sum, convergence', a: 'All true', w: ['Only formula','Only pattern','Only convergence'] }
    ]
});

console.log('AA_SL: sequences packs loaded (5 packs, ~100 questions)');
