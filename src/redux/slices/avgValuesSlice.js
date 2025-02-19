
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    factorAverages: [],
    workTimeAverages: [],
    recalcedAverages: []
}

const avgValuesSlice = createSlice({
    name: "avgValues",
    initialState,
    reducers: {
        setFactorAverages: (state, action) => {
            state.factorAverages = action.payload
        },
        setWorkTimeAverages: (state, action) => {
            state.workTimeAverages = action.payload
        },
        setRecalcedAverages: (state, action) => {
            state.recalcedAverages = action.payload
        }
    }
})

export const { setFactorAverages, setWorkTimeAverages, setRecalcedAverages } = avgValuesSlice.actions;
export default avgValuesSlice.reducer;