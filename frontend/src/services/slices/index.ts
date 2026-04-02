import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice/userSlice';
import preferencesSlice from './preferencesSlice/preferencesSlice';

export const rootReducer = combineReducers({
	user: userSlice,
	preferences: preferencesSlice
import routeSlice from './routeSlice/routeSlice';

export const rootReducer = combineReducers({
	user: userSlice,
	routes: routeSlice,
});
