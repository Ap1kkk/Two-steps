export type TUser = {
	id?: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
};
