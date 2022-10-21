import {createSlice} from "@reduxjs/toolkit";

const fileReducer = createSlice({
    name: "fileReducer",
    initialState: {

    },
    reducers: {
        def: (state) => {
            return state;
        }
    }
});

export default fileReducer.reducer;
export const { def } = fileReducer.actions;