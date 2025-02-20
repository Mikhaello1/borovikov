
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    recalcedFactorValues: [],
    recalcedYParamValues: []
}

const recalcedValuesSlice = createSlice({
    name: "recalcedValues",
    initialState,
    reducers: {
        setRecalcedValues: (state, action) => {
            const {recalcedFactorValues, recalcedYParamValues} = action.payload;
    
            if(recalcedFactorValues.length) state.recalcedFactorValues = recalcedFactorValues;
            if(recalcedYParamValues.length) state.recalcedYParamValues = recalcedYParamValues;
        }
    }
})

export const { setRecalcedValues } = recalcedValuesSlice.actions;
export default recalcedValuesSlice.reducer;