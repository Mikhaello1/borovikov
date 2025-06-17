import { useMemo } from "react";
import styles from "../styles/ImportedDataTable.module.css";
import MyInput from "../components/UI/MyInput";
import { useSelector, useDispatch } from "react-redux";
import { updateFactorValue } from "../redux/slices/importedDataSlices/factorValuesSlice";
import { updateWorkTimeValue } from "../redux/slices/importedDataSlices/workTimeValuesSlice";
import { updateEducParamValue } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { updateControlParamValue } from "../redux/slices/importedDataSlices/paramValuesSlice";
import { setFactorPoints } from "../redux/slices/importedDataSlices/factorValuesSlice";
import { setWorkTimePoints } from "../redux/slices/importedDataSlices/workTimeValuesSlice";
import { setParamData } from "../redux/slices/importedDataSlices/paramValuesSlice";

import ExcelImporter from "../components/ExcelImport";
import { useNavigate } from "react-router";
import MyButton from "../components/UI/MyButton";

import { importDataChecker } from "../helpers/importDataChecker";
import EditTableModal from "../components/modal/EditTableModal";
import Modal from "../components/modal/Modal";
import { setIsEditTableModalOpen } from "../redux/slices/modalsSlice";
import StepBar from "../components/UI/StepBar";
import { clearAll } from "../redux/slices/createdModelsSlice";
import { clearModelsIndexes } from "../redux/slices/chosenModelSlice";
import { clearAllMathModels } from "../redux/slices/mathModelsSlice";
import { clearRoutes } from "../redux/slices/routesSlice";

export default function ImportedDataTable() {
    const dispatch = useDispatch();

    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const educParamData = useSelector((state) => state.paramData.educ);
    const controlParamData = useSelector((state) => state.paramData.control);
    const paramData = useSelector((state) => state.paramData);
    const isEditTableModalOpen = useSelector((state) => state.modals.isEditTableModalOpen);
    const factor = useSelector((state) => state.quantities.factor);
    const parameter = useSelector((state) => state.quantities.parameter);
    const factorEI = useSelector((state) => state.quantities.factorEI);
    const parameterEI = useSelector((state) => state.quantities.parameterEI);

    let navigate = useNavigate();

    const handleCloseModal = () => {
        dispatch(setIsEditTableModalOpen(false));
    };
    const handleOpenModal = () => {
        dispatch(setIsEditTableModalOpen(true));
    };

    const isDataValid = useMemo(() => {
        return importDataChecker(educParamData, controlParamData, currencyData, workTimeData);
    }, [educParamData, controlParamData, currencyData, workTimeData]);

    const handleHandInput = () => {
        let newArr = [];
        newArr = new Array(3).fill(null).map(() => [new Array(3).fill(0), new Array(3).fill(0)]);
        dispatch(setParamData({ educ: newArr, control: newArr }));
        dispatch(clearAll())
        dispatch(clearModelsIndexes())
        dispatch(setFactorPoints(3));
        dispatch(clearAllMathModels())
        dispatch(clearRoutes())
        dispatch(clearModelsIndexes())
        dispatch(setWorkTimePoints(3));
    };

    const handleInputChange = (e, setValue, index, indexInArr) => {
        let newValue = e.currentTarget.value; // Просто получаем значение
        dispatch(clearAll())
        dispatch(clearAllMathModels())
        dispatch(clearRoutes())
        dispatch(clearModelsIndexes())
        if (newValue.startsWith("0") && newValue.length > 1 && !isNaN(parseInt(newValue.substring(1)))) {
            newValue = newValue.substring(1);
        }

        if (indexInArr !== undefined) dispatch(setValue({ value: parseFloat(newValue), rowIndex: index[0], columnIndex: index[1], indexInArr }));
        else dispatch(setValue({ value: newValue, index }));
    };

    return (
        <div style={{ position: "relative" }} className={styles.importPage}>
            {educParamData?.length ? (
                <div className={styles.ImportedDataTable}>
                    <StepBar nextRoute={"/avgValues"} nextDisabled={!factor || !parameter} backRoute={"/"}/>
                    <Modal isOpen={isEditTableModalOpen} onClose={handleCloseModal}>
                        <EditTableModal />
                    </Modal>

                    <MyButton style={{ margin: "10px 10px 10px" }} onClick={handleOpenModal}>
                        Редактировать таблицу
                    </MyButton>

                    <ExcelImporter isHidden={false}/>

                    <table style={{ borderCollapse: "collapse", border: "1px solid black", width: "100vw", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <td rowSpan={2} style={styles.td}>
                                    {`Значения параметра ${parameter || "??"}`} {parameterEI ? `, ${parameterEI}` : null}
                                    <br />
                                    для экземпляров объединённой
                                    <br /> выборки
                                </td>

                                <td colSpan={currencyData.length}>{factor || "??"}{factorEI ? `, ${factorEI}` : null}</td>
                                <td colSpan={workTimeData.length}>t, ч</td>
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
                                <td colSpan={1000}>Экземпляры обучающей выборки</td>
                            </tr>
                            {educParamData.map((row, rowIndex) => (
                                <tr key={`param-row-${rowIndex}`}>
                                    <td>
                                        Значение параметра {parameter} <br /> для {rowIndex + 1}-го экземпляра
                                    </td>
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
                                        <td colSpan={1000}>Экземпляры контрольной выборки</td>
                                    </tr>
                                    {controlParamData.map((row, rowIndex) => {
                                        return (
                                            <tr key={`control-param-row-${rowIndex}`}>
                                                <td>
                                                    Значение параметра {parameter} <br /> для {rowIndex + 1}-го экземпляра
                                                </td>
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
                            top: 10,
                            right: 10,
                        }}
                    >
                        {/* <MyButton onClick={handleGetAvgValues} text={"Получить таблицу средних значений"} disabled={!isDataValid} /> */}
                    </div>
                </div>
            ) : (
                <div className={styles.inputData}>
                    <div
                        style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            marginBottom: "20px"
                        }}
                    >
                        Введите данные
                    </div>

                    
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div>
                            <ExcelImporter isHidden={true}/>
                        </div>
                        <div>ИЛИ</div>
                        <div style={{marginLeft: "50px"}}>
                            <MyButton onClick={handleHandInput} disabled={educParamData.length} style={{fontSize: "26px"}}>
                                Ручной ввод
                            </MyButton>
                        </div>
                    </div>
                    <div style={{fontSize: "20px", marginTop: "20px"}}>
                        При выборе файла excel необходимо, чтобы таблица была ниже приведенного формата, иначе она будет обработана неправильно
                    </div>
                    <img className={styles.tableFormatImg} src="tableFormat.jpg" alt="формат таблицы" />
                </div>
            )}
        </div>
    );
}
