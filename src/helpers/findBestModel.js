import regression from "regression";
import transformPoints from "./transformPoints";

function simplifyEquation(equationString, parameter, factor) {
    let simplifiedString = equationString.replace(/\+ -/g, '-');
    simplifiedString = simplifiedString.replace(/y/g, parameter);
    simplifiedString = simplifiedString.replace(/x/g, factor);
    return simplifiedString;
}

export const findBestModel = (xValues, yValues, parameter, factor) => {
    const data = transformPoints(xValues, yValues);

    const models = {
        linear: regression.linear(data),
        quadratic: regression.polynomial(data, { order: 2 }),
        logarithmic: regression.logarithmic(data),
        exponential: regression.exponential(data),
        power: regression.power(data),
    };

    const bestModel = Object.entries(models).reduce((best, current) => {
        return current[1].r2 > best[1].r2 ? current : best;
    });

    bestModel[1].string = simplifyEquation(bestModel[1].string, parameter, factor);

    return {
        type: bestModel[0],
        formula: bestModel[1].string,
        r2: bestModel[1].r2,
        equation: bestModel[1].equation,
    };
};

export const getModels = (xValues, yValues, parameter, factor) => {
    const data = transformPoints(xValues, yValues);

    const models = {
        linear: regression.linear(data),
        quadratic: regression.polynomial(data, { order: 2 }),
        logarithmic: regression.logarithmic(data),
        exponential: regression.exponential(data),
        power: regression.power(data),
    };

    const processedModels = Object.entries(models).map(([type, model]) => ({
        type: type,
        formula: simplifyEquation(model.string, parameter, factor),
        r2: model.r2,
        equation: model.equation,
    }));

    return processedModels;
}