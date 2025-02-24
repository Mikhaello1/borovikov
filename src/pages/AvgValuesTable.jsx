import { memo } from "react";
import styles from "../styles/AvgValuesTable.module.css";
import { useSelector } from "react-redux";
import { setFactorMathModel, setWorkTimeMathModel } from "../redux/slices/mathModelsSlice";
import MathModel from "../components/MathModel";
import { Table } from "../components/Table";
import { ScatterPlot } from "../components/Graphic";
import roundNum from "../helpers/roundNum";



function AvgValuesTable() {

    const avgFactorValues = useSelector((state) => state.avgValuesData.factorAverages);
    const avgWorkTimeValues = useSelector((state) => state.avgValuesData.workTimeAverages);
    const currencyData = useSelector((state) => state.factorData.values);
    const workTimeData = useSelector((state) => state.workTimeData.values);

    return (
        <div className={styles.avgValuesMain}>
            
            {avgFactorValues.length ? (
                <div style={{display: 'flex'}}>
                    <div>
                        <Table 
                            averages={avgFactorValues.map(el => roundNum(el))} 
                            columnNames={['Iк', 'U']}
                            factorData={currencyData} 
                            setMathModelValue={setFactorMathModel}/>
                        <MathModel xValues={currencyData} yValues={avgFactorValues} factorName={'ток коллектора'} setMathModelValue={setFactorMathModel}/>
                    </div>
                    
                    <ScatterPlot xData={currencyData} yData={avgFactorValues} style={{height: '500px', width: '500px'}}/>
                    
                </div>
                
            ): null}
            
            {avgWorkTimeValues.length ? (
                <div style={{display: "flex"}}>
                    <div>
                        <Table 
                            averages={avgWorkTimeValues.map(el => roundNum(el))} 
                            columnNames={['t', 'U']}
                            factorData={workTimeData} 
                            setMathModelValue={setWorkTimeMathModel}
                        />
                        <MathModel xValues={workTimeData} yValues={avgWorkTimeValues} factorName={'наработка'} setMathModelValue={setWorkTimeMathModel}/>
                    </div>
                    <ScatterPlot xData={workTimeData} yData={avgWorkTimeValues} style={{height: '500px', width: '500px'}}/>
                </div>

            ) : null}
        </div>
        
        
    );
}

export default memo(AvgValuesTable);
