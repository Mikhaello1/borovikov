

export default function transformPoints(xValues, yValues){

    let points = []

    xValues.forEach((xValue, index) => {
        points.push([xValue[0], +yValues[index]])
    })

    return points

    
}