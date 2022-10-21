import {createSlice} from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "userReducer",
    initialState: {
        currentUser: {},
        isAuth: false
    },
    reducers: {
        def: (state) => {
            return state;
        }
    }
});

export default userReducer.reducer;
export const { def } = userReducer.actions;