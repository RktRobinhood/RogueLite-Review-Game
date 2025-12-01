// Placeholder for AA SL Functions topic packs
// Pack collection: ~100 questions covering Functions, Transformations, Composition, Domain/Range

// Pack: AA SL - Functions (Batch 1)
// Coverage: Function fundamentals, function notation, graphing basics, domain
Game.addPack({
    id: 'aa_functions_01',
    name: 'AA SL - Functions (Batch 1)',
    _src: 'AA_SL/functions.js',
    questions: [
        // 1
        { type: 'choice', subject: 'Functions', topic: 'Function basics', q: 'Which of the following is a function?', a: 'y = 2x + 3', w: ['x^2 + y^2 = 4','x = 5','y^2 = x'] },
        // 2
        { type: 'choice', subject: 'Functions', topic: 'Function notation', q: 'If f(x) = 3x - 2, find f(5).', a: '13', w: ['15','10','17'] },
        // 3
        { type: 'choice', subject: 'Functions', topic: 'Domain', q: 'Domain of f(x) = 1/(x-3) is', a: 'x ≠ 3', w: ['x ≠ 0','all real','x > 3'] },
        // 4
        { type: 'choice', subject: 'Functions', topic: 'Range', q: 'Range of f(x) = x^2 is', a: 'y ≥ 0', w: ['y ≤ 0','all real','y > 0'] },
        // 5
        { type: 'choice', subject: 'Functions', topic: 'Linear functions', q: 'Slope of y = -3x + 5 is', a: '-3', w: ['5','-5','3'] },
        // 6
        { type: 'choice', subject: 'Functions', topic: 'Intercepts', q: 'y-intercept of y = 4x - 7 is', a: '-7', w: ['4','-4','7'] },
        // 7
        { type: 'choice', subject: 'Functions', topic: 'Quadratic form', q: 'Vertex of y = (x-2)^2 + 3 is', a: '(2, 3)', w: ['(-2, 3)','(2, -3)','(3, 2)'] },
        // 8
        { type: 'choice', subject: 'Functions', topic: 'Function evaluation', q: 'If g(x) = x^2 - 1, find g(-2).', a: '3', w: ['2','1','-3'] },
        // 9
        { type: 'choice', subject: 'Functions', topic: 'Piecewise', q: 'f(x) = {x if x > 0; -x if x ≤ 0}. Find f(-3).', a: '3', w: ['-3','0','undefined'] },
        // 10
        { type: 'choice', subject: 'Functions', topic: 'Odd/Even', q: 'Is f(x) = x^2 even or odd?', a: 'Even', w: ['Odd','Neither','Both'] },
        // 11
        { type: 'choice', subject: 'Functions', topic: 'Symmetry', q: 'f(x) = x^3 is symmetric about', a: 'Origin', w: ['y-axis','x-axis','line y=x'] },
        // 12
        { type: 'choice', subject: 'Functions', topic: 'Increasing/Decreasing', q: 'Is y = 2x + 1 increasing or decreasing?', a: 'Increasing', w: ['Decreasing','Constant','Undefined'] },
        // 13
        { type: 'choice', subject: 'Functions', topic: 'Concavity', q: 'Concavity of y = -x^2 + 4 is', a: 'Concave down', w: ['Concave up','Linear','Neither'] },
        // 14
        { type: 'choice', subject: 'Functions', topic: 'Critical points', q: 'Critical point of y = x^2 - 2x is at x =', a: '1', w: ['-1','0','2'] },
        // 15
        { type: 'choice', subject: 'Functions', topic: 'Asymptotes', q: 'Horizontal asymptote of y = 2/x is', a: 'y = 0', w: ['y = 2','x = 0','y = 1'] },
        // 16
        { type: 'choice', subject: 'Functions', topic: 'Rational functions', q: 'f(x) = (x+1)/(x-2) has vertical asymptote at', a: 'x = 2', w: ['x = -1','x = 1','x = 0'] },
        // 17
        { type: 'choice', subject: 'Functions', topic: 'Discontinuity', q: 'y = (x^2 - 1)/(x-1) has removable discontinuity at', a: 'x = 1', w: ['x = -1','x = 0','no discontinuity'] },
        // 18
        { type: 'choice', subject: 'Functions', topic: 'Limits', q: 'lim(x→2) (x+3) =', a: '5', w: ['2','3','undefined'] },
        // 19
        { type: 'choice', subject: 'Functions', topic: 'Continuity', q: 'A function is continuous if', a: 'No jumps or breaks', w: ['Always increasing','Always positive','Has finite domain'] },
        // 20
        { type: 'choice', subject: 'Functions', topic: 'Summary', q: 'If f(x) = |x|, domain is', a: 'All real numbers', w: ['x ≥ 0','x > 0','x ≠ 0'] }
    ]
});

