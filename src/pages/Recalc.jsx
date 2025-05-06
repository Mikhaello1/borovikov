import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/UI/MyButton";
import { setRecalcMathModel } from "../redux/slices/mathModelsSlice";
import recalcModel from "../helpers/recalcModel";
import recalcValues from "../helpers/recalcValues";
import { Table } from "../components/Table";
import { setRecalcedValues } from "../redux/slices/recalcedValuesSlice";
import { ScatterPlot } from "../components/Graphic";
import { setForecastRouteAvailable } from "../redux/slices/routesSlice";
import { useNavigate } from "react-router";

export default function Recalc() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recalcMathModel = useSelector((state) => state.mathModels.recalcMathModel);
    const factorMathModel = useSelector((state) => state.mathModels.factorMathModel);
    const workTimeAverages = useSelector((state) => state.avgValuesData.workTimeAverages);
    const factorAverages = useSelector((state) => state.avgValuesData.factorAverages);
    const { recalcedFactorValues, recalcedYParamValues } = useSelector((state) => state.recalcedValues);
    const workTimeValues = useSelector((state) => state.workTimeData.values);
    const factorValues = useSelector((state) => state.factorData.values);
    const factor = useSelector((state) => state.quantities.factor);
    const parameter = useSelector((state) => state.quantities.parameter);
    

    const handleGetRecalcModel = () => {
        dispatch(setRecalcMathModel(recalcModel(workTimeValues, workTimeAverages, factorValues, factorAverages)));
    };

    const handleGetRecalcValues = () => {
        dispatch(setRecalcedValues(recalcValues(workTimeValues, recalcMathModel, factorMathModel)));
        dispatch(setForecastRouteAvailable(true));
    };

    return (
        <div style={{position: 'relative'}}> 
            <div style={{display: 'flex', alignItems: "center", marginBottom: '10px'}}>
                <MyButton text={"Получить модель пересчёта"} onClick={handleGetRecalcModel} />

                <div style={{fontSize: '20px', marginLeft: '10px'}}>{recalcMathModel.formula}</div>
            </div>

            <MyButton text={"Получить значения пересчёта"} onClick={handleGetRecalcValues} />

            {recalcedYParamValues.length ? (
                <>
                    <h3>Значения пересчёта:</h3>
                    <div style={{display: 'flex'}}>
                        <Table averages={recalcedYParamValues} columnNames={[`${factor}им`, parameter]} factorData={recalcedFactorValues} />
                        <ScatterPlot xData={recalcedFactorValues} yData={recalcedYParamValues} style={{ height: "250px", width: "500px" }} axisNames={["Iим", "U"]} />
                    </div>
                </>
            ) : null}

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            >
                <MyButton text={'Нахождение ошибки прогнозирования'} onClick={() => navigate('/forecast')} disabled={!recalcedYParamValues.length}/>
            </div>
        </div>
    );
}
