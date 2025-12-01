// Placeholder for AA SL Algebra topic packs
// Add packs here using Game.addPack({ id:'aa_algebra_x', name:'AA SL - Algebra: ...', questions: [...] })

// Pack: AA SL - Algebra & Number Sense (initial batch of 20 templates)
Game.addPack({
	id: 'aa_algebra_01',
	name: 'AA SL - Algebra & Numbers (Batch 1)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// 1
		{ type: 'choice', subject: 'Algebra', topic: 'Linear', q: 'Solve for x: 2x + 5 = 17', a: '6', w: ['5','7','4'], preamble: '' },
		// 2
		{ type: 'choice', subject: 'Algebra', topic: 'Linear', q: 'If 3(x - 2) = 9, find x.', a: '5', w: ['3','6','4'] },
		// 3
		{ type: 'choice', subject: 'Numbers', topic: 'Fractions', q: 'What is 3/4 + 5/8?', a: '11/8', w: ['1','13/8','7/8'] },
		// 4
		{ type: 'choice', subject: 'Numbers', topic: 'Percent', q: 'What is 20% of 250?', a: '50', w: ['45','40','60'] },
		// 5
		{ type: 'choice', subject: 'Algebra', topic: 'Quadratic', q: 'Find the roots of x^2 - 5x + 6 = 0', a: '2 and 3', w: ['-2 and -3','1 and 6','-1 and -6'] },
		// 6
		{ type: 'choice', subject: 'Numbers', topic: 'Primes', q: 'Which of the following is a prime number?', a: '29', w: ['21','27','33'] },
		// 7
		{ type: 'choice', subject: 'Algebra', topic: 'Manipulation', q: 'Simplify: 4(x+2)-2x', a: '2x + 8', w: ['6x+8','2x+4','4x+4'] },
		// 8
		{ type: 'choice', subject: 'Numbers', topic: 'Root', q: 'What is sqrt(144)?', a: '12', w: ['14','10','16'] },
		// 9
		{ type: 'choice', subject: 'Algebra', topic: 'Simultaneous', q: 'If x+y=7 and x-y=1, find x.', a: '4', w: ['3','5','2'] },
		// 10
		{ type: 'choice', subject: 'Numbers', topic: 'Ratio', q: 'The ratio 3:5 scaled by factor 4 becomes?', a: '12:20', w: ['7:9','15:25','9:15'] },
		// 11
		{ type: 'choice', subject: 'Algebra', topic: 'Linear', q: 'Find x: (x/3) + 2 = 7', a: '15', w: ['12','9','18'] },
		// 12
		{ type: 'choice', subject: 'Numbers', topic: 'Decimal', q: 'Express 7/20 as a decimal.', a: '0.35', w: ['0.375','0.25','0.7'] },
		// 13
		{ type: 'choice', subject: 'Algebra', topic: 'Quadratic', q: 'Complete the square for x^2 + 6x + 5 to write as (x + a)^2 + b', a: '(x+3)^2 -4', w: ['(x+3)^2+4','(x+2)^2-1','(x+6)^2-31'] },
		// 14
		{ type: 'choice', subject: 'Numbers', topic: 'Factors', q: 'Which pair are factors of 36?', a: '4 and 9', w: ['5 and 7','6 and 8','3 and 7'] },
		// 15
		{ type: 'choice', subject: 'Algebra', topic: 'Indices', q: 'Simplify: 2^3 * 2^4', a: '128', w: ['64','32','256'] },
		// 16
		{ type: 'choice', subject: 'Numbers', topic: 'Modular', q: 'What is 17 mod 5?', a: '2', w: ['3','1','4'] },
		// 17
		{ type: 'choice', subject: 'Algebra', topic: 'Expressions', q: 'Factorise: x^2 - 9', a: '(x-3)(x+3)', w: ['(x-9)(x+1)','(x-1)(x+9)','(x-3)^2'] },
		// 18
		{ type: 'choice', subject: 'Numbers', topic: 'Surds', q: 'Simplify: sqrt(50)', a: '5√2', w: ['25√2','10√5','5√5'] },
		// 19
		{ type: 'choice', subject: 'Algebra', topic: 'Functions', q: 'If f(x)=2x+3, find f(4).', a: '11', w: ['10','9','8'] },
		// 20
		{ type: 'choice', subject: 'Numbers', topic: 'Estimation', q: 'Round 473 to the nearest hundred.', a: '500', w: ['400','470','480'] }
	]
});