// Pack: AA SL - Functions (Batch 2)
// Coverage: Transformations, Reflections, Translations, Dilations
Game.addPack({
    id: 'aa_functions_02',
    name: 'AA SL - Functions (Batch 2)',
    _src: 'AA_SL/functions.js',
    questions: [
        // 21
        { type: 'choice', subject: 'Functions', topic: 'Vertical shift', q: 'If g(x) = f(x) + 2, the graph shifts', a: 'Up by 2', w: ['Down by 2','Left by 2','Right by 2'] },
        // 22
        { type: 'choice', subject: 'Functions', topic: 'Horizontal shift', q: 'If h(x) = f(x - 3), the graph shifts', a: 'Right by 3', w: ['Left by 3','Up by 3','Down by 3'] },
        // 23
        { type: 'choice', subject: 'Functions', topic: 'Vertical stretch', q: 'If g(x) = 3f(x), the graph is', a: 'Vertically stretched by 3', w: ['Compressed by 3','Shifted by 3','Reflected'] },
        // 24
        { type: 'choice', subject: 'Functions', topic: 'Horizontal compression', q: 'If h(x) = f(2x), the graph is', a: 'Compressed horizontally by 1/2', w: ['Stretched by 2','Compressed by 2','Shifted by 2'] },
        // 25
        { type: 'choice', subject: 'Functions', topic: 'Reflection', q: 'Reflection of y = f(x) in x-axis is', a: 'y = -f(x)', w: ['y = f(-x)','y = f(x)','y = 1/f(x)'] },
        // 26
        { type: 'choice', subject: 'Functions', topic: 'Reflection', q: 'Reflection of y = f(x) in y-axis is', a: 'y = f(-x)', w: ['y = -f(x)','y = f(x)','x = f(y)'] },
        // 27
        { type: 'choice', subject: 'Functions', topic: 'Combined transformations', q: 'y = 2f(x-1) + 3 represents', a: 'Shift right 1, stretch 2, shift up 3', w: ['Shift left 1, compress 2, shift down 3','Reflect, shift, stretch','Only translation'] },
        // 28
        { type: 'choice', subject: 'Functions', topic: 'Inverse reflection', q: 'Graph of f^{-1} is reflection of f across', a: 'y = x', w: ['y = 0','x = 0','y = -x'] },
        // 29
        { type: 'choice', subject: 'Functions', topic: 'Amplitude', q: 'Amplitude of y = 3sin(x) is', a: '3', w: ['1','6','π'] },
        // 30
        { type: 'choice', subject: 'Functions', topic: 'Period', q: 'Period of y = sin(2x) is', a: 'π', w: ['2π','π/2','1'] },
        // 31
        { type: 'choice', subject: 'Functions', topic: 'Phase shift', q: 'y = sin(x - π/4) has phase shift', a: 'π/4 right', w: ['π/4 left','π right','no shift'] },
        // 32
        { type: 'choice', subject: 'Functions', topic: 'Vertical translation', q: 'y = sin(x) + 2 shifts', a: 'Up by 2', w: ['Down by 2','Left by 2','Right by 2'] },
        // 33
        { type: 'choice', subject: 'Functions', topic: 'Dilation factor', q: 'Graph of y = f(x/2) is', a: 'Horizontally stretched by 2', w: ['Horizontally compressed by 2','Vertically stretched by 2','Shifted right by 2'] },
        // 34
        { type: 'choice', subject: 'Functions', topic: 'Transformation order', q: 'To get y = 2f(x-3) + 1, start with f(x) and apply (in order)', a: 'Shift right 3, stretch 2, shift up 1', w: ['Stretch 2, shift right 3, shift up 1','Shift up 1, shift right 3, stretch 2','All simultaneous'] },
        // 35
        { type: 'choice', subject: 'Functions', topic: 'Inverse function', q: 'If f(x) = 2x + 3, then f^{-1}(x) =', a: '(x - 3)/2', w: ['(x + 3)/2','2x - 3','(2x - 3)/1'] },
        // 36
        { type: 'choice', subject: 'Functions', topic: 'Inverse evaluation', q: 'If f(x) = 3x - 1, find f^{-1}(5)', a: '2', w: ['3','1','4'] },
        // 37
        { type: 'choice', subject: 'Functions', topic: 'Function composition', q: 'If f(x) = x + 1 and g(x) = 2x, find (f ∘ g)(3)', a: '7', w: ['8','6','9'] },
        // 38
        { type: 'choice', subject: 'Functions', topic: 'Composition order', q: '(g ∘ f)(x) means', a: 'Apply f first, then g', w: ['Apply g first, then f','Add f and g','Multiply f and g'] },
        // 39
        { type: 'choice', subject: 'Functions', topic: 'Composition reversal', q: 'If h = f ∘ g, then h^{-1} =', a: 'g^{-1} ∘ f^{-1}', w: ['f^{-1} ∘ g^{-1}','f^{-1} + g^{-1}','Cannot determine'] },
        // 40
        { type: 'choice', subject: 'Functions', topic: 'Transformation summary', q: 'y = -2f(3(x-1)) + 4 includes', a: 'Reflection, horizontal compress, shift right 1, vertical stretch 2, shift up 4', w: ['Only translations','Only reflections','No transformations'] }
    ]
});

