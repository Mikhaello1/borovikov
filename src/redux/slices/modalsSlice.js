import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditTableModalOpen: true,
};

const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        setIsEditTableModalOpen: (state, action) => {
            state.isEditTableModalOpen = action.payload
        },
        
    },
});

export const { setIsEditTableModalOpen } = modalsSlice.actions;
export default modalsSlice.reducer;
