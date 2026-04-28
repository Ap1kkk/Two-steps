import { Route } from './route';

export interface User {
	id: string;
	username: string;
	name: string;
	email: string;
	number: string;
	password: string;
	level: number;
	gender: 'male' | 'female' | 'other';
	height: number;
	weight: number;
	birthday: string;
	role: 'USER' | 'ADMIN';
	isAuthenticated: boolean;
	friends: User[];
	recentRoutes: Route[];
	avatar: string;
}

export interface AvatarUser {
	id: string;
	avatar: string;
}

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

export type TUpdateUserData = Partial<Omit<TRegisterData, 'role'>> & {
	id?: number;
	role?: 'USER' | 'ADMIN';
};
