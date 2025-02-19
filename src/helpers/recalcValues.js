import { functionModels } from "./functionModels"


function getFunctionModel(type){
    return functionModels[type]
}

export default function recalcValues(tValues, recalcModel, XYModel){

    
    
    
    let recalcFactorValues = tValues.map(value => getFunctionModel(recalcModel.type)(value).toFixed(3))
    let recalcYParamValues = recalcFactorValues.map(value => getFunctionModel(XYModel.tye)(value).toFixed(3))

    return{
        recalcFactorValues, 
        recalcYParamValues
    }
}