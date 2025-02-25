import { configureStore } from '@reduxjs/toolkit'
import factorValuesReducer from './slices/importedDataSlices/factorValuesSlice'
import workTimeValuesReducer from './slices/importedDataSlices/workTimeValuesSlice'
import paramValuesReducer from './slices/importedDataSlices/paramValuesSlice.js'
import avgValuesReducer from './slices/avgValuesSlice.js'
import mathModelsReducer from './slices/mathModelsSlice.js'
import recalcedValuesReducer from './slices/recalcedValuesSlice.js'
import routesSliceReducer from './slices/routesSlice.js'
import forecastErrorsReducer from './slices/forecastErrorsSlice.js'


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
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //       serializableCheck: {
  //           ignoredActions: ['mathModels/setFactorMathModel', 'mathModels/setWorkTimeMathModel', 'mathModels/setRecalcMathModel'],
  //           ignoredPaths: ['payload.model'],
  //       },
  //   }),
})