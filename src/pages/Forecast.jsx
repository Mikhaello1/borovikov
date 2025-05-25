import { useDispatch, useSelector } from "react-redux";

import { getModel } from "../helpers/findBestModel";

import roundNum from "../helpers/roundNum";

import { useCallback, useMemo, useState } from "react";
import MyButton from "../components/UI/MyButton";
import { MdCancel } from "react-icons/md";
import { setErrors } from "../redux/slices/forecastErrorsSlice";
import { ForecastErrorTable } from "../components/ForecastErorrTable/ForecastErrorTable";

import createRecalcModel from "../helpers/recalcModel";

export default function Forecast() {
    const [tValues, setTValues] = useState([12000, 15000, 18000, 21000]);
    const [tValuesInTable, setTValuesInTable] = useState([]);

    const dispatch = useDispatch();

    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const controlParamData = useSelector((state) => state.paramData.control);
    const factorValues = useSelector((state) => state.factorData.values);
    const forecastErrors = useSelector((state) => state.forecastErrors.errors);
    const factor = useSelector((state) => state.quantities.factor);
    const parameter = useSelector((state) => state.quantities.parameter);
    const factorChosenModelIndex = useSelector((state) => state.chosenModel.chosenModelIndex.factorMathModel);
    const workTimeChosenModelIndex = useSelector((state) => state.chosenModel.chosenModelIndex.workTimeMathModel);

    let controlWorkTimeParamData = controlParamData.map((row) => row[1]);
    let controlFactorParamData = controlParamData.map((row) => row[0]);

    const oneTV = useCallback(
        (t, i) => {
            const rowModel = getModel(workTimeValues, controlWorkTimeParamData[i], parameter, "t", workTimeChosenModelIndex);

            return rowModel.calcValue(t);
        },
        [workTimeValues, controlWorkTimeParamData, parameter, workTimeChosenModelIndex]
    );

    const oneFV = useCallback(
        (t, i) => {
            const rowModel = getModel(factorValues, controlFactorParamData[i], parameter, factor, factorChosenModelIndex);

            const rowRecalcModel = createRecalcModel(rowModel, getModel(workTimeValues, controlWorkTimeParamData[i], parameter, "t", workTimeChosenModelIndex));

            const imitationFactor = rowRecalcModel.calcValue(t);

            return rowModel.calcValue(imitationFactor);
        },
        [factorValues, controlFactorParamData, parameter, factor, factorChosenModelIndex, workTimeValues, workTimeChosenModelIndex]
    );

    const handleTValueChange = useCallback(
        (value, index) => {
            let newValue = value;
            newValue ||= 1;
            let newTValues = [...tValues];
            newTValues[index] = +newValue;
            setTValues(newTValues);
        },
        [tValues]
    );

    const handleAddCheck = () => {
        setTValues((prev) => [...prev, 0]);
    };

    const handleDeleteCheck = (index) => {
        setTValues((prevValues) => prevValues.filter((_, i) => i !== index));
    };

    const handleCalcError = useCallback(() => {
        const fen = tValues.map((t) => {
            let sum = 0;
            for (let i = 0; i < controlFactorParamData.length; i++) {
                sum += Math.pow((oneFV(t, i) - oneTV(t, i)) / oneTV(t, i), 2);
            }
            return (1 / controlFactorParamData.length) * sum;
        });

        console.log(fen);

        setTValuesInTable(tValues);
        dispatch(setErrors(fen));
    }, [controlFactorParamData, tValues, tValuesInTable]);

    let satisfyCondition = useMemo(() => {
        if (forecastErrors) {
            for (let el of forecastErrors) {
                if (Number(el) <= 3) {
                    return false;
                }
            }
        }
        return true;
    }, [forecastErrors]);

    return (
        <div style={{ display: "flex", height: "90vh" }}>
            <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid black", padding: "0 10px" }}>
                <h3>При каких значениях t провести проверку?</h3>
                <div style={{ height: "60vh", overflow: "auto", paddingTop: "15px", paddingBottom: "50px" }}>
                    {tValues.map((value, index) => {
                        return (
                            <div key={`forecastErrorValue ${index}`} style={{ display: "flex", alignItems: "center", height: "20px", marginBottom: "25px", marginLeft: "30px" }}>
                                <h2>t = </h2>

                                <input
                                    style={{ textAlign: "end", height: "25px", fontSize: "20px", width: "150px", marginLeft: "5px" }}
                                    value={value}
                                    onChange={(e) => handleTValueChange(e.target.value, index)}
                                />
                                <MdCancel onClick={() => handleDeleteCheck(index)} style={{ marginLeft: "10px", height: "20px", width: "20px" }} />
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "absolute", bottom: 20 }}>
                    <MyButton text={"Добавить t для проверки"} onClick={handleAddCheck} />
                    <MyButton text={"Подсчет ошибки прогнозирования"} onClick={handleCalcError} />
                </div>
            </div>
            <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {tValuesInTable?.length && forecastErrors?.length ? (
                    <div>
                        <div>
                            <ForecastErrorTable
                                averages={forecastErrors.map((value) => roundNum(value * 100) + "%")}
                                columnNames={["t, ч", "Δ"]}
                                factorData={tValuesInTable}
                                condition={(x) => Number(x.slice(0, x.length - 1)) <= 10}
                            />
                        </div>
                        {!satisfyCondition ? (
                            <div style={{ marginTop: "10px" }}>
                                <MyButton text={"Ввести другие данные"} onClick={() => location.reload(true)} />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <p>Нажмите "Подсчет ошибки прогнозирования"</p>
                )}
            </div>
        </div>
    );
}
