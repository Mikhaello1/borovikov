import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    factorModels: [{}, {}, {}, {}],
    workTimeModels: [{}, {}, {}, {}],
};

const createdModelsSlice = createSlice({
    name: "createdModels",
    initialState,
    reducers: {
        setModel: (state, action) => {
            const { modelIndex, whatModel, model } = action.payload;

            state[whatModel][modelIndex] = model;
        },
        clearAll: (state) => {
            state.factorModels = [{}, {}, {}, {}];
            state.workTimeModels = [{}, {}, {}, {}];
        },
    },
});

export const { setModel, clearAll } = createdModelsSlice.actions;
export default createdModelsSlice.reducer;
