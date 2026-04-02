import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice/userSlice';
import routeSlice from './routeSlice/routeSlice';

export const rootReducer = combineReducers({
	user: userSlice,
	routes: routeSlice,
});
