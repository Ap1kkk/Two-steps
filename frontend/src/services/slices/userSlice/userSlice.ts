import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	SerializedError,
} from '@reduxjs/toolkit';
import { TUser } from '../../../types/user';
import { clearTokens, storeTokens } from '../../../utils/auth';
import {
	registerUserApi,
	loginUserApi,
	logoutApi,
	getUserApi,
	updateUserApi,
	forgotPasswordApi,
	resetPasswordApi,
	TRegisterData,
	TLoginData,
	TUpdateUserData,
	TApiResponse,
} from '../../../utils/sportline-api';

type TUserState = {
	isAuthChecked: boolean;
	isAuthenticated: boolean;
	loginError?: SerializedError;
	registerError?: SerializedError;
	data: TUser;
	isLoading: boolean;
};

const initialState: TUserState = {
	isAuthChecked: false,
	isAuthenticated: false,
	isLoading: false,
	data: {
		id: undefined,
		username: '',
		email: '',
		role: 'USER',
	},
};

export const register = createAsyncThunk<
	TUser,
	TRegisterData,
	{ rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
	const response: TApiResponse = await registerUserApi(data);

	if (!response?.success) {
		return rejectWithValue(response.message || 'Ошибка регистрации');
	}

	const { user, refreshToken, accessToken } = response;

	if (refreshToken && accessToken && user) {
		storeTokens(refreshToken, accessToken);
		return user;
	}

	return rejectWithValue('Ошибка получения данных пользователя');
});

export const login = createAsyncThunk<
	TUser,
	TLoginData,
	{ rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
	const response: TApiResponse = await loginUserApi(data);

	if (!response?.success) {
		return rejectWithValue(response.message || 'Ошибка входа');
	}

	const { user, refreshToken, accessToken } = response;

	if (refreshToken && accessToken && user) {
		storeTokens(refreshToken, accessToken);
		return user;
	}

	return rejectWithValue('Ошибка получения данных пользователя');
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/logout',
	async (_, { rejectWithValue }) => {
		const response: TApiResponse = await logoutApi();

		if (!response?.success) {
			return rejectWithValue(response.message || 'Ошибка выхода');
		}

		clearTokens();
	}
);

export const resetPassword = createAsyncThunk<
	boolean,
	{ password: string; token: string },
	{ rejectValue: string }
>('user/resetPassword', async (data, { rejectWithValue }) => {
	const response: TApiResponse = await resetPasswordApi(data);

	if (!response?.success) {
		return rejectWithValue(response.message || 'Ошибка сброса пароля');
	}

	return true;
});

export const forgotPassword = createAsyncThunk<
	boolean,
	{ email: string },
	{ rejectValue: string }
>('user/forgotPassword', async (data, { rejectWithValue }) => {
	const response: TApiResponse = await forgotPasswordApi(data);

	if (!response?.success) {
		return rejectWithValue(response.message || 'Ошибка восстановления пароля');
	}

	return true;
});

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
	'user/fetch',
	async (_, { rejectWithValue }) => {
		const response: TApiResponse = await getUserApi();

		if (!response?.success) {
			return rejectWithValue(
				response.message || 'Ошибка получения пользователя'
			);
		}

		if (!response.user) {
			return rejectWithValue('Пользователь не найден');
		}

		return response.user;
	}
);

export const updateUser = createAsyncThunk<
	TUser,
	TUpdateUserData,
	{ rejectValue: string }
>('user/update', async (data, { rejectWithValue }) => {
	const response: TApiResponse = await updateUserApi(data);

	if (!response?.success) {
		return rejectWithValue(response.message || 'Ошибка обновления данных');
	}

	if (!response.user) {
		return rejectWithValue('Пользователь не найден');
	}

	return response.user;
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		clearErrors: (state) => {
			state.loginError = undefined;
			state.registerError = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.registerError = undefined;
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.registerError = undefined;
				state.isAuthenticated = true;
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.registerError = action.meta.rejectedWithValue
					? { message: action.payload as string }
					: action.error;
			})

			.addCase(login.pending, (state) => {
				state.loginError = undefined;
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginError = undefined;
				state.isAuthenticated = true;
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.loginError = action.meta.rejectedWithValue
					? { message: action.payload as string }
					: action.error;
			})

			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.data = {
					id: undefined,
					username: '',
					email: '',
					role: 'USER',
				};
			})
			.addCase(logout.rejected, (state) => {
				state.isLoading = false;
			})

			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.isAuthChecked = true;
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchUser.rejected, (state) => {
				state.isAuthChecked = true;
				state.isAuthenticated = false;
				state.isLoading = false;
				state.data = {
					id: undefined,
					username: '',
					email: '',
					role: 'USER',
				};
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { setAuthChecked, clearErrors } = userSlice.actions;
export default userSlice.reducer;
