import { useDispatch, useSelector } from "react-redux";
import { Table } from "../components/Table";
import { findBestModel } from "../helpers/findBestModel";
import { functionModels } from "../helpers/functionModels";
import recalcModel from "../helpers/recalcModel";
import roundNum from "../helpers/roundNum";
import calcForecastError from "../helpers/calcForecastError";
import MyInput from "../components/UI/MyInput";
import { useCallback, useMemo, useState } from "react";
import MyButton from "../components/UI/MyButton";
import { MdCancel } from "react-icons/md";
import { setErrors } from "../redux/slices/forecastErrorsSlice";
import { ForecastErrorTable } from "../components/ForecastErorrTable/ForecastErrorTable";

export default function Forecast() {
    const [tValues, setTValues] = useState([12000, 15000, 18000, 21000]);
    const [tValuesInTable, setTValuesInTable] = useState([]);

    const dispatch = useDispatch();

    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const controlParamData = useSelector((state) => state.paramData.control);
    const factorValues = useSelector((state) => state.factorData.values);
    const forecastErrors = useSelector((state) => state.forecastErrors.errors);

    let controlWorkTimeParamData = controlParamData.map((row) => row[1]);
    let controlFactorParamData = controlParamData.map((row) => row[0]);

    let trulyYValues = useMemo(() => {
        return tValues.map((t) => {
            return controlWorkTimeParamData
                .map((row) => {
                    const rowModel = findBestModel(workTimeValues, row);
                    return functionModels[rowModel.type](...rowModel.equation, t);
                })
                .map((el) => roundNum(el));
        });
    }, [tValues, workTimeValues, controlWorkTimeParamData]);

    let forecastValues = useMemo(() => {
        return tValues.map((t) =>
            controlFactorParamData
                .map((row, index) => {
                    const rowRecalcModel = recalcModel(workTimeValues, controlWorkTimeParamData[index], factorValues, row);
                    const immitationFactor = functionModels[rowRecalcModel.type](...rowRecalcModel.equation, t);
                    const rowModel = findBestModel(factorValues, row);

                    return functionModels[rowModel.type](...rowModel.equation, immitationFactor);
                })
                .map((el) => roundNum(el))
        );
    }, [tValues, controlFactorParamData, workTimeValues, factorValues]);

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
        let errors = forecastValues.map((el, index) => {
            return roundNum(calcForecastError(el, trulyYValues[index]));
        });
        console.log(errors);
        setTValuesInTable(tValues);
        dispatch(setErrors(errors));
    }, [forecastValues, trulyYValues, tValues]);

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
                <div style={{ height: "60vh", overflow: "auto", paddingTop: "15px", paddingBottom: "50px"}}>
                    {tValues.map((value, index) => {
                        return (
                            <div key={`forecastErrorValue ${index}`} style={{ display: "flex", alignItems: "center", height: "20px", marginBottom: "25px", marginLeft: "30px"}}>
                                <h2>t = </h2>
                                {/* <MyInput value={value} onChange={(e) => handleTValueChange(e.target.value, index)} /> */}
                                <input style={{ textAlign: "end", height: "25px", fontSize: "20px", width: "150px", marginLeft: "5px" }} value={value} onChange={(e) => handleTValueChange(e.target.value, index)} />
                                <MdCancel onClick={() => handleDeleteCheck(index)} style={{ marginLeft: "10px", height: "20px", width: "20px" }} />
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "absolute", bottom: 20 }}>
                    <MyButton text={"Добавить проверку"} onClick={handleAddCheck} />
                    <MyButton text={"Подсчет ошибки прогнозирования"} onClick={handleCalcError} />
                </div>
            </div>
            <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {tValuesInTable.length && forecastErrors?.length ? (
                    <div>
                        <div>
                            <ForecastErrorTable
                                averages={forecastErrors.map((value) => value * 100 + "%")}
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
