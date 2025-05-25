const model1 = {
    xQ: "F",
    yQ: "Y",
    type: "logarithmic",
    getFormula: function () {
        return `Y(F) = ${this.equation[0]} + ${this.equation[1]}ln(F)`;
    },
    calcValue: function (value) {
        return this.equation[0] + this.equation[1] * value
    },
    equation: [60.56, -56.28],
};

const model2 = {
    xQ: "t",
    yQ: "Y",
    type: "exponential",
    getFormula: function () {
        return `${this.yQ}(${this.xQ}) = ${this.equation[0]} + ${this.equation[1]}ln(t)`;
    },
    calcValue: function (value) {
        return this.equation[0] + this.equation[1] * Math.log(value)
    },
    equation: [18.8, 5], 
};

const createRecalcModel = (model1, model2) => {
    if (model1.type == "linear") {
        let a = model2.equation[0] / model1.equation[0];
        if(model2.type == "linear"){
            let b = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return model2.getFormula.call(this);
                },
                calcValue: function(value){
                    return this.equation[0] * value + this.equation[1]
                },
                equation: [a, b],
            };
        }
        if(model2.type == "logarithmic"){
            let b = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return model2.getFormula.call(this);
                },
                calcValue: function(value){
                    return this.equation[0] * Math.log(value) + this.equation[1]
                },
                equation: [a, b],
            };
        }
        if(model2.type == "power"){
            let b = model2.equation[1];
            let c = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}${this.xQ}^${b} + ${c}`
                },
                calcValue: function(value){
                    return this.equation[0] * Math.pow(value, this.equation[1]) + this.equation[2]
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "exponential"){
            let c = model1.equation[1] * -1;
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}e^${model2.equation[1]}${this.xQ} + ${c}`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.pow(value, this.equation[1]) + this.equation[2]
                },
                equation: [a, model2.equation, c],
            };
        }
    }
    if (model1.type == "logarithmic") {
        if (model2.type == "linear") {
            let a = model2.equation[0] / model1.equation[0];
            let b = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "exponential",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = e^(${a}${this.xQ} + ${b})`;
                },
                equation: [a, b],
            };
        }
        if (model2.type == "logarithmic") {
            let a = Math.exp((model2.equation[1] - model1.equation[1]) / model1.equation[0]);
            let b = model2.equation[0] / model1.equation[0];

            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "power",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}${this.xQ}^${b}`;
                },
                equation: [a, b],
            };
        }
        if (model2.type == "exponential") {
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1];
            let c = (model1.equation[1] / model1.equation[0]) * -1;
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "exponential",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = e^(${a}e^(${b}${this.xQ}) + ${c})`;
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "power") {
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1];
            let c = (-1 * model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "exponential",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = e^(${a}${this.xQ}^${b} + ${c})`;
                },
                equation: [a, b, c],
            };
        }
    }
    if (model1.type == "exponential") {
        if (model2.type == "linear") {
            let a = 1 / model1.equation[1];
            let b = model2.equation[0] / model1.equation[0];
            let c = model2.equation[1] / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "logarithmic",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}ln(${b}${xQ} + ${c})`;
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "logarithmic") {
            let a = 1 / model1.equation[1];
            let b = model2.equation[0] / model1.equation[0];
            let c = model2.equation[1] / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "logarithmic",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}ln(${b}ln(${this.xQ}) + ${c})`;
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "exponential") {
            let a = model2.equation[1] / model1.equation[1];
            let b = (Math.log(model2.equation[0]) - Math.log(model2.equation[0])) / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "linear",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}${this.xQ} - ${b}`;
                },
                equation: [a, b],
            };
        }
        if (model2.type == "power") {
            let a = model2.equation[1] / model1.equation[1];
            let b = (Math.log(model2.equation[0]) - Math.log(model2.equation[0])) / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "linear",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${a}ln(${this.xQ}) - ${b}`;
                },
                equation: [a, b],
            };
        }
    }
    if (model1.type == "power") {
        if (model2.type == "linear") {
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1] / model1.equation[0];
            let c = 1 / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "power",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = (${a}${this.xQ} + ${b})^${c}`;
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "logarithmic") {
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1] / model1.equation[0];
            let c = 1 / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "logarithmic",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = (${a} + ${b}ln(${this.xQ}))^${c}`;
                },
                equation: [a, b, c],
            };
        }
        if (model2.type == "exponential") {
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1];
            let c = 1 / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "exponential",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = (${a}e^(${b}${this.xQ}))^${c}`;
                },
                equation: [a, b, c],
            };
        }
        if(model2.type == "power"){
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1];
            let c = 1 / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "power",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = (${a}${this.xQ}^${b})^${c}`;
                },
                equation: [a, b, c],
            }
        }
    }
};

// console.log(createRecalcModel(model1, model2).getFormula());


export default function roundNum(num) {
    // Преобразуем число в строку
    let numStr = num.toString();

    // Проверяем, является ли число малым (научная нотация)
    if (Math.abs(num) < 1e-4) {
        return '0'; // Если число очень маленькое, возвращаем 0
    }

    // Проверяем, есть ли плавающая точка
    if (numStr.includes('.')) {
        // Разделяем число на целую и дробную части
        let [integerPart, decimalPart] = numStr.split('.');
        
        // Убираем лишние нули в дробной части
        decimalPart = decimalPart.replace(/0+$/, '');

        // Если дробная часть не пустая, оставляем 2 знака после запятой
        if (decimalPart.length > 2) {
            decimalPart = decimalPart.substring(0, 2);
        }

        // Возвращаем конечный результат
        return integerPart + (decimalPart ? '.' + decimalPart : '');
    }

    // Если плавающей точки нет, возвращаем число как есть
    return numStr;
}

console.log(roundNum(3.572734832486e-8))