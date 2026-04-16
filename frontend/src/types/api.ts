import { TUser } from './user';

export type TApiResponse = {
	success: boolean;
	data?: any;
	message?: string;
	user?: TUser;
	refreshToken?: string;
	accessToken?: string;
};
