import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBestModel } from "../helpers/findBestModel";

function MathModel({xValues, yValues, factorName, setMathModelValue, setGoNext}) {
    const whatModel = factorName == 'ток коллектора' ? 'factorMathModel' : factorName == 'наработка' ? 'workTimeMathModel' : 'recalcMathModel'

    const dispatch = useDispatch()

    const model = useSelector(state => state.mathModels[whatModel])

    const handleCreateModel = useCallback(() => {
        const mathModel = findBestModel(xValues, yValues)
        dispatch(setMathModelValue(mathModel))
        setGoNext(prev => new Set(prev).add(whatModel + mathModel.formula));

    }, [xValues, yValues, whatModel]);

    

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
