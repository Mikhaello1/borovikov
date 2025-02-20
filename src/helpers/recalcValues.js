import { functionModels } from "./functionModels"


function getFunctionModel(type){
    
    return functionModels[type]
}

export default function recalcValues(tValues, recalcModel, XYModel){

    let recalcedFactorValues = tValues.map(value => getFunctionModel(recalcModel.type)(...recalcModel.equation, value))

    let recalcedYParamValues = recalcedFactorValues.map(value => getFunctionModel(XYModel.type)(...XYModel.equation, value))
    
    return {
        recalcedFactorValues, 
        recalcedYParamValues
    }
}