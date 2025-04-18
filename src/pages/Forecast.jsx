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

export default function Forecast() {
    const [tValues, setTValues] = useState([1, 2, 34]);
    
    const dispatch = useDispatch()

    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const controlParamData = useSelector((state) => state.paramData.control);
    const factorValues = useSelector((state) => state.factorData.values);
    const forecastErrors = useSelector(state => state.forecastErrors.errors);

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
        dispatch(setErrors(errors))
        
    }, [forecastValues, trulyYValues]);

    let satisfyCondition = useMemo(() => {
        if(forecastErrors){
            for (let el of forecastErrors){
                if (el <= 10){
                    return false;
                }
            }
        }
        return true
    }, [forecastErrors])


    

    return (
        <div>
            <h2>При каких значениях t провести проверку?</h2>

            {tValues.map((value, index) => {
                return (
                    <div key={`forecastErrorValue ${index}`} style={{ display: "flex", alignItems: "center", height: "20px", margin: "20px" }}>
                        <h2>t = </h2>
                        <MyInput type={"number"} value={value} onChange={(e) => handleTValueChange(e.target.value, index)} style={{ marginLeft: "10px", width: "100px" }} />
                        <MdCancel onClick={() => handleDeleteCheck(index)} style={{ marginLeft: "10px", height: "20px", width: "20px" }} />
                    </div>
                );
            })}
            <MyButton text={"Добавить проверку"} onClick={handleAddCheck} />
            <MyButton text={"Подсчет ошибки прогнозирования"} onClick={handleCalcError} />
            {forecastErrors?.length ? 
                <>
                    <div style={{margin: "12px 0"}}>
                        <Table averages={forecastErrors.map((value) => value * 100 + "%")} columnNames={["t, ч", "ошибка"]} factorData={tValues} condition={(x) => Number(x.slice(0, x.length-1)) <= 10}/> 
                        
                    </div>
                    {!satisfyCondition ? <MyButton text={"Ввести другие данные"} onClick={() => location.reload(true)}/> : null}
                </>
            : null}
            
        </div>
    );
}
