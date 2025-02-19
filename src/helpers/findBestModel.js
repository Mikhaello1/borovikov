import regression from 'regression'
import transformPoints from "./transformPoints";

export const findBestModel = (xValues, yValues) => {
    
    const data = transformPoints(xValues, yValues)
    

    const models = {
        linear: regression.linear(data),
        quadratic: regression.polynomial(data, { order: 2 }),
        logarithmic: regression.logarithmic(data),
        exponential: regression.exponential(data),
        power: regression.power(data)
    };

    const bestModel = Object.entries(models).reduce((best, current) => {
        return current[1].r2 > best[1].r2 ? current : best;
    });

    return {
        type: bestModel[0],
        formula: bestModel[1].string,
        r2: bestModel[1].r2,
        equation: bestModel[1].equation
    }
}
