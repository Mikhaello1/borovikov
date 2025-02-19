import { useDispatch } from "react-redux";
import { setFactorData } from "../redux/slices/importedDataSlices/factorValuesSlice.js";
import { setWorkTimeData } from "../redux/slices/importedDataSlices/workTimeValuesSlice.js";
import { setParamData } from "../redux/slices/importedDataSlices/paramValuesSlice.js";
import * as XLSX from "xlsx";

const ExcelImporter = () => {
    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const { currencyData, workTimeData, paramData } = processTableData(jsonData);


            currencyData.length && dispatch(setFactorData(currencyData));
            workTimeData.length && dispatch(setWorkTimeData(workTimeData));

            
            
            if (paramData.educ.length) {
                
                dispatch(
                    setParamData({
                        educ: paramData.educ,
                        control: []
                    })
                );
            }
            if (paramData.control.length) {
                dispatch(
                    setParamData({
                        educ: paramData.educ,
                        control: paramData.control,

                    })
                );
            }
        };

        reader.readAsBinaryString(file);
    };

    function defineNumOfPoints(headRow, paramsRow) {
        let points = {
            factorPoints: 0,
            workTimePoints: 0,
        };
        for (let i = 2; i < headRow.length; i++) {
            if (headRow[i]) {
                points.factorPoints = i - 1;
                
                break;
            }
        }
        points.workTimePoints = paramsRow.length - 1 - points.factorPoints;

        return points;
    }

    function defineEndOfYValues(arr) {
        for (let i = 3; i < arr.length; i++) {
            if (arr[i].length === 1) {
                return i;
            }
        }
    }

    function transformParamData(jsonData, endOfEducValues, points) {
        let educ = [];
        let control = [];
        let rowIndex = 0;

        // Обработка образовательных параметров
        for (let i = 3; i < jsonData.length; i++) {
            if (i === endOfEducValues) break;
            educ[rowIndex] = []; // Инициализация нового ряда
            for (let j = 1; j < jsonData[i].length; j++) {
                educ[rowIndex][j - 1] = jsonData[i][j]; // Заполнение значения
            }
            rowIndex++;
        }

        rowIndex = 0; // Сброс индекса для контрольных параметров

        // Обработка контрольных параметров
        for (let i = endOfEducValues + 1; i < jsonData.length; i++) {
            control[rowIndex] = []; // Инициализация нового ряда
            for (let j = 1; j < jsonData[i].length; j++) {
                control[rowIndex][j - 1] = jsonData[i][j]; // Заполнение значения
            }
            rowIndex++;
        }

        let newEduc = educ.map(arr => [arr.slice(0, points.factorPoints), arr.slice(points.factorPoints, points.workTimePoints + points.factorPoints)])
        let newControl = control.map(arr => [arr.slice(0, points.factorPoints), arr.slice(points.factorPoints, points.workTimePoints + points.factorPoints)])

        return {
            educ: newEduc,
            control: newControl,
        };
    }

    const processTableData = (jsonData) => {
        let points = defineNumOfPoints(jsonData[0], jsonData[1]);
        let endOfEducValues = defineEndOfYValues(jsonData);
        let numOfYValues = endOfEducValues - 3;

        let currencyData = [];
        let workTimeData = [];
        let averages = [];

        for (let j = 1; j < jsonData[1].length; j++) {
            if (j <= points.factorPoints) {
                currencyData.push(jsonData[1][j]);
            } else {
                workTimeData.push(jsonData[1][j]);
            }
        }


        for (let i = 1; i < jsonData[1].length; i++) {
            let total = 0;

            for (let j = 3; j < endOfEducValues; j++) {
                total += jsonData[j][i];
            }
            averages.push((total / numOfYValues).toFixed(3));
        }

        

        let paramData = transformParamData(jsonData, endOfEducValues, points);

        return { currencyData, workTimeData, paramData };
    };

    return (
        <>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </>
    );
};

export default ExcelImporter;
