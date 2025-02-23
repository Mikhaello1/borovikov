import { useSelector } from "react-redux";
import { Table } from "../components/Table";
import { findBestModel } from "../helpers/findBestModel";
import { functionModels } from "../helpers/functionModels";
import recalcModel from "../helpers/recalcModel";
import roundNum from "../helpers/roundNum";
import calcForecastError from "../helpers/calcForecastError";

export default function Forecast() {
    const t = 150;

    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const controlParamData = useSelector((state) => state.paramData.control);
    const factorValues = useSelector((state) => state.factorData.values);

    let controlWorkTimeParamData = controlParamData.map((row) => row[1]);
    let controlFactorParamData = controlParamData.map((row) => row[0]);

    let trulyYValues = controlWorkTimeParamData.map((row) => {
        const rowModel = findBestModel(workTimeValues, row);
        return functionModels[rowModel.type](...rowModel.equation, t);
    }).map(el => roundNum(el));

    let forecastValues = controlFactorParamData.map((row, index) => {
        const rowRecalcModel = recalcModel(workTimeValues, controlWorkTimeParamData[index], factorValues, row);
        const immitationFactor = functionModels[rowRecalcModel.type](...rowRecalcModel.equation, t);
        console.log(immitationFactor)
        const rowModel = findBestModel(factorValues, row);

        console.log(rowModel)

        return functionModels[rowModel.type](...rowModel.equation, immitationFactor);
    }).map(el => roundNum(el));

    console.log(forecastValues, trulyYValues)

    console.log(calcForecastError(forecastValues, trulyYValues))

    return (
        <div>
            <Table 
                averages={trulyYValues} 
                factorName={"Прогнозное значение параметра"} 
                factorData={forecastValues} 
                numColumnAmount={forecastValues.length} />
        </div>
    );
}
