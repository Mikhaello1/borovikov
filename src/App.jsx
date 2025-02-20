import { useState } from "react";
import "./App.css";
import AvgValuesTable from "./pages/AvgValuesTable";

import recalcModel from "./helpers/recalcModel";

import ImportedDataTable from "./pages/ImportedDataTable";

function App() {



    return (
        <div>
            <ImportedDataTable />
            <AvgValuesTable />
            
            {/* <MySelect
                title={"Choose Y-param"}
                onChange={(e) => {
                    setYParam(e.currentTarget.value);
                }}
                defaultValue={"Uкнас"}
                options={YParamOptions}
            />

            <MySelect
                title={"Choose Factor"}
                onChange={(e) => {
                    setFactor(e.currentTarget.value);
                }}
                defaultValue={"Iк"}
                options={FOptions}
            />

            
              
            <MathModel xValues={xValues} yValues={yValues} YParam={YParam} factor={Factor} setModel = {setMainModel} model={mainModel}/>

            <TAF />

            <AvgValuesTable YParam={YParam} factor={"t"} xValues={xValuesMIP} setXValues={setXValuesMIP} yValues={yValuesMIP} setYValues={setYValuesMIP} />

            <MathModel xValues={xValuesMIP} yValues={yValuesMIP} YParam={YParam} factor={"t"} setModel = {setTModel} model={tModel}/>

            <div>
                <button onClick={handleRecalcClick}>Получить ф-цию пересчета</button>
                
                <h4>{recalcFunc.formula}</h4>
            </div>

            {/* {recalcedValues && console.log(recalcedValues)} */}

            {/* <button onClick={handleGetRecalcValues}>getRecaclcValues</button> */}

            {/* {recalcedValues && <AvgValuesTable YParam={YParam+" пересчет"} factor={Factor+" пересчет"} xValues={recalcedValues.recalcFactorValues} yValues={recalcedValues.recalcYParamValues}  />} */}
        </div>
    );
}

export default App;
