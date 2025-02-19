import { functionModels } from "./functionModels"


function getFunctionModel(type){
    console.log(functionModels[type])
    return functionModels[type]
}

export default function recalcValues(tValues, recalcModel, XYModel){
    console.log(functionModels)
    console.log(getFunctionModel(recalcModel))
    
    // let recalcFactorValues = tValues.map(value => getFunctionModel(recalcModel.type)(recalcModel.a, recalcModel.b, recalcModel.c, value).toFixed(3))

    // let recalcYParamValues = recalcFactorValues.map(value => getFunctionModel(XYModel.type)(XYModel.a, XYModel.b, XYModel.c, value).toFixed(3))

    return{
        // recalcFactorValues, 
        // recalcYParamValues
    }
}