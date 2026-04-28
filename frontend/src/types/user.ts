export type TUser = {
	id?: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
};

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
