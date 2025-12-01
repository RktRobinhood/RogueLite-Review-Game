// AA SL Geometry topic packs (5 packs, 100 questions total)
// Coverage: Coordinate geometry, 2D/3D shapes, trigonometry in geometry, locus, transformations

// Batch 1: Coordinate basics, distance, midpoint, lines
Game.addPack({
    id: 'aa_geometry_01',
    name: 'AA SL - Geometry (Batch 1)',
    _src: 'AA_SL/geometry.js',
    questions: [
        { type: 'choice', subject: 'Geometry', topic: 'Distance formula', q: 'Distance between (0,0) and (3,4) is', a: '5', w: ['7','6','4'] },
        { type: 'choice', subject: 'Geometry', topic: 'Midpoint', q: 'Midpoint of (2,4) and (6,8) is', a: '(4, 6)', w: ['(3, 5)','(4, 4)','(5, 6)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Slope', q: 'Slope between (0,0) and (2,4) is', a: '2', w: ['4','1','0.5'] },
        { type: 'choice', subject: 'Geometry', topic: 'Line equation', q: 'Line through (0,0) and (1,1) is', a: 'y = x', w: ['y = 2x','y = 1','x + y = 1'] },
        { type: 'choice', subject: 'Geometry', topic: 'Parallel lines', q: 'Parallel to y = 2x + 1 is', a: 'y = 2x - 3', w: ['y = 0.5x + 1','y = -2x','y = 1'] },
        { type: 'choice', subject: 'Geometry', topic: 'Perpendicular', q: 'Perpendicular to y = 2x has slope', a: '-0.5', w: ['2','0.5','-2'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circle center', q: 'Center and radius of x² + y² = 9', a: '(0,0), r=3', w: ['(0,0), r=9','(3,3), r=3','(1,1), r=3'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circle general', q: '(x-1)² + (y-2)² = 25 centered at', a: '(1, 2) r=5', w: ['(1,2) r=25','(-1,-2) r=5','(1,2) r=25'] },
        { type: 'choice', subject: 'Geometry', topic: 'Point on circle', q: 'Is (3,4) on x² + y² = 25?', a: 'Yes', w: ['No','Only if x>0','Cannot determine'] },
        { type: 'choice', subject: 'Geometry', topic: 'Line intersection', q: 'y = x and y = 2x - 1 meet at', a: '(1, 1)', w: ['(0, 0)','(1, 2)','(2, 2)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Collinear', q: 'Are (0,0), (1,1), (2,2) collinear?', a: 'Yes', w: ['No','Only first two','Cannot tell'] },
        { type: 'choice', subject: 'Geometry', topic: 'Vector', q: 'Vector from (1,2) to (4,5)', a: '(3, 3)', w: ['(5, 7)','(3, 2)','(1, 2)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Vector magnitude', q: 'Magnitude of (3,4)', a: '5', w: ['7','12','1'] },
        { type: 'choice', subject: 'Geometry', topic: 'Triangle area', q: 'Area of triangle (0,0), (4,0), (0,3)', a: '6', w: ['12','7','3'] },
        { type: 'choice', subject: 'Geometry', topic: 'Angle between vectors', q: 'Angle between (1,0) and (0,1)', a: '90°', w: ['45°','60°','120°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Reflection', q: 'Reflection of (2,3) over y-axis', a: '(-2, 3)', w: ['(2, -3)','(-2, -3)','(3, 2)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Rotation', q: 'Rotating (1,0) 90° counterclockwise', a: '(0, 1)', w: ['(1, 1)','(-1, 0)','(0, -1)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Translation', q: 'Translating (2,3) by (1,-1)', a: '(3, 2)', w: ['(1, 4)','(2, 3)','(3, 3)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Scaling', q: 'Scaling (2,4) by 0.5', a: '(1, 2)', w: ['(1, 4)','(2, 2)','(4, 8)'] },
        { type: 'choice', subject: 'Geometry', topic: 'Line form', q: 'Standard form of line', a: 'ax + by + c = 0', w: ['y = mx + b','ax² + b','y = x'] }
    ]
});

// Batch 2: 2D shapes, area, perimeter
Game.addPack({
    id: 'aa_geometry_02',
    name: 'AA SL - Geometry (Batch 2)',
    _src: 'AA_SL/geometry.js',
    questions: [
        { type: 'choice', subject: 'Geometry', topic: 'Triangle type', q: 'Triangle with sides 3, 4, 5', a: 'Right', w: ['Obtuse','Acute','Isosceles'] },
        { type: 'choice', subject: 'Geometry', topic: 'Pythagoras', q: 'Right triangle legs 5, 12, hypotenuse', a: '13', w: ['17','7','144'] },
        { type: 'choice', subject: 'Geometry', topic: 'Triangle area', q: 'Triangle base 10, height 6, area', a: '30', w: ['60','16','20'] },
        { type: 'choice', subject: 'Geometry', topic: 'Heron', q: 'Heron formula uses', a: 'Semi-perimeter', w: ['Circumradius','Height','Median'] },
        { type: 'choice', subject: 'Geometry', topic: 'Rectangle area', q: 'Rectangle sides 5, 8, area', a: '40', w: ['26','13','80'] },
        { type: 'choice', subject: 'Geometry', topic: 'Parallelogram', q: 'Parallelogram base 7, height 4', a: '28', w: ['11','22','56'] },
        { type: 'choice', subject: 'Geometry', topic: 'Trapezoid', q: 'Trapezoid parallel 3, 7, height 4', a: '20', w: ['40','14','10'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circle area', q: 'Circle radius 5, area', a: '25π', w: ['10π','5π','50π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circumference', q: 'Circle radius 3, circumference', a: '6π', w: ['3π','9π','18π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Arc length', q: 'Arc r=4, angle 90°, length', a: 'π', w: ['2π','4π','π/2'] },
        { type: 'choice', subject: 'Geometry', topic: 'Sector area', q: 'Sector r=6, angle 60°, area', a: '6π', w: ['12π','36π','3π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Polygon perimeter', q: 'Regular hexagon side 2', a: '12', w: ['8','10','6'] },
        { type: 'choice', subject: 'Geometry', topic: 'Polygon angles', q: 'Pentagon interior angle sum', a: '540°', w: ['360°','720°','450°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Hexagon angle', q: 'Regular hexagon interior angle', a: '120°', w: ['90°','108°','135°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Ellipse', q: 'Ellipse x²/25 + y²/9 = 1 when a=5, b=3', a: 'Correct', w: ['x²/5 + y²/3','x² + y² = 25','x/5 + y/3'] },
        { type: 'choice', subject: 'Geometry', topic: 'Congruent', q: 'Triangles congruent if', a: 'Same size/shape', w: ['Same area','Same perimeter','Similar'] },
        { type: 'choice', subject: 'Geometry', topic: 'Similar', q: 'Triangles similar if', a: 'Angles equal', w: ['Sides equal','Same perimeter','One inside'] },
        { type: 'choice', subject: 'Geometry', topic: 'Scale area', q: 'Enlarged by 2, area by', a: '4', w: ['2','8','6'] },
        { type: 'choice', subject: 'Geometry', topic: 'Square perimeter', q: 'Square side 7, perimeter', a: '28', w: ['49','14','56'] },
        { type: 'choice', subject: 'Geometry', topic: 'Triangle angles', q: 'Triangle angle sum', a: '180°', w: ['90°','360°','270°'] }
    ]
});

// Batch 3: 3D shapes, volume, surface area
Game.addPack({
    id: 'aa_geometry_03',
    name: 'AA SL - Geometry (Batch 3)',
    _src: 'AA_SL/geometry.js',
    questions: [
        { type: 'choice', subject: 'Geometry', topic: 'Cube volume', q: 'Cube side 4, volume', a: '64', w: ['16','48','256'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cube surface', q: 'Cube side 3, surface area', a: '54', w: ['27','36','81'] },
        { type: 'choice', subject: 'Geometry', topic: 'Box volume', q: 'Box 5×6×7, volume', a: '210', w: ['18','35','70'] },
        { type: 'choice', subject: 'Geometry', topic: 'Box surface', q: 'Box 2×3×4, surface area', a: '52', w: ['24','36','72'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cylinder volume', q: 'Cylinder r=3, h=5, volume', a: '45π', w: ['15π','30π','90π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cylinder lateral', q: 'Cylinder r=2, h=3, lateral area', a: '12π', w: ['6π','24π','15π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Sphere volume', q: 'Sphere r=3, volume', a: '36π', w: ['9π','27π','108π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Sphere surface', q: 'Sphere r=2, surface area', a: '16π', w: ['8π','32π','4π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cone volume', q: 'Cone r=4, h=9, volume', a: '48π', w: ['36π','72π','12π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cone lateral', q: 'Cone r=3, slant 5, lateral area', a: '15π', w: ['9π','30π','8π'] },
        { type: 'choice', subject: 'Geometry', topic: 'Pyramid volume', q: 'Pyramid base 5×5, h=6, volume', a: '50', w: ['25','75','150'] },
        { type: 'choice', subject: 'Geometry', topic: 'Prism volume', q: 'Prism base area 10, h=8, volume', a: '80', w: ['40','18','160'] },
        { type: 'choice', subject: 'Geometry', topic: '3D distance', q: 'Distance (0,0,0) to (1,2,2)', a: '3', w: ['5','4','2'] },
        { type: 'choice', subject: 'Geometry', topic: 'Plane equation', q: 'Plane ax+by+cz=d determined by', a: '3 non-collinear', w: ['2 points','1 point','4 points'] },
        { type: 'choice', subject: 'Geometry', topic: 'Dot product', q: 'Dot (1,2,3)·(2,1,0)', a: '4', w: ['6','5','3'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cross product', q: 'Cross product gives', a: 'Perpendicular', w: ['Parallel','Scalar','Zero'] },
        { type: 'choice', subject: 'Geometry', topic: 'Perpendicular angle', q: 'Perpendicular lines angle', a: '90°', w: ['45°','60°','0°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Projection', q: 'Project 3D onto xy removes', a: 'z', w: ['x','y','all'] },
        { type: 'choice', subject: 'Geometry', topic: 'Scale volume', q: 'Scale factor 3, volume ×', a: '27', w: ['3','9','6'] },
        { type: 'choice', subject: 'Geometry', topic: 'Pythagorean 3D', q: 'Pythagorean 3D: a²+b²+c²=', a: 'd²', w: ['Volume','Surface','None'] }
    ]
});

// Batch 4: Trigonometry in geometry, sine/cosine rules
Game.addPack({
    id: 'aa_geometry_04',
    name: 'AA SL - Geometry (Batch 4)',
    _src: 'AA_SL/geometry.js',
    questions: [
        { type: 'choice', subject: 'Geometry', topic: 'Sine rule', q: 'a/sin(A)=b/sin(B) for', a: 'Any triangle', w: ['Right only','Isosceles','Equilateral'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cosine rule', q: 'c²=a²+b²-2ab cos(C) for', a: 'Finding sides', w: ['Acute only','Right only','Parallel'] },
        { type: 'choice', subject: 'Geometry', topic: 'Pythagorean angle', q: '3-4-5 angle opposite 5', a: '90°', w: ['60°','45°','30°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cosine calc', q: 'a=5, b=7, C=60°, c=', a: '√39', w: ['√74','√34','√44'] },
        { type: 'choice', subject: 'Geometry', topic: 'Area sin', q: 'Triangle area with angle C', a: '½ab sin(C)', w: ['½ab cos(C)','ab sin(C)','½ab'] },
        { type: 'choice', subject: 'Geometry', topic: 'Bearing', q: 'Bearing A to B', a: 'Direction/angle', w: ['Distance','Slope','Parallel'] },
        { type: 'choice', subject: 'Geometry', topic: 'Elevation', q: 'Angle of elevation from', a: 'Horizontal up', w: ['Vertical down','Ground down','North'] },
        { type: 'choice', subject: 'Geometry', topic: 'Depression', q: 'Angle of depression from', a: 'Horizontal down', w: ['Horizontal up','Vertical','North'] },
        { type: 'choice', subject: 'Geometry', topic: 'Height calc', q: '100m away, angle 30°, height', a: '57.7m', w: ['100m','50m','173m'] },
        { type: 'choice', subject: 'Geometry', topic: 'Bearing 45', q: 'Bearing 45° means', a: 'Northeast', w: ['North','East','West'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circumradius', q: 'R=a/(2 sin(A))', a: 'True', w: ['False','Right only','Equal only'] },
        { type: 'choice', subject: 'Geometry', topic: 'Inradius', q: 'r=Area/s, s is', a: 'Semi-perimeter', w: ['Perimeter','Side','Median'] },
        { type: 'choice', subject: 'Geometry', topic: 'Centroid', q: 'Centroid at', a: 'Avg vertices', w: ['Circumcenter','Orthocenter','Incenter'] },
        { type: 'choice', subject: 'Geometry', topic: 'Orthocenter', q: 'Orthocenter = intersection of', a: 'Altitudes', w: ['Medians','Bisectors','Perp bisect'] },
        { type: 'choice', subject: 'Geometry', topic: 'Circumcenter', q: 'Circumcenter = intersection of', a: 'Perp bisectors', w: ['Altitudes','Medians','Bisectors'] },
        { type: 'choice', subject: 'Geometry', topic: 'Angle bisector', q: 'Bisector divides opposite in', a: 'Adjacent ratio', w: ['Angles','Other','Equal'] },
        { type: 'choice', subject: 'Geometry', topic: 'Similar area', q: 'Similar 2:3, areas', a: '4:9', w: ['2:3','8:27','6:9'] },
        { type: 'choice', subject: 'Geometry', topic: '30-60-90', q: '30-60-90 sides', a: '1:√3:2', w: ['1:1:√2','1:2:3','2:2:2'] },
        { type: 'choice', subject: 'Geometry', topic: '45-45-90', q: '45-45-90 sides', a: '1:1:√2', w: ['1:√3:2','1:2:3','2:2:2'] },
        { type: 'choice', subject: 'Geometry', topic: 'Sine rule apply', q: 'Sine rule given', a: 'ASA/AAS', w: ['SSS','SAS','RHS'] }
    ]
});

// Batch 5: Locus, transformations, advanced geometry
Game.addPack({
    id: 'aa_geometry_05',
    name: 'AA SL - Geometry (Batch 5)',
    _src: 'AA_SL/geometry.js',
    questions: [
        { type: 'choice', subject: 'Geometry', topic: 'Locus equidistant', q: 'Points equidistant from two', a: 'Perp bisector', w: ['Circle','Line','Angle bisect'] },
        { type: 'choice', subject: 'Geometry', topic: 'Locus circle', q: 'Points distance r from P', a: 'Circle center P', w: ['Square','Line','Ellipse'] },
        { type: 'choice', subject: 'Geometry', topic: 'Locus parabola', q: 'Points equidistant line/point', a: 'Parabola', w: ['Ellipse','Hyperbola','Circle'] },
        { type: 'choice', subject: 'Geometry', topic: 'Tangent', q: 'Tangent at point', a: 'Perp to radius', w: ['Parallel','45°','Parallel chord'] },
        { type: 'choice', subject: 'Geometry', topic: 'Chord perp', q: 'Perp from center to chord', a: 'Bisects', w: ['1:3','Double','Half'] },
        { type: 'choice', subject: 'Geometry', topic: 'Inscribed angle', q: 'Inscribed angle is', a: 'Half central', w: ['Equal','Twice','90°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Cyclic quad', q: 'Cyclic quad opposite angles', a: '180°', w: ['90°','360°','270°'] },
        { type: 'choice', subject: 'Geometry', topic: 'Power point', q: 'Power PA·PB (secant)', a: 'Constant', w: ['Varies','Distance','Radius²'] },
        { type: 'choice', subject: 'Geometry', topic: 'Reflect preserve', q: 'Reflection preserves', a: 'Distance/angles', w: ['Distance','Angles','Orientation'] },
        { type: 'choice', subject: 'Geometry', topic: 'Rotate preserve', q: 'Rotation preserves', a: 'Distance/angles', w: ['Distance','Angles','Area'] },
        { type: 'choice', subject: 'Geometry', topic: 'Translate preserve', q: 'Translation preserves', a: 'All', w: ['Distance','Angles','Nothing'] },
        { type: 'choice', subject: 'Geometry', topic: 'Dilation factor', q: 'Dilation k multiplies distances', a: '|k|', w: ['k²','√k','k'] },
        { type: 'choice', subject: 'Geometry', topic: 'Fractal dim', q: 'Sierpinski triangle dimension', a: 'Non-integer', w: ['Integer','Irrational','Negative'] },
        { type: 'choice', subject: 'Geometry', topic: 'Golden ratio', q: 'Golden ratio φ ≈', a: '1.618', w: ['1.414','2.718','3.14'] },
        { type: 'choice', subject: 'Geometry', topic: 'Tessellation', q: 'Regular polygon tessellate', a: 'Triangle/square/hex', w: ['All','Pentagon','Circle'] },
        { type: 'choice', subject: 'Geometry', topic: 'Square symmetry', q: 'Square rotational symmetry', a: '4', w: ['2','8','1'] },
        { type: 'choice', subject: 'Geometry', topic: 'Rectangle symmetry', q: 'Rectangle lines of symmetry', a: '2', w: ['4','1','3'] },
        { type: 'choice', subject: 'Geometry', topic: 'Isometry', q: 'Isometry preserves', a: 'Distances', w: ['Angles','Areas','Orientation'] },
        { type: 'choice', subject: 'Geometry', topic: 'Spherical geo', q: 'Spherical triangle angles', a: '>180°', w: ['<180°','=180°','Undefined'] },
        { type: 'choice', subject: 'Geometry', topic: 'Euclidean assume', q: 'Euclidean assumes', a: 'Parallel postulate', w: ['4-side triangle','Circle=line','Discrete'] }
    ]
});

console.log('AA_SL: geometry packs loaded (5 packs, 100 questions)');
