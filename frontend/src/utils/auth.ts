import { deleteCookie, getCookie, setCookie } from './cookie';

export const getAccessToken = () => getCookie('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const hasTokens = () => !!getAccessToken() && !!getRefreshToken();

export const storeTokens = (refreshToken: string, accessToken: string) => {
	localStorage.setItem('refreshToken', String(refreshToken));
	setCookie('accessToken', String(accessToken));
};

export const clearTokens = () => {
	localStorage.removeItem('refreshToken');
	deleteCookie('accessToken');
};