// Pack: AA SL - Functions (Batch 3)
// Coverage: Exponential & Logarithmic functions, growth/decay
Game.addPack({
    id: 'aa_functions_03',
    name: 'AA SL - Functions (Batch 3)',
    _src: 'AA_SL/functions.js',
    questions: [
        // 41
        { type: 'choice', subject: 'Functions', topic: 'Exponential', q: 'Which is an exponential function?', a: 'f(x) = 2^x', w: ['f(x) = x^2','f(x) = 2x','f(x) = sqrt(x)'] },
        // 42
        { type: 'choice', subject: 'Functions', topic: 'Exponential growth', q: 'For y = 3e^{0.5t}, growth rate is', a: '0.5', w: ['3','0.5t','e'] },
        // 43
        { type: 'choice', subject: 'Functions', topic: 'Exponential decay', q: 'For y = 100(0.8)^t, decay rate is', a: '0.8', w: ['0.2','100','20%'] },
        // 44
        { type: 'choice', subject: 'Functions', topic: 'Half-life', q: 'If half-life is 5 years, after 10 years, fraction remaining is', a: '1/4', w: ['1/2','1/8','1/3'] },
        // 45
        { type: 'choice', subject: 'Functions', topic: 'Logarithm basics', q: 'If log_2(x) = 3, then x =', a: '8', w: ['6','9','4'] },
        // 46
        { type: 'choice', subject: 'Functions', topic: 'Logarithm properties', q: 'log(ab) =', a: 'log(a) + log(b)', w: ['log(a)*log(b)','log(a) - log(b)','log(a)/log(b)'] },
        // 47
        { type: 'choice', subject: 'Functions', topic: 'Logarithm properties', q: 'log(a^n) =', a: 'n*log(a)', w: ['log(a)*n','log(n)*a','log(a+n)'] },
        // 48
        { type: 'choice', subject: 'Functions', topic: 'Change of base', q: 'log_3(9) =', a: '2', w: ['3','1/3','1/2'] },
        // 49
        { type: 'choice', subject: 'Functions', topic: 'Natural logarithm', q: 'ln(e) =', a: '1', w: ['e','0','undefined'] },
        // 50
        { type: 'choice', subject: 'Functions', topic: 'Exponential equation', q: 'Solve 2^x = 16', a: '4', w: ['5','3','2'] },
        // 51
        { type: 'choice', subject: 'Functions', topic: 'Logarithmic equation', q: 'Solve log(x) = 2', a: '100', w: ['2','10','1'] },
        // 52
        { type: 'choice', subject: 'Functions', topic: 'Compound interest', q: 'A = P(1 + r)^t with P=100, r=0.05, t=3 gives', a: '115.76', w: ['115','105','125'] },
        // 53
        { type: 'choice', subject: 'Functions', topic: 'Continuous growth', q: 'Formula for continuous growth is', a: 'A = Pe^{rt}', w: ['A = P(1+r)^t','A = P + rt','A = r*t'] },
        // 54
        { type: 'choice', subject: 'Functions', topic: 'Inverse of exponential', q: 'Inverse of y = e^x is', a: 'y = ln(x)', w: ['y = e^{-x}','y = -e^x','y = 1/e^x'] },
        // 55
        { type: 'choice', subject: 'Functions', topic: 'Inverse of logarithm', q: 'Inverse of y = log_2(x) is', a: 'y = 2^x', w: ['y = log(2x)','y = x^2','y = 1/log_2(x)'] },
        // 56
        { type: 'choice', subject: 'Functions', topic: 'Exponential growth rate', q: 'If y = 10*2^{t/5}, doubling time is', a: '5', w: ['2','10','1'] },
        // 57
        { type: 'choice', subject: 'Functions', topic: 'Exponential model', q: 'Population model: P(t) = 1000 * 1.05^t. Initial pop. is', a: '1000', w: ['1050','105','50'] },
        // 58
        { type: 'choice', subject: 'Functions', topic: 'Logarithmic scale', q: 'Richter scale uses base', a: '10', w: ['2','e','natural'] },
        // 59
        { type: 'choice', subject: 'Functions', topic: 'pH scale', q: 'pH = -log[H+]. Neutral water has pH =', a: '7', w: ['0','1','14'] },
        // 60
        { type: 'choice', subject: 'Functions', topic: 'Exponential summary', q: 'Growth factor 1.03 represents growth rate of', a: '3%', w: ['0.03%','30%','103%'] }
    ]
});

