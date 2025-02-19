


export const functionModels = {
    linear: (_, b, c, x) => b * x + c,
    quadratic: (a, b, c, x) => a * x ** 2 + b * x + c,
    exponential: (a, b, _, x) => a * Math.exp(b*x),
    logarythmic: (a, _, c, x) => a * Math.log(x) + c,
    power: (a, b, _, x) => a * Math.pow(x, b)
}