import { deleteCookie, getCookie, setCookie } from './cookie';

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => getCookie('refreshToken');
export const hasTokens = () => !!getAccessToken() && !!getRefreshToken();

export const storeTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('accessToken', String(accessToken));
	setCookie('refreshToken', String(refreshToken));
};

export const clearTokens = () => {
	localStorage.removeItem('accessToken');
	deleteCookie('refreshToken');
};