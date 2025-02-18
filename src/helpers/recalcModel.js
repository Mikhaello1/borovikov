
export default function recalcModel(YXModel, YZModel) {
    let a1 = YXModel.a;
    let b1 = YXModel.b;
    let c1 = YXModel.c;
    let a2 = YZModel.a;
    let b2 = YZModel.b;
    let c2 = YZModel.c;


    if (YXModel.type == "linear") {
        if (c1 !== 0) c2 -= c1;
        if (a1 !== 1) {
            [a2, b2, c2] = [a2, b2, c2].map((x) => x / a1);
        }
        if (b1 != 1) {
            [a2, b2, c2] = [a2, b2, c2].map((x) => x ** b1);
        }
        return {
            type: YZModel.type,
            formula: `x(z) = ${a2 !== 1 ? a2 : ""}z ${c2 !== 0 && c2 < 0 ? c2 : `+ ${c2}`}`,
            model: x => a2 * x + c2,
            a: a2,
            b: b2,
            c: c2,
        };
    }
    if (YXModel.type == "quadratic") {
        let formula = "";
        let model;
        if (YZModel.type == "quadratic") {

            const leftSide = (b2 * b2 * a1) / a2;
            const rightSide = b1 * b1 - 4 * a1 * c1 + 4 * a1 * c2;

            const isPerfectSquare = Math.abs(leftSide - rightSide) < 1e-6;
            if (isPerfectSquare) {
                const sqrtA1 = Math.sqrt(a1);
                const sqrtA2 = Math.sqrt(a2);

                a2 = sqrtA2 / sqrtA1;
                b2 = b2 / (2 * sqrtA1 * sqrtA2);
                c2 = -b1 / (2 * a1);

                formula = `x = ${a2}z^2 + ${b2}z + ${c2}`;
                model = x => a2 * x ** 2 + b2 * x + c2
            } else {
                formula = `x = [ ${b1} ± sqrt(${4 * a1 * a2}z^2 + ${4 * a1 * b2}z + ${b1 * b1 - 4 * a1 * c1 + 4 * a1 * c2}) ] / ${2 * a1})`;
                model = x => (b1 - Math.sqrt(4 * a1 * a2) * (x ** 2) + 4*a1*b2*x + (b1 ** 2) - 4 * a1 * c1 + 4 * a1 * c2) / (2 * a1)
            }
        }
        if (YZModel.type == "linear") {
            b2 = (-1 * a2) / a1;
            c2 = (-1 * b1 + Math.sqrt(b1 ** 2 - 4 * a1 * (c1 - c2))) / (2 * a1);
            a2 = 0;
            formula = `x(z) = ${b2.toFixed(3)}z ${c2 == 0 ? "" : c2 < 0 ? c2.toFixed(3) : `+${c2.toFixed(3)}`}`; 
            model = x => b2 * x + c2
        }
        return {
            type: YZModel,
            formula: formula,
            model,
            a: a2,
            b: b2,
            c: c2
        };
    }
}
