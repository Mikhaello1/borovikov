import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/UI/MyButton";
import { setRecalcMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import recalcModel from "../helpers/recalcModel";
import { setRecalcedAverages } from "../redux/slices/avgValuesSlice";
import recalcValues from "../helpers/recalcValues";

export default function Recalc(){

    const dispatch = useDispatch()
    const recalcMathModel = useSelector(state => state.mathModels.recalcMathModel)
    const factorMathModel = useSelector(state => state.mathModels.factorMathModel)
    const workTimeMathModel = useSelector(state => state.mathModels.workTimeMathModel)
    const recalcedValues = useSelector(state => state.avgValuesData.recalcedAverages)
    const workTimeValues = useSelector(state => state.workTimeData.values)

    const handleGetRecalcModel = () => {
        
        dispatch(setRecalcMathModel(recalcModel(factorMathModel, workTimeMathModel)))
    }

    const handleGetRecalcValues = () => {

        

        dispatch(setRecalcedAverages(recalcValues(workTimeValues, recalcMathModel, factorMathModel)))
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

            
        </div>
    )
}