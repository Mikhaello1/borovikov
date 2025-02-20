import { findBestModel } from "./findBestModel";
import { functionModels } from "./functionModels";
import roundNum from "./roundNum";



export default function recalcModel(workTimeData, workTimeAverages, factorValues, factorAverages) {

    const inverseTMathModel = findBestModel(workTimeAverages, workTimeData)
    console.log(inverseTMathModel)
    console.log(factorAverages)
    let newTimeData = factorAverages.map(value => {
        return functionModels[inverseTMathModel.type](...inverseTMathModel.equation, value)
    })
    
    newTimeData.forEach(el => roundNum(el))
    console.log(newTimeData)
    
    return findBestModel(newTimeData, factorValues)
    

}