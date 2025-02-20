import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/UI/MyButton";
import { setRecalcMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import recalcModel from "../helpers/recalcModel";
import { setRecalcedAverages } from "../redux/slices/avgValuesSlice";
import recalcValues from "../helpers/recalcValues";
import AvgValuesTable from "./AvgValuesTable";
import { Table } from "../components/Table";
import { setRecalcedValues } from "../redux/slices/recalcedValuesSlice";
import { findBestModel } from "../helpers/findBestModel";
import { functionModels } from "../helpers/functionModels";
import { ScatterPlot } from "../components/Graphic";

export default function Recalc(){

    const dispatch = useDispatch()
    const recalcMathModel = useSelector(state => state.mathModels.recalcMathModel)
    const factorMathModel = useSelector(state => state.mathModels.factorMathModel)
    const workTimeMathModel = useSelector(state => state.mathModels.workTimeMathModel)
    const workTimeAverages = useSelector(state => state.avgValuesData.workTimeAverages)
    const factorAverages = useSelector(state => state.avgValuesData.factorAverages)
    const { recalcedFactorValues, recalcedYParamValues } = useSelector(state => state.recalcedValues)
    const workTimeValues = useSelector(state => state.workTimeData.values)
    const factorValues = useSelector(state => state.factorData.values)

    const handleGetRecalcModel = () => {
        dispatch(setRecalcMathModel(recalcModel(workTimeValues, workTimeAverages, factorValues, factorAverages)))
    }

    const handleGetRecalcValues = () => {
        dispatch(setRecalcedValues(recalcValues(workTimeValues, recalcMathModel, factorMathModel)))
    }


    return(

        <div>
            <MyButton
                text={"Получить модель пересчёта"}
                onClick={handleGetRecalcModel}/>

            <div>{recalcMathModel.formula}</div>

            

            <MyButton
                text={"Получить значения пересчёта"}
                onClick={handleGetRecalcValues}/>
            <h3>Значения пересчёта:</h3>
            {recalcedYParamValues.length ? <Table averages={recalcedYParamValues} factorName={'I'} factorData={recalcedFactorValues}/> : null}

            <ScatterPlot xData={recalcedFactorValues} yData={recalcedYParamValues} style={{height: "300px"}}/>
            
        </div>
    )
}