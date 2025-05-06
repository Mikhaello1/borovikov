import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBestModel, getModels } from "../helpers/findBestModel";

function MathModel({ xValues, yValues, factorName, setMathModelValue, setGoNext, parameter, factor }) {
    const whatModel = factorName == "ток коллектора" ? "factorMathModel" : factorName == "наработка" ? "workTimeMathModel" : "recalcMathModel";

    const dispatch = useDispatch();

    const model = useSelector((state) => state.mathModels[whatModel]);

    const [availableModels1, setAvailableModels1] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);

    const handleCreateModel = useCallback(() => {
        setAvailableModels1(getModels(xValues, yValues, parameter, factor));
    }, [xValues, yValues, parameter, factor]);

    const handleModelSelect = (model) => {
        setSelectedModel(model);
    };

    const handleConfirmModel = () => {
        if (selectedModel) {
            dispatch(setMathModelValue(selectedModel));
            setGoNext((prev) => new Set(prev).add(whatModel + selectedModel.formula));
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{ fontSize: "15px", padding: '8px 12px', cursor: 'pointer' }} onClick={handleCreateModel}>
                Получить возможные модели
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {availableModels1.length ? availableModels1.map((el) => (
                    <div
                        key={el.formula}
                        style={{
                            border: "1px solid black",
                            padding: '8px',
                            cursor: 'pointer',
                            backgroundColor: selectedModel === el ? '#e0e0e0' : 'transparent',
                        }}
                        onClick={() => handleModelSelect(el)}
                    >
                        {el.formula}, r<sup>2</sup> = {el.r2}
                    </div>
                )) : null}
            </div>

            {selectedModel && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>Выбранная модель: {selectedModel.formula}</p>
                    <button style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={handleConfirmModel}>
                        Подтвердить выбор
                    </button>
                </div>
            )}
        </div>
    );
}

export default memo(MathModel);