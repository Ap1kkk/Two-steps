import {TUser} from '../types/user';

const API_URL = 'http://localhost:3001';

export type TRegisterData = {
    username: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN';
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TUpdateUserData = Partial<TRegisterData> & {
    id?: number;
};

export type TApiResponse = {
    success: boolean;
    data?: any;
    message?: string;
    user?: TUser;
    refreshToken?: string;
    accessToken?: string;
};

const getAccessToken = (): string | null => {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
    return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
};

const getHeaders = (withAuth: boolean = false): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (withAuth) {
        const token = getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const registerUserApi = async (data: TRegisterData): Promise<TApiResponse> => {
    try {
        const checkResponse = await fetch(`${API_URL}/users?email=${data.email}`);
        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            return {
                success: false,
                message: 'Пользователь с таким email уже существует'
            };
        }

        const userData = {
            ...data,
            role: data.role || 'USER',
            createdAt: new Date().toISOString(),
            token: `mock-token-${Date.now()}`
        };

        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });

        const user = await handleResponse(response);

        const { password, ...userWithoutPassword } = user;

        const accessToken = `mock-access-token-${Date.now()}`;
        const refreshToken = `mock-refresh-token-${Date.now()}`;

        return {
            success: true,
            user: userWithoutPassword as TUser,
            accessToken,
            refreshToken
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка регистрации'
        };
    }
};

export const loginUserApi = async (data: TLoginData): Promise<TApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/users?email=${data.email}&password=${data.password}`);
        const users = await handleResponse(response);

        if (users.length === 0) {
            return {
                success: false,
                message: 'Неверный email или пароль'
            };
        }

        const user = users[0];
        const { password, ...userWithoutPassword } = user;

        const accessToken = `mock-access-token-${Date.now()}`;
        const refreshToken = `mock-refresh-token-${Date.now()}`;

        return {
            success: true,
            user: userWithoutPassword as TUser,
            accessToken,
            refreshToken
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка входа'
        };
    }
};

export const logoutApi = async (): Promise<TApiResponse> => {
    try {
        return {
            success: true,
            message: 'Выход выполнен успешно'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка выхода'
        };
    }
};

export const getUserApi = async (): Promise<TApiResponse> => {
    try {
        const token = getAccessToken();

        if (!token) {
            return {
                success: false,
                message: 'Токен не найден'
            };
        }

        const response = await fetch(`${API_URL}/users`);
        const users = await handleResponse(response);

        const user = users.find((u: any) => u.token === token);

        if (!user) {
            return {
                success: false,
                message: 'Пользователь не найден'
            };
        }

        const { password, ...userWithoutPassword } = user;

        return {
            success: true,
            user: userWithoutPassword as TUser
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка получения данных пользователя'
        };
    }
};

export const updateUserApi = async (data: TUpdateUserData): Promise<TApiResponse> => {
    try {
        const token = getAccessToken();

        if (!token) {
            return {
                success: false,
                message: 'Токен не найден'
            };
        }

        const usersResponse = await fetch(`${API_URL}/users`);
        const users = await handleResponse(usersResponse);
        const currentUser = users.find((u: any) => u.token === token);

        if (!currentUser) {
            return {
                success: false,
                message: 'Пользователь не найден'
            };
        }

        const updatedUser = {
            ...currentUser,
            ...data,
            updatedAt: new Date().toISOString()
        };

        const response = await fetch(`${API_URL}/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: getHeaders(true),
            body: JSON.stringify(updatedUser)
        });

        const user = await handleResponse(response);
        const { password, ...userWithoutPassword } = user;

        return {
            success: true,
            user: userWithoutPassword as TUser
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка обновления данных'
        };
    }
};

export const forgotPasswordApi = async (data: { email: string }): Promise<TApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/users?email=${data.email}`);
        const users = await handleResponse(response);

        if (users.length === 0) {
            return {
                success: false,
                message: 'Пользователь с таким email не найден'
            };
        }

        return {
            success: true,
            message: 'Инструкции по восстановлению отправлены на email'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка восстановления пароля'
        };
    }
};

export const resetPasswordApi = async (data: { password: string; token: string }): Promise<TApiResponse> => {
    try {
        const usersResponse = await fetch(`${API_URL}/users`);
        const users = await handleResponse(usersResponse);

        const user = users.find((u: any) => u.resetToken === data.token);

        if (!user) {
            return {
                success: false,
                message: 'Недействительный токен сброса'
            };
        }

        const response = await fetch(`${API_URL}/users/${user.id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ password: data.password })
        });

        await handleResponse(response);

        return {
            success: true,
            message: 'Пароль успешно изменен'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка сброса пароля'
        };
    }
};

export const refreshTokenApi = async (refreshToken: string): Promise<TApiResponse> => {
    try {
        const usersResponse = await fetch(`${API_URL}/users`);
        const users = await handleResponse(usersResponse);

        const user = users.find((u: any) => u.refreshToken === refreshToken);

        if (!user) {
            return {
                success: false,
                message: 'Недействительный refresh token'
            };
        }

        const newAccessToken = `mock-access-token-${Date.now()}`;

        return {
            success: true,
            accessToken: newAccessToken,
            refreshToken
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Ошибка обновления токена'
        };
    }
};