console.log('AA_SL: algebra pack aa_algebra_01 loaded');

// Pack: AA SL - Algebra & Numbers (Batch 2)
Game.addPack({
	id: 'aa_algebra_02',
	name: 'AA SL - Algebra & Numbers (Batch 2)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// 21
		{ type: 'choice', subject: 'Algebra', topic: 'Inequality', q: 'Solve for x: 3x - 4 > 5', a: 'x > 3', w: ['x < 3','x > 1','x < 1'] },
		// 22
		{ type: 'choice', subject: 'Numbers', topic: 'Recurring', q: 'Express 0.¯27 as a fraction.', a: '3/11', w: ['27/99','1/33','2/11'] },
		// 23
		{ type: 'choice', subject: 'Algebra', topic: 'Logarithm', q: 'If log10(x) = 3, what is x?', a: '1000', w: ['100','10','10000'] },
		// 24
		{ type: 'choice', subject: 'Numbers', topic: 'Standard Form', q: 'Write 0.00056 in standard form.', a: '5.6×10^-4', w: ['5.6×10^-5','56×10^-5','0.56×10^-3'] },
		// 25
		{ type: 'choice', subject: 'Algebra', topic: 'Simultaneous', q: 'Solve: 2x + y = 7 and x - y = 1. Find (x,y).', a: 'x=2,y=3', w: ['x=3,y=1','x=4,y=-1','x=2,y=5'] },
		// 26
		{ type: 'choice', subject: 'Numbers', topic: 'Compound Interest', q: 'What is the value of $100 invested for 2 years at 5% annual compound interest?', a: '110.25', w: ['110','105','115.76'] },
		// 27
		{ type: 'choice', subject: 'Algebra', topic: 'Transformations', q: 'If g(x)=f(x-2)+3, what does the -2 represent?', a: 'Shift right by 2', w: ['Shift left by 2','Shift up by 2','Reflection over y-axis'] },
		// 28
		{ type: 'choice', subject: 'Numbers', topic: 'Rationalisation', q: 'Rationalise: 1/(√2)', a: '√2/2', w: ['2/√2','√2','1/2'] },
		// 29
		{ type: 'choice', subject: 'Algebra', topic: 'Inverse', q: 'If f(x)=3x-4, find f^{-1}(x).', a: '(x+4)/3', w: ['3x+4','(x-4)/3','(x-4)/9'] },
		// 30
		{ type: 'choice', subject: 'Numbers', topic: 'GCD', q: 'GCD of 48 and 180 is', a: '12', w: ['6','18','24'] },
		// 31
		{ type: 'choice', subject: 'Algebra', topic: 'Polynomials', q: 'What is the remainder when x^3+2x^2-x+1 is divided by x-1?', a: '3', w: ['0','1','2'] },
		// 32
		{ type: 'choice', subject: 'Numbers', topic: 'Percent Change', q: 'A price increases from 80 to 100. Percentage increase is', a: '25%', w: ['20%','15%','30%'] },
		// 33
		{ type: 'choice', subject: 'Algebra', topic: 'Sequences', q: 'Find the 5th term of arithmetic sequence with a1=3 and d=4.', a: '19', w: ['17','21','15'] },
		// 34
		{ type: 'choice', subject: 'Numbers', topic: 'Indices', q: 'Simplify: (9)^{1/2}', a: '3', w: ['-3','9','81'] },
		// 35
		{ type: 'choice', subject: 'Algebra', topic: 'Completing Square', q: 'For x^2 + 4x + 1, the vertex form is (x+2)^2 - 3.', a: '(x+2)^2 - 3', w: ['(x+2)^2 + 3','(x+1)^2 - 2','(x-2)^2 -3'] },
		// 36
		{ type: 'choice', subject: 'Numbers', topic: 'HCF/LCM', q: 'LCM of 6 and 8 is', a: '24', w: ['48','12','14'] },
		// 37
		{ type: 'choice', subject: 'Algebra', topic: 'Rational', q: 'Simplify: (x^2 - 1)/(x-1)', a: 'x+1', w: ['x-1','x','x^2+1'] },
		// 38
		{ type: 'choice', subject: 'Numbers', topic: 'Prime Factorisation', q: 'Prime factors of 84 include', a: '2,2,3,7', w: ['2,3,7,7','2,2,2,7','3,7,7'] },
		// 39
		{ type: 'choice', subject: 'Algebra', topic: 'Log laws', q: 'Simplify: log_a(x) + log_a(y) =', a: 'log_a(xy)', w: ['log_a(x/y)','log_a(x)+y','log_a(x^y)'] },
		// 40
		{ type: 'choice', subject: 'Numbers', topic: 'Approximation', q: 'Approximate sqrt(50) to 1 decimal place.', a: '7.1', w: ['7.0','7.2','6.9'] }
	]
});

