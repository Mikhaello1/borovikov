import { functionModels } from "./functionModels";
import roundNum from "./roundNum";

function getFunctionModel(type) {
    return functionModels[type];
}

export default function recalcValues(tValues, recalcModel, XYModel) {
    let recalcedFactorValues = tValues.map((value) => roundNum(getFunctionModel(recalcModel.type)(...recalcModel.equation, value)));

    let recalcedYParamValues = recalcedFactorValues.map((value) => roundNum(getFunctionModel(XYModel.type)(...XYModel.equation, value)));
    return {
        recalcedFactorValues,
        recalcedYParamValues,
    };
}
