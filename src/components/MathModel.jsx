import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBestModel } from "../helpers/findBestModel";

function MathModel({xValues, yValues, factorName, setMathModelValue}) {
    const whatModel = factorName == 'ток коллектора' ? 'factorMathModel' : factorName == 'наработка' ? 'workTimeMathModel' : 'recalcMathModel'

    const dispatch = useDispatch()

    const model = useSelector(state => state.mathModels[whatModel])

    const handleCreateModel = useCallback(() => {
        dispatch(setMathModelValue(findBestModel(xValues, yValues)))
    }, [xValues, yValues]);

    

    return (
        <div>
            <button onClick={handleCreateModel}>Получить математическую модель</button>
            <div>
                {model.formula && model.formula}
            </div>
        </div>
    );
}

export default memo(MathModel)