// Pack: AA SL - Algebra Chains (multi-step Section B style)
Game.addPack({
	id: 'aa_algebra_chains_01',
	name: 'AA SL - Algebra Chains (Batch 1)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// Chain 1: linear -> simultaneous -> application
		{ type: 'chain', data: { preamble: 'Chain: Linear systems application', steps: [
			{ q: 'Solve for x: 4x - 3 = 13', a: '4', w: ['3','5','2'] },
			{ q: 'Given x=4, find y from x + 2y = 10', a: '3', w: ['2','4','1'] },
			{ q: 'If each item costs $x and total for 3 items and 2 accessories is 3x + 2*5 = 29, find x.', a: '8', w: ['7','9','6'] }
		] } , _meta: { subjects:['Algebra','Numbers'] } },

		// Chain 2: sequences building to formula
		{ type: 'chain', data: { preamble: 'Chain: Arithmetic sequence', steps: [
			{ q: 'Sequence: 2, 5, 8, ... Find common difference.', a: '3', w: ['2','4','5'] },
			{ q: 'Find 6th term given a1=2 and d=3.', a: '17', w: ['16','18','20'] },
			{ q: 'Sum of first 6 terms of this sequence is', a: '57', w: ['54','60','45'] }
		] }, _meta: { subjects:['Algebra','Sequences'] } },

		// Chain 3: surds -> rationalise -> evaluate
		{ type: 'chain', data: { preamble: 'Chain: Surds and rationalisation', steps: [
			{ q: 'Simplify sqrt(18).', a: '3√2', w: ['9√2','6√3','3√3'] },
			{ q: 'Rationalise denominator: 1/(√2 + 1).', a: '√2 - 1', w: ['√2 + 1','2 - √2','1 - √2'] },
			{ q: 'Evaluate (√2 -1)^2.', a: '3 - 2√2', w: ['1 - 2√2','2 - √2','3 + 2√2'] }
		] }, _meta: { subjects:['Numbers','Algebra'] } },

		// Chain 4: percentages -> compound interest
		{ type: 'chain', data: { preamble: 'Chain: Percentage and compound interest', steps: [
			{ q: 'Increase 120 by 15%.', a: '138', w: ['140','136','150'] },
			{ q: 'If $120 grows by 10% then 5%, overall multiplier is', a: '1.155', w: ['1.15','1.105','1.205'] },
			{ q: 'Value after 2 years at 10% p.a. compound is', a: '145.2', w: ['144','150','132'] }
		] }, _meta: { subjects:['Numbers','Algebra'] } }
	]
});

console.log('AA_SL: algebra pack aa_algebra_02 and chains loaded');

