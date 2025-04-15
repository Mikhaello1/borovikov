
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    factor: "",
    parameter: ""
}

const quantitiesSlice = createSlice({
    name: "quantitiesSlice",
    initialState,
    reducers: {
        setFactorQuantity: (state, action) => {
            state.factor = action.payload
        },
        setParameterQuantity: (state, action) => {
            state.parameter = action.payload
        }
    }
})

export const { setFactorQuantity, setParameterQuantity } = quantitiesSlice.actions;
export default quantitiesSlice.reducer;