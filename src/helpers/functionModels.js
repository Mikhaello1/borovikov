


export const functionModels = {
    linear: (b, c, x) => b * x + c,
    quadratic: (a, b, c, x) => a * x ** 2 + b * x + c,
    exponential: (a, b, x) => a * Math.exp(b*x),
    logarithmic: (c, a, x) => a * Math.log(x) + c,
    power: (a, b, x) => a * Math.pow(x, b)
}