export default function calcForecastError(forecastValues, trulyValues) {
    return Math.sqrt(
        trulyValues.map((val, index) => {
            return ((forecastValues[index] - val) / val) ** 2;
        })  / forecastValues.length
    );
}
