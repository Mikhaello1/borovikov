import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModel, getModels } from "../helpers/findBestModel";
import { setChosenModelIndex } from "../redux/slices/chosenModelSlice";

import { setModel } from "../redux/slices/createdModelsSlice";

function MathModel({ xValues, yValues, factorName, setMathModelValue, setGoNext, parameter, factor }) {
    const whatModel = factorName == "ток коллектора" ? "factorMathModel" : factorName == "наработка" ? "workTimeMathModel" : "recalcMathModel";
    const whatModel2 = factorName == "ток коллектора" ? "factorModels" : "workTimeModels";

    const mathModels = [
        {
            id: 0,
            name: "Линейная",
            formula: "y = a*x + b",
        },
        {
            id: 1,
            name: "Логарифмическая",
            formula: "y = a + b*ln(x)",
        },
        {
            id: 2,
            name: "Экспоненциальная",
            formula: "y = a*e^(bx)",
        },
        {
            id: 3,
            name: "Степенная",
            formula: "y = a*x^b",
        },
    ];

    const dispatch = useDispatch();

    const model = useSelector((state) => state.mathModels[whatModel]);
    const chosenModelIndex = useSelector((state) => state.chosenModel.chosenModelIndex[whatModel]);

    const [availableModels1, setAvailableModels1] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedModelIndex, setSelectedModelIndex] = useState(null);

    const createdModels = useSelector((state) => state.createdModels[whatModel2]);

    const handleModelSelect = (model, index) => {
        setSelectedModelIndex(index);
        setSelectedModel(model);
    };

    const handleConfirmModel = (index) => {
        dispatch(setChosenModelIndex({ whatModel, index }));
        dispatch(setMathModelValue(createdModels[index]));
        setGoNext((prev) => new Set(prev).add(whatModel + selectedModel.formula));
    };

    const handleCreateModel = (selectedModelIndex) => {
        const { formula, type, r2, equation, xQ, yQ } = getModel(xValues, yValues, parameter, factor, selectedModelIndex);
        dispatch(setModel({ modelIndex: selectedModelIndex, whatModel: whatModel2, model: { formula, type, r2, equation, xQ, yQ } }));
    };

    useEffect(() => {
        if (!selectedModel?.formula && chosenModelIndex) {
            setSelectedModel(model);
            setSelectedModelIndex(chosenModelIndex);
            setAvailableModels1(getModels(xValues, yValues, parameter, factor));
        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid black" }}>

            <div style={{ display: "flex", height: "41vh" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        borderRight: "1px solid black",
                        paddingRight: "10px",
                        fontSize: "18px",
                    }}
                >
                    <div style={{ marginBottom: "10px" }}>Выберите тип модели из списка:</div>
                    {mathModels.map((el, index) => (
                        <div
                            key={el.id}
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor: chosenModelIndex == index ? "#21FF19" : selectedModelIndex == el.id ? "#e0e0e0" : "transparent",
                                whiteSpace: "nowrap",
                            }}
                            onClick={() => handleModelSelect(el, index)}
                        >
                            {el.id + 1}. {el.name}
                        </div>
                    ))}
                </div>

                {selectedModel?.formula ? (
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingLeft: "5px" }}>
                        {createdModels[selectedModelIndex]?.formula ? (
                            <div>
                                <div style={{ fontSize: "18px" }}>Созданная модель имеет вид:</div>
                                <div style={{ textAlign: "center", margin: "5px 0" }}>{createdModels[selectedModelIndex]?.formula}</div>
                                <div>
                                    <div style={{ fontSize: "18px", display: "inline" }}>Её коэффициент детерминации:</div> R<sup>2</sup> = {createdModels[selectedModelIndex]?.r2}
                                </div>
                                {createdModels[selectedModelIndex]?.formula ? (
                                    <div>
                                        <div>
                                            <button
                                                disabled={chosenModelIndex == selectedModelIndex}
                                                style={{ padding: "8px 12px", cursor: "pointer", margin: "15px 0 15px 40%", marginLeft: "40%" }}
                                                onClick={() => handleConfirmModel(selectedModelIndex)}
                                            >
                                                Подтвердить выбор
                                            </button>
                                        </div>
                                        <div style={{ fontSize: "18px", textAlign: "justify" }}>
                                            Коэффициент детерминации R<sup>2</sup> (R-квадрат) является статистической мерой, с помощью которой можно определить, насколько модель
                                            соответствует данным, на которых она построена. Чем ближе R<sup>2</sup> к единице, тем модель точнее. Коэффициент детерминации
                                            изменяется в диапазоне от −∞ до 1. Рекомендуется использовать модель со значением R<sup>2</sup> ≥ 0,85.
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <>
                                <p>
                                    {selectedModel?.name} функция имеет вид: {selectedModel?.formula}
                                </p>
                                <div style={{ marginLeft: "40%" }}>
                                    <button style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => handleCreateModel(selectedModelIndex)}>
                                        Создать модель
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default memo(MathModel);
