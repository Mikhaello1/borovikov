export default function createRecalcModel (model1, model2){
    if (model1.type == "linear") {
        let a = model2.equation[0] / model1.equation[0];
        if(model2.type == "linear"){
            let b = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}${this.xQ} + ${this.equation[1]}`
                },
                calcValue: function(value){
                    return this.equation[0] * value + this.equation[1]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
            };
        }
        if(model2.type == "logarithmic"){
            let b = (model2.equation[1] - model1.equation[1]) / model1.equation[0];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}ln(${this.xQ}) + ${this.equation[1]}`
                },
                calcValue: function(value){
                    return this.equation[0] * Math.log(value) + this.equation[1]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}${this.xQ}^${this.equation[1]} + ${this.equation[2]}`
                },
                calcValue: function(value){
                    return this.equation[0] * Math.pow(value, this.equation[1]) + this.equation[2]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
            };
        }
        if (model2.type == "exponential"){
            let b = model2.equation[1];
            let c = model1.equation[1] * -1;
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: model2.type,
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}e^${this.equation[1]}${this.xQ} + ${this.equation[2]}`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.pow(value, this.equation[1]) + this.equation[2]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = e^(${this.equation[0]}${this.xQ} + ${this.equation[1]})`;
                },
                calcValue: function(value){
                    return Math.exp(this.equation[0] * value + this.equation[1])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}${this.xQ}^${this.equation[1]}`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.pow(value, this.equation[1])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = e^(${this.equation[0]}e^(${this.equation[1]}${this.xQ}) + ${this.equation[2]})`;
                },
                calcValue: function(value){
                    return Math.exp(this.equation[0] * Math.exp(this.equation[1] * value) + this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = e^(${this.equation[0]}${this.xQ}^${this.equation[1]} + ${this.equation[2]})`;
                },
                calcValue: function(value){
                    return Math.exp(this.equation[0] * Math.pow(value, this.equation[1]) + this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}ln(${this.equation[1]}${xQ} + ${this.equation[2]})`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.log(this.equation[1] * value + this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}ln(${this.equation[1]}ln(${this.xQ}) + ${this.equation[2]})`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.log(this.equation[1] * Math.log(value) + this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}${this.xQ} + ${this.equation[1]}`;
                },
                calcValue: function(value){
                    return this.equation[0] * value + this.equation[1]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = ${this.equation[0]}ln(${this.xQ}) + ${this.equation[1]}`;
                },
                calcValue: function(value){
                    return this.equation[0] * Math.log(value) + this.equation[1]
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = (${this.equation[0]}${this.xQ} + ${this.equation[1]})^${this.equation[2]}`;
                },
                calcValue: function(value){
                    return Math.pow(this.equation[0] * value + this.equation[1], this.equation[2]) 
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = (${this.equation[0]} + ${this.equation[1]}ln(${this.xQ}))^${this.equation[2]}`;
                },
                calcValue: function(value){
                    return Math.pow(this.equation[0] + this.equation[1] * Math.log(value), this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
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
                    return `${this.yQ}(${this.xQ}) = (${this.equation[0]}e^(${this.equation[1]}${this.xQ}))^${this.equation[2]}`;
                },
                calcValue: function(value){
                    return Math.pow(this.equation[0] * Math.exp(this.equation[1] * value), this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
            };
        }
        if(model2.type == "power"){
            console.log(model1.equation, model2.equation)
            let a = model2.equation[0] / model1.equation[0];
            let b = model2.equation[1];
            let c = 1 / model1.equation[1];
            return {
                xQ: model2.xQ,
                yQ: model1.xQ,
                type: "power",
                getFormula: function () {
                    return `${this.yQ}(${this.xQ}) = (${this.equation[0]}${this.xQ}^${this.equation[1]})^${this.equation[2]}`;
                },
                calcValue: function(value){
                    return Math.pow(Math.pow(this.equation[0] * value, this.equation[1]), this.equation[2])
                },
                equation: [Number(a.toFixed(4)), Number(b.toFixed(4)), Number(c.toFixed(4))],
            }
        }
    }
};
