
export default function recalcValues(tValues, recalcModel, XYModel, numPoints){

    // console.log(recalcModel)
    
    let recalcFactorValues = tValues.map(value => recalcModel.model(value).toFixed(3))
    let recalcYParamValues = recalcFactorValues.map(value => XYModel.model(value).toFixed(3))

    return{
        recalcFactorValues, 
        recalcYParamValues
    }
}