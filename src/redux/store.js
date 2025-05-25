import { configureStore } from "@reduxjs/toolkit";
import factorValuesReducer from "./slices/importedDataSlices/factorValuesSlice";
import workTimeValuesReducer from "./slices/importedDataSlices/workTimeValuesSlice";
import paramValuesReducer from "./slices/importedDataSlices/paramValuesSlice.js";
import avgValuesReducer from "./slices/avgValuesSlice.js";
import mathModelsReducer from "./slices/mathModelsSlice.js";
import recalcedValuesReducer from "./slices/recalcedValuesSlice.js";
import routesSliceReducer from "./slices/routesSlice.js";
import forecastErrorsReducer from "./slices/forecastErrorsSlice.js";
import quantitiesReducer from "./slices/importedDataSlices/quantitiesSlice.js";
import modalsReducer from "./slices/modalsSlice.js";
import chosenModelReducer from "./slices/chosenModelSlice.js";
import createdModelsReducer from "./slices/createdModelsSlice.js";

export const store = configureStore({
    reducer: {
        factorData: factorValuesReducer,
        workTimeData: workTimeValuesReducer,
        paramData: paramValuesReducer,
        avgValuesData: avgValuesReducer,
        mathModels: mathModelsReducer,
        recalcedValues: recalcedValuesReducer,
        routes: routesSliceReducer,
        forecastErrors: forecastErrorsReducer,
        quantities: quantitiesReducer,
        modals: modalsReducer,
        chosenModel: chosenModelReducer,
        createdModels: createdModelsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "mathModels/setRecalcMathModel",
                    "mathModels/setFactorMathModel",
                    "mathModels/setWorkTimeMathModel"
                ],
                ignoredActionPaths: [
                    "payload.getFormula",
                    "payload.calcValue", 
                ],
                ignoredPaths: [
                    "mathModels.recalcMathModel.getFormula",
                    "mathModels.recalcMathModel.calcValue", 
                    "mathModels.factorMathModel.calcValue",
                    "mathModels.workTimeMathModel.calcValue",
                ],
            },
        }),
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //       serializableCheck: {
    //           ignoredActions: ['mathModels/setFactorMathModel', 'mathModels/setWorkTimeMathModel', 'mathModels/setRecalcMathModel'],
    //           ignoredPaths: ['payload.model'],
    //       },
    //   }),
});
