
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    factor: "",
    factorEI: "",
    parameter: "",
    parameterEI: ""
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
        },
        setFactorEI: (state, action) => {
            state.factorEI = action.payload
        },
        setParameterEI: (state, action) => {
            state.parameterEI = action.payload
        }
    }
})

export const { setFactorQuantity, setParameterQuantity, setFactorEI, setParameterEI } = quantitiesSlice.actions;
export default quantitiesSlice.reducer;