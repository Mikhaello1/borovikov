import React, { memo, useEffect, useState } from "react";
import styles from "../styles/AvgValuesTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFactorMathModel, setRecalcMathModel, setWorkTimeMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import { Table } from "../components/Table";
import { ScatterPlot } from "../components/Graphic";
import roundNum from "../helpers/roundNum";
import { setAvgRouteAvailable, setRecalcRouteAvailable } from "../redux/slices/routesSlice";
import MyButton from "../components/UI/MyButton";
import { useNavigate } from "react-router";
import { findBestModel, getModels } from "../helpers/findBestModel";
import StepBar from "../components/UI/StepBar";
import { calcAverages } from "../helpers/calcAverages";
import { setFactorAverages, setWorkTimeAverages } from "../redux/slices/avgValuesSlice";

function AvgValuesTable() {
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
    const factorEI = useSelector((state) => state.quantities.factorEI);
    const parameterEI = useSelector((state) => state.quantities.parameterEI);
    const paramData = useSelector((state) => state.paramData);

    useEffect(() => {
        if (goNext.size >= 2) dispatch(setRecalcRouteAvailable(true));
    }, [goNext]);

    useEffect(() => {
        let averages = calcAverages(paramData);

        averages.forEach((row) => {
            return row.map((el) => {
                return roundNum(el);
            });
        });

        dispatch(setFactorAverages(averages[0]));
        dispatch(setWorkTimeAverages(averages[1]));
        dispatch(setAvgRouteAvailable(true));
    }, [paramData]);

    return (
        <div className={styles.avgValuesMain}>
            <StepBar backRoute={"/"} nextRoute={"/recalc"} nextDisabled={!(factorMathModel.formula && workTimeMathModel.formula)} />

            <div style={{ padding: "10px", boxSizing: "border-box" }}>
                {avgFactorValues.length ? (
                    <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", alignItems: "center", justifyItems: "center" }}>
                            <Table
                                averages={avgFactorValues.map((el) => roundNum(el))}
                                columnNames={[factor, parameter]}
                                columnEI={[factorEI, parameterEI]}
                                factorData={currencyData}
                                setMathModelValue={setFactorMathModel}
                            />
                            <ScatterPlot
                                xData={currencyData}
                                yData={avgFactorValues}
                                style={{ height: "100%", width: "100%", transform: "translateY(40px)" }}
                                axisNames={[factor, parameter]}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", alignItems: "center", justifyItems: "center" }}>
                            <Table
                                averages={avgWorkTimeValues.map((el) => roundNum(el))}
                                columnNames={["t", parameter]}
                                columnEI={["ч", parameterEI]}
                                factorData={workTimeData}
                                setMathModelValue={setWorkTimeMathModel}
                            />
                            <ScatterPlot
                                xData={workTimeData}
                                yData={avgWorkTimeValues}
                                style={{ height: "100%", width: "100%", transform: "translateY(40px)" }}
                                axisNames={["t", parameter]}
                            />
                        </div>
                        <div>
                            <MathModel
                                xValues={currencyData}
                                yValues={avgFactorValues}
                                factorName={"ток коллектора"}
                                setMathModelValue={setFactorMathModel}
                                setGoNext={setGoNext}
                                parameter={parameter}
                                factor={factor}
                            />
                        </div>
                        <div>
                            <MathModel
                                xValues={workTimeData}
                                yValues={avgWorkTimeValues}
                                factorName={"наработка"}
                                setMathModelValue={setWorkTimeMathModel}
                                setGoNext={setGoNext}
                                parameter={parameter}
                                factor={"t"}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default memo(AvgValuesTable);
