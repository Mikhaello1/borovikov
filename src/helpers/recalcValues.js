import { functionModels } from "./functionModels"


function getFunctionModel(type){
    
    return functionModels[type]
}

export default function recalcValues(tValues, recalcModel, XYModel){
    console.log(recalcModel)
    let recalcedFactorValues = tValues.map(value => getFunctionModel(recalcModel.type)(...recalcModel.equation, value))
    console.log(tValues)
    console.log(recalcedFactorValues)
    let recalcedYParamValues = recalcedFactorValues.map(value => getFunctionModel(XYModel.type)(...XYModel.equation, value))
    
    return {
        recalcedFactorValues, 
        recalcedYParamValues
    }
}