

export default function transformPoints(xValues, yValues){

    let points = []

    xValues.forEach((xValue, index) => {
        points.push([+xValue, +yValues[index]])
    })

    return points

    
}