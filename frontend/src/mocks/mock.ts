import userExample from '../assets/images/avatarProfile/avatar2.png';
import friendExample from '../assets/images/avatarProfile/avatar3.png';

export const MOCK_USER = {
	id: 1,
	name: 'Евгений',
	email: 'evgeny@example.com',
	number: '+79081553950',
	password: '123456',
	avatar: userExample,
	level: 42,
	routes: 52,
	gender: 'male',
	height: 192,
	weight: 90,
	role: 'USER',
	isAuthenticated: true,
};

export const MOCK_FRIEND = {
	id: 1,
	name: 'Никита',
	avatar: friendExample,
}
