import regression from "regression";
import transformPoints from "./transformPoints";

import { functionModels } from "./functionModels";
import { precision } from "numeric";
import { customRound } from "./customRound";

function simplifyEquation(equationString, parameter, factor) {
    if(!equationString || !parameter || !factor) return null
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

export const getModel = (xValues, yValues, parameter, factor, index) => {
    let xVal = xValues.map(num => Number(num) === 0 ? num = 0.000001 : num)
    let yVal = yValues.map(num => Number(num) === 0 ? num = 0.000001 : num)
    xVal = xVal.map(num => Number(num))
    yVal = yVal.map(num => Number(num))
    
    const data = transformPoints(xVal, yVal);
    

    const type = index === 0 ? "linear" : index === 1 ? "logarithmic" : index === 2 ? "exponential" : index === 3 && "power";

    let {string, r2, equation} = regression[type](data, {precision: 10})

    let roundedEquation = equation.map(num => customRound(num))
    
    if(type == "linear") string = `y = ${roundedEquation[0]}⋅x + ${roundedEquation[1]}`
    if(type == "exponential") string = `y = ${roundedEquation[0]}⋅e^(${roundedEquation[1]}⋅x)`
    if(type == "power") string = `y = ${roundedEquation[0]}⋅x^(${roundedEquation[1]})`
    if (type == "logarithmic") {
        
        roundedEquation = roundedEquation.reverse();
        string = `y = ${roundedEquation[0]}⋅ln(x) + ${roundedEquation[1]}`
        
    }
    

    return {
        xQ: factor,
        yQ: parameter,
        type, 
        formula: simplifyEquation(string, parameter, factor),
        calcValue: function(value){
            return functionModels[type](...this.equation, value)
        },
        r2: customRound(r2),
        equation: roundedEquation
    }
}