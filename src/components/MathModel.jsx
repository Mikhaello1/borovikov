import React, { memo, useCallback, useState } from "react";
import findBestFitModel from "../helpers/fitModel";
import { useDispatch, useSelector } from "react-redux";

function MathModel({xValues, yValues, factorName, setMathModelValue}) {
    const whatModel = factorName == 'ток коллектора' ? 'factorMathModel' : factorName == 'наработка' ? 'workTimeMathModel' : 'recalcMathModel'

    const dispatch = useDispatch()

    const model = useSelector(state => state.mathModels[whatModel])

    const handleCreateModel = () => {
        dispatch(setMathModelValue(findBestFitModel(xValues, yValues)))
    };

    

    return (
        <div>
            <button onClick={handleCreateModel}>Получить математичускую модель</button>
            {model.formula && model.formula}
        </div>
    );
}

export default memo(MathModel)
