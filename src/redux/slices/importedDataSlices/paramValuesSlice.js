
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    educ: [],
    control: []
}

const paramValuesSlice = createSlice({
    name: "paramValuesSlice",
    initialState,
    reducers: {
        setParamData: (state, action) => {
            const {educ, control} = action.payload
            
            if (educ?.length) state.educ = educ;
            if (control?.length || control?.length == 0) state.control = control;  //придумать как переделать
        },
        setEducParamPoints: (state, action) => {
            const { newLength, numOfFactorPoints, numOfWorkTimePoints } = action.payload
            if (newLength < 0 || isNaN(newLength)) {
                return;
            }
            state.educ.length = newLength;
            for (let i = 0; i < newLength; i++) {
                if (!state.educ[i]) {
                    state.educ[i] = [new Array(numOfFactorPoints).fill(0), new Array(numOfWorkTimePoints).fill(0)];
                }
            }


        },
        setControlParamPoints: (state, action) => {
            const { newLength, numOfFactorPoints, numOfWorkTimePoints } = action.payload
            if (newLength < 0 || isNaN(newLength)) {
                console.error("Invalid newLength:", newLength);
                return;
            }
            state.control.length = newLength;
            for (let i = 0; i < newLength; i++) {
                if (!state.control[i]) {
                    state.control[i] = [new Array(numOfFactorPoints).fill(0), new Array(numOfWorkTimePoints).fill(0)];
                }
            }
        },
        updateEducParamValue: (state, action) => {
            const { value, rowIndex, columnIndex, indexInArr } = action.payload;
            
            const newEducRow = state.educ[rowIndex];
            newEducRow[indexInArr][columnIndex] = value;
            state.educ[rowIndex] = newEducRow;

            
        },
        updateControlParamValue: (state, action) => {
            const { value, rowIndex, columnIndex, indexInArr } = action.payload;
            
            const newControlRow = state.control[rowIndex];
            newControlRow[indexInArr][columnIndex] = value;
            state.control[rowIndex] = newControlRow;
        }
    }
})

export const { setParamData, setEducParamPoints, setControlParamPoints, updateEducParamValue, updateControlParamValue } = paramValuesSlice.actions;
export default paramValuesSlice.reducer;