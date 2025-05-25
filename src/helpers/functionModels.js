


export const functionModels = {
    linear: (b, c, x) => b * x + c,
    exponential: (a, b, x) => a * Math.exp(b*x),
    logarithmic: (a, c, x) => a * Math.log(x) + c,
    power: (a, b, x) => a * Math.pow(x, b)
}