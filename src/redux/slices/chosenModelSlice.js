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
        }
        
    }
})

export const { setChosenModelIndex } = chosenModelSlice.actions;
export default chosenModelSlice.reducer;