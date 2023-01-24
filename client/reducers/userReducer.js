import {createSlice} from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "userReducer",
    initialState: {
        currentUser: {},
        isAuth: false
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isAuth = false;
        }
    }
});

export default userReducer.reducer;
export const { setUser, logout } = userReducer.actions;