// Pack: AA SL - Algebra & Numbers (Batch 3)
// Coverage: Number (fractions, decimals, surds), Algebra (polynomials, quadratics, indices)
Game.addPack({
	id: 'aa_algebra_03',
	name: 'AA SL - Algebra & Numbers (Batch 3)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// 41
		{ type: 'choice', subject: 'Numbers', topic: 'Fraction arithmetic', q: 'Compute 5/6 - 1/3', a: '1/2', w: ['1/3','1/6','2/3'] },
		// 42
		{ type: 'choice', subject: 'Numbers', topic: 'Decimal places', q: 'Round 3.14159 to 3 decimal places', a: '3.142', w: ['3.141','3.140','3.143'] },
		// 43
		{ type: 'choice', subject: 'Numbers', topic: 'Surds', q: 'Simplify: sqrt(72)', a: '6√2', w: ['12√2','3√8','8√3'] },
		// 44
		{ type: 'choice', subject: 'Algebra', topic: 'Polynomials', q: 'Expand: (x+2)(x^2 - x + 3)', a: 'x^3 + x^2 + x + 6', w: ['x^3 + 2x^2 + x + 6','x^3 - x^2 + x + 6','x^3 + x^2 - x + 6'] },
		// 45
		{ type: 'choice', subject: 'Algebra', topic: 'Quadratic formula', q: 'Discriminant of x^2 - 4x + 3 is', a: '4', w: ['-4','1','0'] },
		// 46
		{ type: 'choice', subject: 'Numbers', topic: 'Recurring decimals', q: 'Convert 0.1¯6 to a fraction', a: '1/6', w: ['1/7','5/24','2/11'] },
		// 47
		{ type: 'choice', subject: 'Algebra', topic: 'Indices', q: 'Simplify: 2^3 * 2^{-1}', a: '4', w: ['8','2','1'] },
		// 48
		{ type: 'choice', subject: 'Numbers', topic: 'Ratio and proportion', q: 'If 2 : x = 3 : 12, find x', a: '8', w: ['6','9','4'] },
		// 49
		{ type: 'choice', subject: 'Algebra', topic: 'Factorisation', q: 'Factorise 4x^2 - 9', a: '(2x-3)(2x+3)', w: ['(4x-3)(x+3)','(2x-9)(2x+1)','(x-3)(4x+3)'] },
		// 50
		{ type: 'choice', subject: 'Numbers', topic: 'Percentages', q: 'What percentage of 60 is 15?', a: '25%', w: ['20%','30%','15%'] },
		// 51
		{ type: 'choice', subject: 'Algebra', topic: 'Completing square', q: 'Write x^2 - 6x + 8 as (x - a)^2 + b', a: '(x-3)^2 -1', w: ['(x-3)^2 +1','(x-2)^2 +4','(x-1)^2 +7'] },
		// 52
		{ type: 'choice', subject: 'Numbers', topic: 'Standard form', q: 'Express 4500000 in standard form', a: '4.5×10^6', w: ['45×10^5','0.45×10^7','4.5×10^5'] },
		// 53
		{ type: 'choice', subject: 'Algebra', topic: 'Polynomial division', q: 'Divide x^3 - x by x', a: 'x^2 - 1', w: ['x^2 + 1','x^2 - x','x^2'] },
		// 54
		{ type: 'choice', subject: 'Numbers', topic: 'GCD/LCM', q: 'LCM of 9 and 12 is', a: '36', w: ['18','72','24'] },
		// 55
		{ type: 'choice', subject: 'Algebra', topic: 'Quadratic roots', q: 'If x=2 is a root of x^2 + kx - 8 = 0, find k', a: '2', w: ['-2','4','-4'] },
		// 56
		{ type: 'choice', subject: 'Numbers', topic: 'Indices fractional', q: 'Simplify 16^{3/4}', a: '8', w: ['4','16','32'] },
		// 57
		{ type: 'choice', subject: 'Algebra', topic: 'Symmetry', q: 'The graph of y = x^2 is symmetric about which axis?', a: 'y-axis', w: ['x-axis','origin','line y=x'] },
		// 58
		{ type: 'choice', subject: 'Numbers', topic: 'Rational approximation', q: 'Which fraction is closest to 0.33?', a: '1/3', w: ['2/5','1/4','3/8'] },
		// 59
		{ type: 'choice', subject: 'Algebra', topic: 'Expression manipulation', q: 'Simplify: (3x^2y)/(6xy^2)', a: 'x/(2y)', w: ['x/y','3/(2y)','x/(6y)'] },
		// 60
		{ type: 'choice', subject: 'Numbers', topic: 'Approximation', q: 'Significant figures: 0.004567 to 2 s.f.', a: '0.0046', w: ['0.0045','0.005','0.00457'] }
	]
});

