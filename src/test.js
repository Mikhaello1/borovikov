import regression from "regression";
import methods from "regression"

let data = [
    [0.00000001, 15],
    [500, 14],
    [700, 13],
    
]

// regression["linear"] = function(data) {
//                 var sum = [0, 0, 0, 0, 0], n = 0, results = [];

//                 for (; n < data.length; n++) {
//                   if (data[n][1] != null) {
//                     sum[0] += data[n][0];
//                     sum[1] += data[n][1];
//                     sum[2] += data[n][0] * data[n][0];
//                     sum[3] += data[n][0] * data[n][1];
//                     sum[4] += data[n][1] * data[n][1];
//                   }
//                 }

//                 var gradient = (n * sum[3] - sum[0] * sum[1]) / (n * sum[2] - sum[0] * sum[0]);
//                 var intercept = (sum[1] / n) - (gradient * sum[0]) / n;
//               //  var correlation = (n * sum[3] - sum[0] * sum[1]) / Math.sqrt((n * sum[2] - sum[0] * sum[0]) * (n * sum[4] - sum[1] * sum[1]));

//                 for (var i = 0, len = data.length; i < len; i++) {
//                     var coordinate = [data[i][0], data[i][0] * gradient + intercept];
//                     results.push(coordinate);
//                 }

//                 var string = 'y = ' + gradient + 'x + ' + intercept;

//                 return {equation: [gradient, intercept], points: results, string: string};
//             }

let model = regression["logarithmic"](data, {precision: 10})

console.log(model)




