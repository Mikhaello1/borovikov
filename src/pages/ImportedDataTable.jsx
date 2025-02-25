import { useMemo } from "react";
import styles from "../styles/ImportedDataTable.module.css";
import MyInput from "../components/UI/MyInput";
import { useSelector, useDispatch } from "react-redux";
import { updateFactorValue } from "../redux/slices/importedDataSlices/factorValuesSlice";
import { updateWorkTimeValue } from "../redux/slices/importedDataSlices/workTimeValuesSlice";
import { updateEducParamValue } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { updateControlParamValue } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { setControlParamPoints, setEducParamPoints } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { setFactorPoints } from "../redux/slices/importedDataSlices/factorValuesSlice";
import { setWorkTimePoints } from "../redux/slices/importedDataSlices/workTimeValuesSlice";
import { setParamData } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { calcAverages } from "../helpers/calcAverages";
import { setFactorAverages, setWorkTimeAverages } from "../redux/slices/avgValuesSlice";
import ExcelImporter from "../components/ExcelImport";
import { useNavigate } from "react-router";
import MyButton from "../components/UI/MyButton";
import roundNum from "../helpers/roundNum";
import { setAvgRouteAvailable } from "../redux/slices/routesSlice";
import { importDataChecker } from "../helpers/importDataChecker";