// Pack: AA SL - Functions (Batch 4)
// Coverage: Trigonometric functions, periodic behaviour, applications
Game.addPack({
    id: 'aa_functions_04',
    name: 'AA SL - Functions (Batch 4)',
    _src: 'AA_SL/functions.js',
    questions: [
        // 61
        { type: 'choice', subject: 'Functions', topic: 'Trigonometric basics', q: 'In a right triangle, sin(θ) =', a: 'opposite/hypotenuse', w: ['adjacent/hypotenuse','opposite/adjacent','hypotenuse/opposite'] },
        // 62
        { type: 'choice', subject: 'Functions', topic: 'Cosine', q: 'cos(0) =', a: '1', w: ['0','-1','undefined'] },
        // 63
        { type: 'choice', subject: 'Functions', topic: 'Sine', q: 'sin(π/2) =', a: '1', w: ['0','-1','undefined'] },
        // 64
        { type: 'choice', subject: 'Functions', topic: 'Tangent', q: 'tan(θ) =', a: 'sin(θ)/cos(θ)', w: ['cos(θ)/sin(θ)','1/sin(θ)','1/cos(θ)'] },
        // 65
        { type: 'choice', subject: 'Functions', topic: 'Period of sine', q: 'Period of y = sin(x) is', a: '2π', w: ['π','π/2','1'] },
        // 66
        { type: 'choice', subject: 'Functions', topic: 'Amplitude', q: 'Amplitude of y = 2cos(x) is', a: '2', w: ['1','4','π'] },
        // 67
        { type: 'choice', subject: 'Functions', topic: 'Phase shift', q: 'y = sin(x + π/3) has phase shift', a: '-π/3', w: ['π/3','-π/3 (left)','-π/3 (right)'] },
        // 68
        { type: 'choice', subject: 'Functions', topic: 'Vertical shift', q: 'y = sin(x) + 3 has', a: 'Midline at y=3', w: ['Midline at y=0','Amplitude 3','Period 3'] },
        // 69
        { type: 'choice', subject: 'Functions', topic: 'General sine', q: 'y = A sin(B(x - C)) + D; A controls', a: 'Amplitude', w: ['Period','Phase shift','Vertical shift'] },
        // 70
        { type: 'choice', subject: 'Functions', topic: 'Period formula', q: 'For y = sin(bx), period is', a: '2π/b', w: ['b','2πb','πb'] },
        // 71
        { type: 'choice', subject: 'Functions', topic: 'Inverse trig', q: 'arcsin(1) =', a: 'π/2', w: ['0','π','2π'] },
        // 72
        { type: 'choice', subject: 'Functions', topic: 'Inverse cosine', q: 'arccos(0) =', a: 'π/2', w: ['0','π','undefined'] },
        // 73
        { type: 'choice', subject: 'Functions', topic: 'Inverse tangent', q: 'arctan(1) =', a: 'π/4', w: ['π/2','π/3','π/6'] },
        // 74
        { type: 'choice', subject: 'Functions', topic: 'Trig identity', q: 'sin^2(x) + cos^2(x) =', a: '1', w: ['0','2','sin(2x)'] },
        // 75
        { type: 'choice', subject: 'Functions', topic: 'Double angle', q: 'sin(2x) =', a: '2sin(x)cos(x)', w: ['2sin(x)','sin(x)cos(x)','sin(x)+sin(x)'] },
        // 76
        { type: 'choice', subject: 'Functions', topic: 'Application', q: 'Height of tide: h(t) = 5 + 3sin(πt/6). Max height is', a: '8', w: ['5','3','11'] },
        // 77
        { type: 'choice', subject: 'Functions', topic: 'Application', q: 'A Ferris wheel with radius 10 m, center 12 m high, after quarter turn is at height', a: '22', w: ['12','10','2'] },
        // 78
        { type: 'choice', subject: 'Functions', topic: 'Periodic phenomena', q: 'A function repeats every 8 units. Period is', a: '8', w: ['4','16','2π'] },
        // 79
        { type: 'choice', subject: 'Functions', topic: 'Trigonometric equation', q: 'Solve sin(x) = 0.5 for 0 ≤ x < 2π', a: 'π/6 and 5π/6', w: ['π/3','π/4','π/2'] },
        // 80
        { type: 'choice', subject: 'Functions', topic: 'Trig summary', q: 'Which is NOT a trig function?', a: 'y = x^2', w: ['y = sin(x)','y = cos(x)','y = tan(x)'] }
    ]
});

