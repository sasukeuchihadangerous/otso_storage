import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";

const rootReducer = combineReducers({
    user: userReducer,
    //file: fileReducer
})

export const store = configureStore({
    reducer: rootReducer,
})