// Pack: AA SL - Algebra & Numbers (Batch 4)
// Coverage: Functions, Inverse, Transformations, Logarithms, Exponential
Game.addPack({
	id: 'aa_algebra_04',
	name: 'AA SL - Algebra & Numbers (Batch 4)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// 61
		{ type: 'choice', subject: 'Algebra', topic: 'Functions', q: 'If f(x) = x^2 - 2x, compute f(3).', a: '3', w: ['5','7','1'] },
		// 62
		{ type: 'choice', subject: 'Algebra', topic: 'Inverse functions', q: 'If f(x)=5x+2, f^{-1}(7)=', a: '1', w: ['-1','0','2'] },
		// 63
		{ type: 'choice', subject: 'Algebra', topic: 'Transformations', q: 'y = f(x) shifted up by 4 becomes', a: 'y = f(x) + 4', w: ['y = f(x-4)','y = f(x)+2','y = f(x) - 4'] },
		// 64
		{ type: 'choice', subject: 'Algebra', topic: 'Exponential', q: 'Solve 2^x = 16', a: '4', w: ['8','2','5'] },
		// 65
		{ type: 'choice', subject: 'Algebra', topic: 'Logarithms', q: 'log_2(32) =', a: '5', w: ['4','6','10'] },
		// 66
		{ type: 'choice', subject: 'Algebra', topic: 'Growth/Decay', q: 'If P doubles every 3 years, growth factor per year is', a: '2^{1/3}', w: ['3^{1/2}','2^3','1.5'] },
		// 67
		{ type: 'choice', subject: 'Algebra', topic: 'Composite functions', q: 'If f(x)=x+1 and g(x)=2x, find f(g(3))', a: '7', w: ['6','8','9'] },
		// 68
		{ type: 'choice', subject: 'Algebra', topic: 'Asymptotes', q: 'y = 1/x has which asymptote?', a: 'x=0 and y=0', w: ['x=1 and y=1','no asymptotes','x=0 only'] },
		// 69
		{ type: 'choice', subject: 'Algebra', topic: 'Domain', q: 'Domain of sqrt(x-2) is', a: 'x >= 2', w: ['x>2','x>0','x<=2'] },
		// 70
		{ type: 'choice', subject: 'Algebra', topic: 'Range', q: 'Range of y = x^2 is', a: 'y >= 0', w: ['y <= 0','all real','y > 0'] },
		// 71
		{ type: 'choice', subject: 'Algebra', topic: 'Log rules', q: 'Simplify log_a(a^5)', a: '5', w: ['a^5','log_a(5)','1'] },
		// 72
		{ type: 'choice', subject: 'Algebra', topic: 'Exponential equation', q: 'Solve e^{ln(3)} =', a: '3', w: ['ln(3)','e^3','1'] },
		// 73
		{ type: 'choice', subject: 'Algebra', topic: 'Function notation', q: 'If f(x)=x^3, what is f(2)+f(-2)?', a: '0', w: ['8','-8','16'] },
		// 74
		{ type: 'choice', subject: 'Algebra', topic: 'Inverse graph', q: 'The graph of f^{-1} is the reflection of f across', a: 'y=x', w: ['y=0','x=0','y=-x'] },
		// 75
		{ type: 'choice', subject: 'Algebra', topic: 'Translations', q: 'y=f(x+3) shifts the graph', a: 'left by 3', w: ['right by 3','up by 3','down by 3'] },
		// 76
		{ type: 'choice', subject: 'Algebra', topic: 'Modelling', q: 'A model y=3e^{0.2t} has initial value y at t=0 equal to', a: '3', w: ['0.2','e','1'] },
		// 77
		{ type: 'choice', subject: 'Algebra', topic: 'Log change of base', q: 'log_b(a) = ?', a: 'ln(a)/ln(b)', w: ['ln(b)/ln(a)','log(a)log(b)','ln(a)*ln(b)'] },
		// 78
		{ type: 'choice', subject: 'Algebra', topic: 'Exponential growth', q: 'Compound annually: (1+ r)^n, r=0.05 for 5% for 3 years equals', a: '1.157625', w: ['1.15','1.05','1.1625'] },
		// 79
		{ type: 'choice', subject: 'Algebra', topic: 'Transformations', q: 'Reflection of y=f(x) in x-axis gives', a: 'y = -f(x)', w: ['y = f(-x)','y = f(x)','y = 1/f(x)'] },
		// 80
		{ type: 'choice', subject: 'Algebra', topic: 'Function invertibility', q: 'Which is necessary for a function to have an inverse?', a: 'One-to-one', w: ['Even','Periodic','Bounded'] }
	]
});