export default function ImportedDataTable() {
    const dispatch = useDispatch();

    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const educParamData = useSelector((state) => state.paramData.educ);
    const controlParamData = useSelector((state) => state.paramData.control);
    const paramData = useSelector((state) => state.paramData);

    let navigate = useNavigate();

    const isDataValid = useMemo(() => {
        return importDataChecker(educParamData, controlParamData, currencyData, workTimeData);
    }, [educParamData, controlParamData, currencyData, workTimeData]);

    console.log(isDataValid)

    const handleHandInput = () => {
        let newArr = [];
        newArr = new Array(3).fill(null).map(() => [new Array(3).fill(0), new Array(3).fill(0)]);
        dispatch(setParamData({ educ: newArr, control: newArr }));

        dispatch(setFactorPoints(3));
        dispatch(setWorkTimePoints(3));
    };

    const handleInputChange = (e, setValue, index, indexInArr) => {
        let newValue = e.currentTarget.value || 0;

        if (indexInArr !== undefined) dispatch(setValue({ value: parseFloat(newValue), rowIndex: index[0], columnIndex: index[1], indexInArr }));
        else dispatch(setValue({ value: newValue, index }));
    };

    const handleChangeNumOfInstances = (value, setValue) => {
        let newValue = value;
        newValue ||= 1;
        dispatch(setValue({ newLength: newValue, numOfFactorPoints: currencyData.length, numOfWorkTimePoints: workTimeData.length }));
    };

    const handleChangeNumOfPoints = (value, setValue, indexInRow) => {
        let newValue = value;
        newValue ||= 1;

        let newEducParamData = educParamData.map((row, rowIndex) => {
            let newRow = [...row];

            if (Array.isArray(newRow[indexInRow])) {
                if (newRow[indexInRow].length > newValue) {
                    newRow[indexInRow] = newRow[indexInRow].slice(0, newValue);
                } else if (newRow[indexInRow].length < newValue) {
                    const currentLength = newRow[indexInRow].length;
                    newRow[indexInRow] = [...newRow[indexInRow], ...Array(newValue - currentLength).fill(0)];
                }
            } else {
                console.warn(`Элемент в строке ${rowIndex} по индексу ${indexInRow} не является массивом.`);
            }

            return newRow;
        });

        let newControlParamData = controlParamData.map((row, rowIndex) => {
            let newRow = [...row];

            if (Array.isArray(newRow[indexInRow])) {
                if (newRow[indexInRow].length > newValue) {
                    newRow[indexInRow] = newRow[indexInRow].slice(0, newValue);
                } else if (newRow[indexInRow].length < newValue) {
                    const currentLength = newRow[indexInRow].length;
                    newRow[indexInRow] = [...newRow[indexInRow], ...Array(newValue - currentLength).fill(0)];
                }
            } else {
                console.warn(`Элемент в контрольной строке ${rowIndex} по индексу ${indexInRow} не является массивом.`);
            }

            return newRow;
        });

        dispatch(
            setParamData({
                educ: newEducParamData,
                control: newControlParamData,
            })
        );

        dispatch(setValue(newValue));
    };

    const handleGetAvgValues = () => {
        // if(importDataChecker(paramData, currencyData, workTimeData))

        let averages = calcAverages(paramData);
        console.log(averages);
        averages.forEach((row) => {
            return row.map((el) => {
                return roundNum(el);
            });
        });
        console.log(1111);
        console.log(averages);

        dispatch(setFactorAverages(averages[0]));
        dispatch(setWorkTimeAverages(averages[1]));
        dispatch(setAvgRouteAvailable(true));

        navigate("/avgValues");
    };

    const handleControlSample = (event) => {
        const isChecked = event.target.checked;

        let newArr = [];
        console.log(isChecked);
        if (isChecked) {
            newArr = new Array(3).fill(null).map(() => [new Array(currencyData.length).fill(0), new Array(workTimeData.length).fill(0)]);
            dispatch(setParamData({ control: newArr }));
        } else {
            dispatch(setParamData({ control: [] }));
        }
    };

    return (
        <>
            <ExcelImporter />
            <button onClick={handleHandInput} disabled={educParamData.length}>
                Ручной ввод
            </button>
            {educParamData?.length ? (
                <div className={styles.ImportedDataTable}>
                    <input type="checkbox" checked={controlParamData.length > 0} onChange={(e) => handleControlSample(e)} />
                    наличие контрольной выборки
                    <br />
                    <div className={styles.inputSection}>
                        <div>
                            <span style={{ marginRight: "5px" }}>Экземпляров обучающей выборки</span>
                            <MyInput
                                type="number"
                                className={styles.pointsInput}
                                min={1}
                                value={educParamData.length}
                                onChange={(e) => handleChangeNumOfInstances(e.currentTarget.value, setEducParamPoints)}
                            />
                        </div>
                        <div>
                            <span style={{ marginRight: "5px" }}>Экземпляров контрольной выборки</span>
                            <MyInput
                                type="number"
                                className={styles.pointsInput}
                                min={1}
                                value={controlParamData.length}
                                onChange={(e) => handleChangeNumOfInstances(e.currentTarget.value, setControlParamPoints)}
                            />
                        </div>
                        <div>
                            <span style={{ marginRight: "5px" }}>Точки фактора</span>
                            <MyInput
                                type="number"
                                className={styles.pointsInput}
                                min={1}
                                value={currencyData.length}
                                onChange={(e) => handleChangeNumOfPoints(e.currentTarget.value, setFactorPoints, 0)}
                            />
                        </div>
                        <div>
                            <span style={{ marginRight: "5px" }}>Точки наработки</span>
                            <MyInput
                                type="number"
                                className={styles.pointsInput}
                                min={1}
                                value={workTimeData.length}
                                onChange={(e) => handleChangeNumOfPoints(e.currentTarget.value, setWorkTimePoints, 1)}
                            />
                        </div>
                    </div>
                    <table style={{ borderCollapse: "collapse", border: "1px solid black", width: "100vw", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <td rowSpan={2} style={styles.td}>
                                    Параметр Y
                                </td>
                                <td colSpan={currencyData.length}>ток коллектор</td>
                                <td colSpan={workTimeData.length}>наработка</td>
                            </tr>
                            <tr>
                                {currencyData.map((value, index) => (
                                    <td key={`currency-${index}`}>
                                        <MyInput className={styles.tableInput} type="number" value={value} onChange={(e) => handleInputChange(e, updateFactorValue, index)} />
                                    </td>
                                ))}
                                {workTimeData.map((value, index) => (
                                    <td key={`workTime-${index}`}>
                                        <MyInput className={styles.tableInput} type="number" value={value} onChange={(e) => handleInputChange(e, updateWorkTimeValue, index)} />
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={1000}>экземпляры обучающей выборки</td>
                            </tr>
                            {educParamData.map((row, rowIndex) => (
                                <tr key={`param-row-${rowIndex}`}>
                                    <td>параметр {rowIndex + 1}</td>
                                    {row[0].map((value, columnIndex) => (
                                        <td key={`param-column-${columnIndex}`}>
                                            <MyInput
                                                className={styles.tableInput}
                                                type="number"
                                                value={value}
                                                onChange={(e) => handleInputChange(e, updateEducParamValue, [rowIndex, columnIndex], 0)}
                                            />
                                        </td>
                                    ))}
                                    {row[1].map((value, columnIndex) => (
                                        <td key={`param-wtcolumn-${columnIndex}`}>
                                            <MyInput
                                                className={styles.tableInput}
                                                type="number"
                                                value={value}
                                                onChange={(e) => handleInputChange(e, updateEducParamValue, [rowIndex, columnIndex], 1)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {controlParamData.length > 0 ? (
                                <>
                                    <tr>
                                        <td colSpan={1000}>экземпляры контрольной выборки</td>
                                    </tr>
                                    {controlParamData.map((row, rowIndex) => {
                                        return (
                                            <tr key={`control-param-row-${rowIndex}`}>
                                                <td>параметр {rowIndex + 1}</td>
                                                {row[0].map((value, columnIndex) => (
                                                    <td key={`control-param-column-${columnIndex}`}>
                                                        <MyInput
                                                            className={styles.tableInput}
                                                            type="number"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(e, updateControlParamValue, [rowIndex, columnIndex], 0)}
                                                        />
                                                    </td>
                                                ))}
                                                {row[1].map((value, columnIndex) => (
                                                    <td key={`control-wtparam-column-${columnIndex}`}>
                                                        <MyInput
                                                            className={styles.tableInput}
                                                            type="number"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(e, updateControlParamValue, [rowIndex, columnIndex], 1)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : null}
                        </tbody>
                    </table>
                    <MyButton onClick={handleGetAvgValues} text={"Получить таблицу средних значений"} disabled={!isDataValid} />
                </div>
            ) : null}
        </>
    );
}
