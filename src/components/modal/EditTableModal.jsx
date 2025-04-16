import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/EditTableModal.module.css";
import MyInput from "../UI/MyInput";
import { setFactorQuantity, setParameterQuantity } from "../../redux/slices/importedDataSlices/quantitiesSlice";

export default function EditTableModal() {
    const dispatch = useDispatch();

    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const educParamData = useSelector((state) => state.paramData.educ);
    const controlParamData = useSelector((state) => state.paramData.control);
    const factor = useSelector((state) => state.quantities.factor);
    const parameter = useSelector((state) => state.quantities.parameter);

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

    return (
        <div>
            <div className={styles.inputSection}>
                <div>
                    <span style={{ marginRight: "5px" }}>Фактор</span>
                    <MyInput className={styles.pointsInput} value={factor} onChange={(e) => dispatch(setFactorQuantity(e.target.value))} />
                </div>
                <div>
                    <span style={{ marginRight: "5px" }}>Параметр</span>
                    <MyInput className={styles.pointsInput} value={parameter} onChange={(e) => dispatch(setParameterQuantity(e.target.value))} />
                </div>
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
                <div>
                    <br />
                    <input type="checkbox" checked={controlParamData.length > 0} onChange={(e) => handleControlSample(e)} />
                    Наличие контрольной выборки
                </div>
            </div>
        </div>
    );
}
