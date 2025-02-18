import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    values: [],
};

const workTimeValuesSlice = createSlice({
    name: "workTimeValues",
    initialState,
    reducers: {
        setWorkTimeData: (state, action) => {
            state.values = action.payload;
        },
        setWorkTimePoints: (state, action) => {
            const newLength = action.payload;
            if (newLength < 0 || isNaN(newLength)) {
                console.error("Invalid newLength:", newLength);
                return;
            }
            state.values.length = newLength;
            for (let i = 0; i < newLength; i++) {
                if (!state.values[i]) {
                    state.values[i] = 0;
                }
            }
        },
        updateWorkTimeValue: (state, action) => {
            const { index, value } = action.payload;

            // Ensure that state.values is an array and the index is valid
            if (Array.isArray(state.values) && index >= 0 && index < state.values.length) {
                state.values[index] = value; // Update the value at the specified index
            } else {
                console.error("Invalid index for update:", index);
            }
        },
    },
});

export const { setWorkTimeData, setWorkTimePoints, updateWorkTimeValue } = workTimeValuesSlice.actions;
export default workTimeValuesSlice.reducer;
