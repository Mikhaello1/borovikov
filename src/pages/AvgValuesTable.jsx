import { memo, useCallback, useState } from "react";
import MyInput from "../components/UI/MyInput";
import styles from "../styles/AvgValuesTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calcAverages } from "../helpers/calcAverages";
import { setFactorAverages, setWorkTimeAverages } from "../redux/slices/avgValuesSlice";
import { setFactorMathModel, setWorkTimeMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";

const Table = memo(({ averages, factorName, factorData, setMathModelValue }) => {
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>{factorName} </th>
                        <th className={styles.th}>Y-параметр</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((value, index) => {
                        return <TableRow key={index} FValue={factorData[index]} YValue={value} />;
                    })}
                </tbody>
            </table>
            <MathModel xValues={factorData} yValues={averages} factorName={factorName} setMathModelValue={setMathModelValue}/>
        </>
    );
});

const TableRow = memo(({ FValue, YValue }) => {
    return (
        <tr>
            <td className={styles.td}>{FValue}</td>
            <td className={styles.td}>{YValue}</td>
        </tr>
    );
});

function AvgValuesTable() {

    const avgFactorValues = useSelector((state) => state.avgValuesData.factorAverages);
    const avgWorkTimeValues = useSelector((state) => state.avgValuesData.workTimeAverages);
    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);

    return (
        <div className={styles.avgValuesMain}>
            
            {avgFactorValues.length ? (
                <Table 
                    averages={avgFactorValues} 
                    factorName={'ток коллектора'}
                    factorData={currencyData} 
                    setMathModelValue={setFactorMathModel}/>
                
                
            ): null}
            
            {avgWorkTimeValues.length ?
                <Table 
                    averages={avgWorkTimeValues} 
                    factorName={'наработка'}
                    factorData={workTimeData} 
                    setMathModelValue={setWorkTimeMathModel}
                /> : null
            }
        </div>
        
        
    );
}

export default memo(AvgValuesTable);
