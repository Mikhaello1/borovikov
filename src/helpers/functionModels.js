


export const functionModels = {
    linear: (_, b, c, x) => b * x + c,
    quadratic: (a, b, c, x) => a * x ** 2 + b * x + c,
    exponent: (a, b, _, x) => a * Math.exp(b*x),
    logarythm: (a, _, c, x) => a * Math.log(x) + c

}