import React, { memo, useEffect, useState } from "react";
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
import { findBestModel, getModels } from "../helpers/findBestModel";

function AvgValuesTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [goNext, setGoNext] = useState(new Set([]));

    const avgFactorValues = useSelector((state) => state.avgValuesData.factorAverages);
    const avgWorkTimeValues = useSelector((state) => state.avgValuesData.workTimeAverages);
    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);
    const factorMathModel = useSelector((state) => state.mathModels.factorMathModel);
    const workTimeMathModel = useSelector((state) => state.mathModels.workTimeMathModel);
    const factor = useSelector((state) => state.quantities.factor);
    const parameter = useSelector((state) => state.quantities.parameter);

    useEffect(() => {
        if (goNext.size >= 2) dispatch(setRecalcRouteAvailable(true));
        console.log(goNext);
    }, [goNext]);

    return (
        <div className={styles.avgValuesMain} style={{ position: "relative", display: "flex", height: '100vh' }}>
            {/* <div>Средние значения обучающей выборки:</div> */}
            <div style={{ width: '50%', padding: '10px', boxSizing: 'border-box' }}>
                {avgFactorValues.length ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Table
                            averages={avgFactorValues.map((el) => roundNum(el))}
                            columnNames={[factor, parameter]}
                            factorData={currencyData}
                            setMathModelValue={setFactorMathModel}
                        />
                        <MathModel
                            xValues={currencyData}
                            yValues={avgFactorValues}
                            factorName={"ток коллектора"}
                            setMathModelValue={setFactorMathModel}
                            setGoNext={setGoNext}
                            parameter={parameter}
                            factor={factor}
                        />
                        <ScatterPlot xData={currencyData} yData={avgFactorValues} style={{ height: "300px", width: "100%" }} axisNames={[factor, parameter]} />
                    </div>
                ) : null}
            </div>

            <div style={{ width: '50%', padding: '10px', boxSizing: 'border-box' }}>
                {avgWorkTimeValues.length ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Table
                            averages={avgWorkTimeValues.map((el) => roundNum(el))}
                            columnNames={["t", parameter]}
                            factorData={workTimeData}
                            setMathModelValue={setWorkTimeMathModel}
                        />

                        <MathModel
                            xValues={workTimeData}
                            yValues={avgWorkTimeValues}
                            factorName={"наработка"}
                            setMathModelValue={setWorkTimeMathModel}
                            setGoNext={setGoNext}
                            parameter={parameter}
                            factor={factor}
                        />
                        <ScatterPlot xData={workTimeData} yData={avgWorkTimeValues} style={{ width: "100%", height: "300px" }} axisNames={["t", parameter]} />
                    </div>
                ) : null}
            </div>

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