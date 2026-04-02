import {
	createSlice,
	createAsyncThunk,
	PayloadAction
} from '@reduxjs/toolkit';
import { Category } from '../../../types/route';
import {
	getCategories,
	getUserPreferences,
	updateUserPreferences,
} from '../../../utils/sportline-api';
import { UpdatePreferencesData } from '../../../types/preferences';

export interface PreferencesState {
	categories: Category[];
	selectedPreferences: number[];
	loading: boolean;
	error: string | null;
	successMessage: string | null;
}

const initialState: PreferencesState = {
	categories: [],
	selectedPreferences: [],
	loading: false,
	error: null,
	successMessage: null,
};

export const fetchCategories = createAsyncThunk(
	'preferences/fetchCategories',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getCategories();
			console.log('Fetched categories:', response);
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка загрузки категорий');
		}
	}
);

export const fetchUserPreferences = createAsyncThunk(
	'preferences/fetchUserPreferences',
	async (token: string, { rejectWithValue }) => {
		try {
			const response = await getUserPreferences(token);
			console.log('Fetched user preferences:', response);
			return response;
		} catch (error: any) {
			return rejectWithValue(
				error.message || 'Ошибка загрузки предпочтений пользователя'
			);
		}
	}
);

export const saveUserPreferences = createAsyncThunk(
	'preferences/saveUserPreferences',
	async (data: UpdatePreferencesData, { rejectWithValue }) => {
		try {
			console.log('Saving user preferences with data:', data);
			const response = await updateUserPreferences(data);
			console.log('Save preferences response:', response);
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка сохранения предпочтений');
		}
	}
);

const preferencesSlice = createSlice({
	name: 'preferences',
	initialState,
	reducers: {
		// Локальное переключение предпочтения
		togglePreference: (state, action: PayloadAction<number>) => {
			const preferenceId = action.payload;
			if (state.selectedPreferences.includes(preferenceId)) {
				state.selectedPreferences = state.selectedPreferences.filter(
					(id) => id !== preferenceId
				);
			} else {
				state.selectedPreferences.push(preferenceId);
			}
			console.log(
				'Toggled preference, current selected:',
				state.selectedPreferences
			);
			// Очищаем ошибку при выборе
			if (state.error) {
				state.error = null;
			}
		},

		resetSelectedPreferences: (state) => {
			state.selectedPreferences = [];
		},

		clearMessages: (state) => {
			state.error = null;
			state.successMessage = null;
		},

		setSelectedPreferences: (state, action: PayloadAction<number[]>) => {
			state.selectedPreferences = action.payload;
			console.log('Set selected preferences:', action.payload);
		},

		resetPreferencesState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchCategories.fulfilled,
				(state, action: PayloadAction<Category[]>) => {
					state.loading = false;
					state.categories = action.payload;
				}
			)
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchUserPreferences.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchUserPreferences.fulfilled,
				(state, action: PayloadAction<number[]>) => {
					state.loading = false;
					state.selectedPreferences = action.payload;
					console.log('Loaded user preferences into state:', action.payload);
				}
			)
			.addCase(fetchUserPreferences.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(saveUserPreferences.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.successMessage = null;
			})
			.addCase(saveUserPreferences.fulfilled, (state, action) => {
				state.loading = false;
				state.successMessage =
					action.payload.message || 'Предпочтения успешно сохранены!';
				console.log('Preferences saved successfully:', action.payload);
			})
			.addCase(saveUserPreferences.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				console.error('Save preferences rejected:', action.payload);
			});
	},
});

export const {
	togglePreference,
	resetSelectedPreferences,
	clearMessages,
	setSelectedPreferences,
	resetPreferencesState,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;