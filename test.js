import * as math from'mathjs';

// Определяем ваши функции
const yx = '2 * x + 3'; // y(x)
const yz = 'y + 1';     // y(z)

// Для решения уравнения необходимо выразить y через x и затем подставить в y(z)
const yxExpr = math.parse(yx);
const yzExpr = math.parse(yz);

// Подставляем y(x) в y(z)
const combined = math.simplify(yzExpr.subs({ y: yxExpr }));

// Теперь можем решить уравнение combined = 0 для x
const solutions = math.solve(combined, 'x');
console.log(solutions);