import { useMemo, useState } from "react";
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
import EditTableModal from "../components/modal/editTableModal";
import Modal from "../components/modal/Modal";
import { setIsEditTableModalOpen } from "../redux/slices/modalsSlice";

export default function ImportedDataTable() {
    const dispatch = useDispatch();

    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const educParamData = useSelector((state) => state.paramData.educ);
    const controlParamData = useSelector((state) => state.paramData.control);
    const paramData = useSelector((state) => state.paramData);
    const isEditTableModalOpen = useSelector((state) => state.modals.isEditTableModalOpen);
    const factor = useSelector(state => state.quantities.factor);
    const parameter = useSelector(state => state.quantities.paramter);

    let navigate = useNavigate();

    const handleCloseModal = () => {
        dispatch(setIsEditTableModalOpen(false))
    };
    const handleOpenModal = () => {
        dispatch(setIsEditTableModalOpen(true))
    }

    const isDataValid = useMemo(() => {
        return importDataChecker(educParamData, controlParamData, currencyData, workTimeData);
    }, [educParamData, controlParamData, currencyData, workTimeData]);

    console.log(isDataValid);

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

    return (
        <div style={{ position: "relative" }} className={styles.importPage}>
            {educParamData?.length ? (
                <div className={styles.ImportedDataTable}>

                    <Modal isOpen={isEditTableModalOpen} onClose={handleCloseModal}>
                        <EditTableModal />
                    </Modal>

                    <MyButton 
                        style={{margin: "10px 10px 10px"}}
                        onClick={handleOpenModal}    
                    >
                        Редактировать таблицу
                    </MyButton>
                    
                    <ExcelImporter/>

                    <table style={{ borderCollapse: "collapse", border: "1px solid black", width: "100vw", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <td rowSpan={2} style={styles.td}>
                                    {parameter || "??"}
                                </td>
                                <td colSpan={currencyData.length}>{factor || "??"}</td>
                                <td colSpan={workTimeData.length}>t</td>
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
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                    >
                        <MyButton onClick={handleGetAvgValues} text={"Получить таблицу средних значений"} disabled={!isDataValid} />
                    </div>
                </div>
            ) : (
                <div className={styles.inputData}>
                    <div
                        style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                        }}
                    >
                        Ввод данных
                    </div>

                    <img className={styles.tableFormatImg} src="tableFormat.jpg" alt="формат таблицы" />

                    <div>
                        <ExcelImporter />
                    </div>
                    <div>ИЛИ</div>
                    <div>
                        <MyButton onClick={handleHandInput} disabled={educParamData.length}>
                            Ручной ввод
                        </MyButton>
                    </div>
                </div>
            )}
        </div>
    );
}
