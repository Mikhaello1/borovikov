import { memo, useEffect, useState } from "react";
import styles from "../styles/AvgValuesTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFactorMathModel, setWorkTimeMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import { Table } from "../components/Table";
import { ScatterPlot } from "../components/Graphic";
import roundNum from "../helpers/roundNum";
import { setRecalcRouteAvailable } from "../redux/slices/routesSlice";
import MyButton from "../components/UI/MyButton";
import { useNavigate } from "react-router";

function AvgValuesTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [goNext, setGoNext] = useState(new Set([]));

    const avgFactorValues = useSelector((state) => state.avgValuesData.factorAverages);
    const avgWorkTimeValues = useSelector((state) => state.avgValuesData.workTimeAverages);
    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const factorMathModel = useSelector((state) => state.mathModels.factorMathModel)
    const workTimeMathModel = useSelector((state) => state.mathModels.workTimeMathModel)

    useEffect(() => {
        if (goNext.size >= 2) dispatch(setRecalcRouteAvailable(true));
        console.log(goNext);
    }, [goNext]);

    return (
        <div className={styles.avgValuesMain} style={{ position: "relative" }}>
            <div>Средние значения обучающей выборки:</div>
            {avgFactorValues.length ? (
                <div style={{ display: "flex" }}>
                    <div>
                        <Table averages={avgFactorValues.map((el) => roundNum(el))} columnNames={["Iк", "U"]} factorData={currencyData} setMathModelValue={setFactorMathModel} />
                        <MathModel xValues={currencyData} yValues={avgFactorValues} factorName={"ток коллектора"} setMathModelValue={setFactorMathModel} setGoNext={setGoNext} />
                    </div>

                    <ScatterPlot xData={currencyData} yData={avgFactorValues} style={{ height: "300px", width: "500px" }} axisNames={["Iк", "U"]} />
                </div>
            ) : null}

            {avgWorkTimeValues.length ? (
                <div style={{ display: "flex" }}>
                    <div>
                        <Table averages={avgWorkTimeValues.map((el) => roundNum(el))} columnNames={["t", "U"]} factorData={workTimeData} setMathModelValue={setWorkTimeMathModel} />

                        <MathModel xValues={workTimeData} yValues={avgWorkTimeValues} factorName={"наработка"} setMathModelValue={setWorkTimeMathModel} setGoNext={setGoNext} />
                    </div>
                    <ScatterPlot xData={workTimeData} yData={avgWorkTimeValues} style={{ width: "500px", height: "300px" }} axisNames={["t", "U"]} />
                </div>
            ) : null}

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            >
                <MyButton text={"Получить значения пересчёта"} onClick={() => navigate("/recalc")} disabled={!(factorMathModel.formula && workTimeMathModel.formula)} />
            </div>
        </div>
    );
}

export default memo(AvgValuesTable);
