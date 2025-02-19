import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBestModel } from "../helpers/findBestModel";

function MathModel({xValues, yValues, factorName, setMathModelValue}) {
    const whatModel = factorName == 'ток коллектора' ? 'factorMathModel' : factorName == 'наработка' ? 'workTimeMathModel' : 'recalcMathModel'

    const dispatch = useDispatch()

    const model = useSelector(state => state.mathModels[whatModel])

    const handleCreateModel = () => {
        dispatch(setMathModelValue(findBestModel(xValues, yValues)))
    };

    

    return (
        <div>
            <button onClick={handleCreateModel}>Получить математичускую модель</button>
            {model.formula && model.formula}
        </div>
    );
}

export default memo(MathModel)