// Pack: AA SL - Algebra & Numbers (Batch 5)
// Coverage: Sequences & series, Inequalities, Simultaneous equations, Application problems
Game.addPack({
	id: 'aa_algebra_05',
	name: 'AA SL - Algebra & Numbers (Batch 5)',
	_src: 'AA_SL/algebra.js',
	questions: [
		// 81
		{ type: 'choice', subject: 'Algebra', topic: 'Arithmetic sequences', q: 'An arithmetic sequence has a1=7 and d=5; find a4', a: '22', w: ['17','20','25'] },
		// 82
		{ type: 'choice', subject: 'Algebra', topic: 'Geometric sequences', q: 'Geometric sequence r=3, a1=2; a3 is', a: '18', w: ['6','54','12'] },
		// 83
		{ type: 'choice', subject: 'Algebra', topic: 'Sum of series', q: 'Sum of first 4 terms of 1+2+4+8 is', a: '15', w: ['16','14','10'] },
		// 84
		{ type: 'choice', subject: 'Algebra', topic: 'Inequalities', q: 'Solve 2x + 3 ≤ 7', a: 'x ≤ 2', w: ['x ≤ 3','x ≥ 2','x ≥ 3'] },
		// 85
		{ type: 'choice', subject: 'Algebra', topic: 'Simultaneous', q: 'Solve: x + y = 10 and x - 2y = -1; find (x,y)', a: 'x=3,y=7', w: ['x=7,y=3','x=4,y=6','x=6,y=4'] },
		// 86
		{ type: 'choice', subject: 'Numbers', topic: 'Percentage problem', q: 'If 30 is 60% of a number, the number is', a: '50', w: ['40','45','60'] },
		// 87
		{ type: 'choice', subject: 'Algebra', topic: 'Application', q: 'A rectangle has length (x+2) and width (x-1). If area = 15, what is x?', a: '3', w: ['-3','2','4'] },
		// 88
		{ type: 'choice', subject: 'Algebra', topic: 'Quadratic application', q: 'Projectile: y = -x^2 + 6x; max height occurs at x=', a: '3', w: ['2','4','6'] },
		// 89
		{ type: 'choice', subject: 'Numbers', topic: 'Recurrence', q: 'If a_n = 2 a_{n-1} and a_1 = 1, a_4 = ?', a: '8', w: ['6','4','16'] },
		// 90
		{ type: 'choice', subject: 'Algebra', topic: 'Remainder theorem', q: 'Remainder when x^3+3x^2+x+1 divided by x+1 is', a: '4', w: ['-4','0','1'] },
		// 91
		{ type: 'choice', subject: 'Numbers', topic: 'Modular arithmetic', q: 'Find 7*8 mod 5', a: '1', w: ['2','0','4'] },
		// 92
		{ type: 'choice', subject: 'Algebra', topic: 'Linear modelling', q: 'If y=3x+2, what is y when x=10?', a: '32', w: ['30','28','35'] },
		// 93
		{ type: 'choice', subject: 'Numbers', topic: 'Order of operations', q: 'Evaluate 2 + 3 * 4', a: '14', w: ['20','24','10'] },
		// 94
		{ type: 'choice', subject: 'Algebra', topic: 'Inequalities', q: 'Solve |x - 2| < 3', a: '-1 < x < 5', w: ['x < -1 or x > 5','1 < x < 4','x ≤ 5'] },
		// 95
		{ type: 'choice', subject: 'Numbers', topic: 'Fractions', q: 'Which is larger: 3/7 or 2/5?', a: '3/7', w: ['2/5','Equal','Cannot determine'] },
		// 96
		{ type: 'choice', subject: 'Algebra', topic: 'Change of variable', q: 'If u = x+1, express x^2+2x+1 in terms of u', a: 'u^2', w: ['u^2 -1','u^2 +1','(u-1)^2'] },
		// 97
		{ type: 'choice', subject: 'Numbers', topic: 'Approximation', q: 'Nearest integer to 2.718 is', a: '3', w: ['2','4','1'] },
		// 98
		{ type: 'choice', subject: 'Algebra', topic: 'Polynomial roots', q: 'If (x-2) is a factor of x^3 - x^2 - 4x + 4, true or false?', a: 'True', w: ['False','Cannot tell','Only for x=2'] },
		// 99
		{ type: 'choice', subject: 'Numbers', topic: 'Proportion', q: 'If y is proportional to x and y=6 when x=2, find y when x=10', a: '30', w: ['20','60','16'] },
		// 100
		{ type: 'choice', subject: 'Algebra', topic: 'Summary problem', q: 'Solve for x: x^2 - x - 6 = 0', a: '3 or -2', w: ['2 or -3','-3 or 2','1 or -6'] }
	]
});

console.log('AA_SL: algebra packs batches 3-5 loaded (total ~100 questions)');
