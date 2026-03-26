import { combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice/userSlice";

export const rootReducer = combineReducers({
    user: userSlice,
});