// Pack: AA SL - Functions (Batch 5)
// Coverage: Polynomial functions, end behaviour, rational functions, summary
Game.addPack({
    id: 'aa_functions_05',
    name: 'AA SL - Functions (Batch 5)',
    _src: 'AA_SL/functions.js',
    questions: [
        // 81
        { type: 'choice', subject: 'Functions', topic: 'Polynomial degree', q: 'Degree of p(x) = x^4 - 2x^2 + 1 is', a: '4', w: ['2','1','-2'] },
        // 82
        { type: 'choice', subject: 'Functions', topic: 'Leading coefficient', q: 'Leading coefficient of 3x^5 - x + 2 is', a: '3', w: ['-1','5','2'] },
        // 83
        { type: 'choice', subject: 'Functions', topic: 'End behaviour', q: 'For p(x) = x^4 - 3x^2, as x → ∞, p(x) →', a: '+∞', w: ['-∞','0','±∞'] },
        // 84
        { type: 'choice', subject: 'Functions', topic: 'Roots and factors', q: 'If (x - 2) is a factor of p(x), then', a: 'p(2) = 0', w: ['p(0) = 2','p(2) = 1','p(-2) = 0'] },
        // 85
        { type: 'choice', subject: 'Functions', topic: 'Fundamental theorem', q: 'A degree 5 polynomial has at most', a: '5 real roots', w: ['4','6','3'] },
        // 86
        { type: 'choice', subject: 'Functions', topic: 'Multiplicity', q: 'Root with multiplicity 2 causes graph to', a: 'Touch and turn around', w: ['Cross','Skip','Approach asymptote'] },
        // 87
        { type: 'choice', subject: 'Functions', topic: 'Rational function degree', q: 'Horizontal asymptote of (2x^2)/(3x^2 + 1) as x → ∞', a: '2/3', w: ['∞','-2/3','0'] },
        // 88
        { type: 'choice', subject: 'Functions', topic: 'Rational degree difference', q: 'For f(x) = (x+1)/(x^2 - 1), vertical asymptote at', a: 'x = -1 and x = 1', w: ['x = 1 only','x = 0','no asymptotes'] },
        // 89
        { type: 'choice', subject: 'Functions', topic: 'Polynomial modelling', q: 'Volume of box: V(x) = x(10-2x)(8-2x); max volume near', a: 'x = 1.5', w: ['x = 0','x = 5','x = 10'] },
        // 90
        { type: 'choice', subject: 'Functions', topic: 'Quadratic extremum', q: 'Minimum of y = x^2 - 4x + 5 occurs at', a: 'x = 2', w: ['x = -2','x = 1','x = 0'] },
        // 91
        { type: 'choice', subject: 'Functions', topic: 'Concavity test', q: 'f(x) = x^3 - 3x is concave up when', a: 'x > 0', w: ['x < 0','always','never'] },
        // 92
        { type: 'choice', subject: 'Functions', topic: 'Inflection point', q: 'y = x^3 has inflection point at', a: 'x = 0', w: ['x = 1','x = -1','no inflection'] },
        // 93
        { type: 'choice', subject: 'Functions', topic: 'Derivative connection', q: 'If f\'(x) > 0 on an interval, f is', a: 'Increasing', w: ['Decreasing','Constant','Concave up'] },
        // 94
        { type: 'choice', subject: 'Functions', topic: 'Critical point', q: 'At a local max, f\'(x) changes from', a: '+  to -', w: ['- to +','stays +','stays -'] },
        // 95
        { type: 'choice', subject: 'Functions', topic: 'Optimization', q: 'Product of two numbers summing to 10; max product at', a: 'x = 5, y = 5', w: ['x = 7, y = 3','x = 9, y = 1','x = 4, y = 6'] },
        // 96
        { type: 'choice', subject: 'Functions', topic: 'Recurrence', q: 'If f(x+1) = 2f(x) and f(0) = 1, then f(3) =', a: '8', w: ['4','6','16'] },
        // 97
        { type: 'choice', subject: 'Functions', topic: 'Step function', q: 'Floor function ⌊3.7⌋ =', a: '3', w: ['4','3.7','rounded'] },
        // 98
        { type: 'choice', subject: 'Functions', topic: 'Absolute value', q: 'f(x) = |x - 2| has vertex at', a: '(2, 0)', w: ['(0, 2)','(2, 2)','(0, -2)'] },
        // 99
        { type: 'choice', subject: 'Functions', topic: 'Function families', q: 'Which is NOT part of polynomial family?', a: 'y = 1/x', w: ['y = x^3','y = x^2 + 1','y = -x'] },
        // 100
        { type: 'choice', subject: 'Functions', topic: 'Summary', q: 'A function has one-to-one property if', a: 'Each output paired with exactly one input', w: ['Each input gives one output','Always increasing','Continuous everywhere'] }
    ]
});

console.log('AA_SL: functions packs loaded (5 packs, ~100 questions)');
