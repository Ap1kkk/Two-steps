import { TUser } from './user';

export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	role: 'USER' | 'ADMIN';
	preferences: number[];
	createdAt: string;
	token: string;
}

export interface UpdatePreferencesData {
	token: string;
	preferences: number[];
}

export interface PreferencesResponse {
	success: boolean;
	message?: string;
	user?: User;
	preferences?: number[];
}