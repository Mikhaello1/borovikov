import { useDispatch, useSelector } from "react-redux";
import StepBar from "../components/UI/StepBar"
import createRecalcModel from "../helpers/recalcModel.js"
import { setRecalcMathModel } from "../redux/slices/mathModelsSlice";
import { useEffect } from "react";
import getExpressionAfterEquals from "../helpers/getExpAfterEquals.js";
import { setForecastRouteAvailable } from "../redux/slices/routesSlice.js";

const Recalc = () => {

    function simplifyEquation(equationString, parameter, factor) {
        if(!equationString || !parameter || !factor) return null
        let simplifiedString = equationString.replace(/\+ -/g, '-');
        simplifiedString = simplifiedString.replace(/y/g, parameter);
        simplifiedString = simplifiedString.replace(/x/g, factor);
        return simplifiedString;
    }

    const dispatch = useDispatch();

    const factor = useSelector(state => state.quantities.factor)
    const parameter = useSelector(state => state.quantities.parameter)
    const factorMathModel = useSelector(state => state.mathModels.factorMathModel)
    const workTimeMathModel = useSelector(state => state.mathModels.workTimeMathModel)
    const recalcMathModel = useSelector(state => state.mathModels.recalcMathModel)

    useEffect(() => {
        dispatch(setRecalcMathModel(createRecalcModel(factorMathModel, workTimeMathModel)))
        dispatch(setForecastRouteAvailable(true))

    }, [factorMathModel, workTimeMathModel, factor])

    return (
        <div style={{fontSize: "22px"}}>
            <StepBar backRoute={"/avgValues"} nextRoute={"/forecast"}/>
            <div style={{margin: "10px"}}>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;Модель {parameter}({factor}):</div>
                
                <div style={{textAlign: "center", margin: "10px", fontSize: "24px"}}>{factorMathModel?.formula},&nbsp;&nbsp;(1)</div>
                
                <div>&nbsp;&nbsp;&nbsp;&nbsp;Модель {parameter}(t):</div>
                <div style={{textAlign: "center", margin: "10px", fontSize: "24px"}}>{workTimeMathModel?.formula},&nbsp;&nbsp;(2)</div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Для нахождения функции пересчёта (имитационной модели) {factor}<sub>им</sub> = f(t) необходимо приравнять друг к другу полученные с ипользованием обучающей выборки математические выражения, а затем решить полученное уравнение: {parameter}({factor}) = {parameter}(t) и выразить {factor} от t.</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Имитационная модель для найденных ранее математических выражений (1), (2) из средних значений параметра {parameter} в зависимости от {factor} и t: </p>
                <div style={{textAlign: "center", fontSize: "24px"}}>{factor}<sub>им</sub>(t) = {typeof recalcMathModel?.getFormula == "function" ? getExpressionAfterEquals(simplifyEquation(recalcMathModel?.getFormula(), recalcMathModel.yQ, recalcMathModel.xQ)) : "idi nahuy"}</div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Имитационная модель используется для расчёта имитационного значения фактора, которое вызывает примерно такое же изменение параметра, как и заданная наработка t.</p>
            </div>
        </div>
    )

}

export default Recalc;

