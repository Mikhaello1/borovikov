import { memo, useCallback, useState } from "react";
import MyInput from "../components/UI/MyInput";
import styles from "../styles/AvgValuesTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calcAverages } from "../helpers/calcAverages";
import { setFactorAverages, setWorkTimeAverages } from "../redux/slices/avgValuesSlice";
import { setFactorMathModel, setWorkTimeMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import { Table } from "../components/Table";



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
