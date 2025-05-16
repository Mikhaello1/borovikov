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
        console.log(factor, parameter);
        dispatch(setRecalcMathModel(recalcModel(workTimeValues, workTimeAverages, factorValues, factorAverages, parameter, factor)));
    };

    const handleGetRecalcValues = () => {
        dispatch(setRecalcedValues(recalcValues(workTimeValues, recalcMathModel, factorMathModel)));
        dispatch(setForecastRouteAvailable(true));
    };

    return (
        <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", margin: "5px 0 10px 5px" }}>
                <MyButton text={"Получить модель пересчёта"} onClick={handleGetRecalcModel} />
            </div>

            <div style={{ marginLeft: "5px" }}>
                <MyButton text={"Получить значения пересчёта"} onClick={handleGetRecalcValues} />
            </div>
            <div style={{ marginLeft: "30%", marginTop: "5%" }}>
                {recalcMathModel.formula && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h3 style={{ maringBottom: "0" }}>Модель пересчёта:</h3>
                        <div style={{ fontSize: "20px", marginLeft: "10px" }}>{recalcMathModel.formula}</div>
                    </div>
                )}

                {recalcedYParamValues.length ? (
                    <>
                        <h3 style={{ marginTop: "0" }}>Значения пересчёта:</h3>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "20px" }}>
                                <Table averages={recalcedYParamValues} columnNames={[`${factor}им`, parameter]} factorData={recalcedFactorValues} />
                            </div>
                            <ScatterPlot xData={recalcedFactorValues} yData={recalcedYParamValues} style={{ height: "250px", width: "500px" }} axisNames={["Iим", "U"]} />
                        </div>
                    </>
                ) : null}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: 1,
                    right: 5,
                }}
            >
                <MyButton text={"Нахождение ошибки прогнозирования"} onClick={() => navigate("/forecast")} disabled={!recalcedYParamValues.length} />
            </div>
        </div>
    );
}
