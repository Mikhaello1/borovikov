import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    factorMathModel: {},
    workTimeMathModel:{},
    recalcMathModel:{}
};

const mathModelsSlice = createSlice({
    name: "mathModels",
    initialState,
    reducers: {
        setFactorMathModel: (state, action) => {
            state.factorMathModel = action.payload
        },
        setWorkTimeMathModel: (state, action) => {
            state.workTimeMathModel = action.payload
        },
        setRecalcMathModel: (state, action) => {
            state.recalcMathModel = action.payload
        }
    },
});

export const { setFactorMathModel, setRecalcMathModel, setWorkTimeMathModel} = mathModelsSlice.actions;
export default mathModelsSlice.reducer;
