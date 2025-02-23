export default function calcForecastError(forecastValues, trulyValues) {

    let tempSum = 0;

    for (let i = 0; i<trulyValues.length; i++){
        tempSum += ((forecastValues[i] - trulyValues[i]) / trulyValues[i]) ** 2;
        console.log(tempSum)
    }

    return Math.sqrt(
        tempSum / forecastValues.length
    );

}
