import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';

import {
	RouteData,
	CreateRouteData,
	UpdateRouteData,
} from '../../../types/route';

import {
	getAllRoutes,
	getRoutesByCategory,
	getRoutesByDifficulty,
	getRouteByID,
	createRoute,
	updateRoute,
	deleteRoute
} from '../../../utils/sportline-api';

type RoutesState = {
	routes: RouteData[];
	currentRoute: RouteData | null;
	loading: boolean;
	error: string | null;
	successMessage: string | null;
}

const initialState: RoutesState = {
	routes: [],
	currentRoute: null,
	loading: false,
	error: null,
	successMessage: null,
};

export const fetchAllRoutes = createAsyncThunk(
	'routes/fetchAllRoutes',
	async (_, { rejectWithValue }) => {
		try {
			return await getAllRoutes();
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка загрузки маршрутов');
		}
	}
);

export const fetchRouteById = createAsyncThunk(
	'routes/fetchRouteById',
	async (id: number, { rejectWithValue }) => {
		try {
			return await getRouteByID(id);
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка загрузки маршрута');
		}
	}
);

export const addNewRoute = createAsyncThunk(
	'routes/addNewRoute',
	async (data: CreateRouteData, { rejectWithValue }) => {
		try {
			return await createRoute(data);
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка создания маршрута');
		}
	}
);

export const editRoute = createAsyncThunk(
	'routes/editRoute',
	async (
		{ id, data }: { id: number; data: UpdateRouteData },
		{ rejectWithValue }
	) => {
		try {
			return await updateRoute(id, data);
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка обновления маршрута');
		}
	}
);

export const removeRoute = createAsyncThunk(
	'routes/removeRoute',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await deleteRoute(id);
			return { id, ...response };
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка удаления маршрута');
		}
	}
);

export const fetchRoutesByCategory = createAsyncThunk(
	'routes/fetchRoutesByCategory',
	async (categoryId: number, { rejectWithValue }) => {
		try {
			return await getRoutesByCategory(categoryId);
		} catch (error: any) {
			return rejectWithValue(
				error.message || 'Ошибка загрузки маршрутов по категории'
			);
		}
	}
);

export const fetchRoutesByDifficulty = createAsyncThunk(
	'routes/fetchRoutesByDifficulty',
	async (difficulty: string, { rejectWithValue }) => {
		try {
			return await getRoutesByDifficulty(difficulty);
		} catch (error: any) {
			return rejectWithValue(
				error.message || 'Ошибка загрузки маршрутов по сложности'
			);
		}
	}
);

const routesSlice = createSlice({
	name: 'routes',
	initialState,
	reducers: {
		clearMessages: (state) => {
			state.error = null;
			state.successMessage = null;
		},
		clearCurrentRoute: (state) => {
			state.currentRoute = null;
		},
		clearRoutes: (state) => {
			state.routes = [];
		},
		resetRoutesState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllRoutes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchAllRoutes.fulfilled,
				(state, action: PayloadAction<RouteData[]>) => {
					state.loading = false;
					state.routes = action.payload;
				}
			)
			.addCase(fetchAllRoutes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchRouteById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRouteById.fulfilled,
				(state, action: PayloadAction<RouteData>) => {
					state.loading = false;
					state.currentRoute = action.payload;
				}
			)
			.addCase(fetchRouteById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(addNewRoute.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.successMessage = null;
			})
			.addCase(
				addNewRoute.fulfilled,
				(state, action: PayloadAction<RouteData>) => {
					state.loading = false;
					state.routes.push(action.payload);
					state.successMessage = 'Маршрут успешно создан!';
				}
			)
			.addCase(addNewRoute.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(editRoute.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.successMessage = null;
			})
			.addCase(
				editRoute.fulfilled,
				(state, action: PayloadAction<RouteData>) => {
					state.loading = false;
					const index = state.routes.findIndex(
						(route) => route.id === action.payload.id
					);
					if (index !== -1) {
						state.routes[index] = action.payload;
					}
					if (state.currentRoute?.id === action.payload.id) {
						state.currentRoute = action.payload;
					}
					state.successMessage = 'Маршрут успешно обновлен!';
				}
			)
			.addCase(editRoute.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(removeRoute.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.successMessage = null;
			})
			.addCase(
				removeRoute.fulfilled,
				(state, action: PayloadAction<{ id: number; message: string }>) => {
					state.loading = false;
					state.routes = state.routes.filter(
						(route) => route.id !== action.payload.id
					);
					if (state.currentRoute?.id === action.payload.id) {
						state.currentRoute = null;
					}
					state.successMessage = action.payload.message;
				}
			)
			.addCase(removeRoute.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchRoutesByCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRoutesByCategory.fulfilled,
				(state, action: PayloadAction<RouteData[]>) => {
					state.loading = false;
					state.routes = action.payload;
				}
			)
			.addCase(fetchRoutesByCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchRoutesByDifficulty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRoutesByDifficulty.fulfilled,
				(state, action: PayloadAction<RouteData[]>) => {
					state.loading = false;
					state.routes = action.payload;
				}
			)
			.addCase(fetchRoutesByDifficulty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	clearMessages,
	clearCurrentRoute,
	clearRoutes,
	resetRoutesState,
} = routesSlice.actions;

export default routesSlice.reducer;