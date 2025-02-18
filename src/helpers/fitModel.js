import transformPoints from "./transformPoints";


export default function findBestFitModel(xValues, yValues) {

    const points = transformPoints(xValues, yValues)

    console.log(points)

    if (points.length <= 2) {
        return "Недостаточно данных для анализа";
    }

    let models = [
        linearRegression(points),
        quadraticRegression(points),
        exponentialRegression(points),
        logarithmicRegression(points)
    ];

    let bestModel = models.reduce((best, model) => (model.r2 > best.r2 ? model : best));

    

    // return `Лучшая модель: ${bestModel.name} Формула: ${bestModel.equation} R² = ${bestModel.r2.toFixed(4)}`;
    return {
        type: bestModel.name,
        formula: bestModel.equation,
        model: bestModel.model,
        r2: bestModel.r2.toFixed(4),
        a: bestModel.a,
        b: bestModel.b,
        c: bestModel.c
    }
}

// ЛИНЕЙНАЯ РЕГРЕССИЯ (y = ax + c)
function linearRegression(points) {
    let n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    points.forEach(([x, y]) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    });

    let a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    let c = (sumY - a * sumX) / n;

    return {
        name: "linear",
        equation: `y = ${a.toFixed(3)}x ${c < 0 ? c.toFixed(3) : `+${c.toFixed(3)}`}`,
        model: x => a * x + c,
        r2: calculateR2(points, x => a * x + c),
        a: a.toFixed(3),
        b: 0,
        c: c.toFixed(3),
        
    };
}

// КВАДРАТИЧНАЯ РЕГРЕССИЯ (y = ax² + bx + c)
function quadraticRegression(points) {
    let n = points.length;
    let sumX = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0;
    let sumY = 0, sumXY = 0, sumX2Y = 0;

    points.forEach(([x, y]) => {
        let x2 = x * x;
        sumX += x;
        sumX2 += x2;
        sumX3 += x2 * x;
        sumX4 += x2 * x2;
        sumY += y;
        sumXY += x * y;
        sumX2Y += x2 * y;
    });

    let A = [
        [n, sumX, sumX2],
        [sumX, sumX2, sumX3],
        [sumX2, sumX3, sumX4]
    ];
    let B = [sumY, sumXY, sumX2Y];

    let [c, b, a] = solveLinearSystem(A, B);

    return {
        name: "quadratic",
        equation: `y = ${a.toFixed(3)}x² ${b < 0 ? b.toFixed(3) : `+${b.toFixed(3)}`}x ${c < 0 ? c.toFixed(3) : `+${c.toFixed(3)}`}`,
        model: x => a * x ** 2 + b * x + c,
        r2: calculateR2(points, x => a * x ** 2 + b * x + c),
        a: a.toFixed(3),
        b: b.toFixed(3),
        c: c.toFixed(3)
    };
}

// ЭКСПОНЕНЦИАЛЬНАЯ РЕГРЕССИЯ (y = ae^(bx))
function exponentialRegression(points) {
    let transformedPoints = points.map(([x, y]) => [x, Math.log(y)]);
    let linearModel = linearRegression(transformedPoints);

    let a = Math.exp(linearModel.model(0));
    let b = linearModel.model(1) - linearModel.model(0);

    return {
        name: "exponent",
        equation: `y = ${a.toFixed(2)}e^(${b.toFixed(2)}x)`,
        model: x => a * Math.exp(b * x),
        r2: calculateR2(points, x => a * Math.exp(b * x)),
        a: a.toFixed(3),
        b: b.toFixed(3),
        c: 0
    };
}

// ЛОГАРИФМИЧЕСКАЯ РЕГРЕССИЯ (y = a * ln(x) + c)
function logarithmicRegression(points) {
    let transformedPoints = points.map(([x, y]) => [Math.log(x), y]);
    let linearModel = linearRegression(transformedPoints);

    let a = linearModel.model(1) - linearModel.model(0);
    let c = linearModel.model(0);

    return {
        name: "logarythm",
        equation: `y = ${a.toFixed(3)}ln(x) ${c < 0 ? c.toFixed(3) : `+${c.toFixed(3)}`}`,
        model: x => a * Math.log(x) + c,
        r2: calculateR2(points, x => a * Math.log(x) + c),
        a: a.toFixed(3),
        b: 0,
        c: c.toFixed(3)
    };
}

// Решение системы уравнений методом Гаусса
function solveLinearSystem(A, B) {
    let n = B.length;
    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                maxRow = k;
            }
        }
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [B[i], B[maxRow]] = [B[maxRow], B[i]];

        for (let k = i + 1; k < n; k++) {
            let factor = A[k][i] / A[i][i];
            for (let j = i; j < n; j++) {
                A[k][j] -= factor * A[i][j];
            }
            B[k] -= factor * B[i];
        }
    }

    let X = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = B[i];
        for (let j = i + 1; j < n; j++) {
            sum -= A[i][j] * X[j];
        }
        X[i] = sum / A[i][i];
    }
    return X;
}

// Коэффициент детерминации R²
function calculateR2(points, model) {
    let meanY = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
    let ssTotal = points.reduce((sum, [, y]) => sum + (y - meanY) ** 2, 0);
    let ssResidual = points.reduce((sum, [x, y]) => sum + (y - model(x)) ** 2, 0);

    return 1 - ssResidual / ssTotal;
}
