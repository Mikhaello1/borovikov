import { useSelector } from "react-redux";
import { Table } from "../components/Table";
import { findBestModel } from "../helpers/findBestModel";
import { functionModels } from "../helpers/functionModels";
import recalcModel from "../helpers/recalcModel";

export default function Forecast() {
    const t = 13000;

    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const controlParamData = useSelector((state) => state.paramData.control);
    const recalcMathModel = useSelector((state) => state.mathModels.recalcMathModel);
    const factorValues = useSelector((state) => state.factorData.values);

    let controlWorkTimeParamData = controlParamData.map((row) => row[1]);
    let controlFactorParamData = controlParamData.map((row) => row[0]);

    let trulyYValues = controlWorkTimeParamData.map((row) => {
        const rowModel = findBestModel(workTimeValues, row);
        return functionModels[rowModel.type](...rowModel.equation, t);
    });

    let forecastValues = controlFactorParamData.map((row, index) => {
        console.log(row)
        
        const rowModel = recalcModel(workTimeValues, controlWorkTimeParamData[index], factorValues, row);
        return functionModels[rowModel.type](...rowModel.equation, t);
    });

    console.log(trulyYValues)
    console.log(forecastValues);

    return <div>{/* <Table /> */}</div>;
}
