import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    errors: []
}   


const forecastErorrsSlice = createSlice({
    name: 'forecastErrors',
    initialState,
    reducers: {
        setErrors: (state, action) => {
            state.errors = action.payload
        }
    }
})


export const { setErrors } = forecastErorrsSlice.actions;
export default forecastErorrsSlice.reducer;