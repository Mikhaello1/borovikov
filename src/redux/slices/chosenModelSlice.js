import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    chosenModelIndex: {
        factorMathModel: null,
        workTimeMathModel: null
    },

}

const chosenModelSlice = createSlice({
    name: 'chosenModel',
    initialState,
    reducers: {
        setChosenModelIndex: (state, action) => {
            state.chosenModelIndex[action.payload.whatModel] = action.payload.index;
        },
        clearModelsIndexes: (state) => {
            state.chosenModelIndex.factorMathModel = null;
            state.chosenModelIndex.workTimeMathModel = null;
        }
        
    }
})

export const { setChosenModelIndex, clearModelsIndexes } = chosenModelSlice.actions;
export default chosenModelSlice.reducer;