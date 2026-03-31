import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@components';
import {
	AchievementsPage,
	Admin_workbench,
	Authorization,
	EditProfilePage,
	MainPage,
	MapPage,
	Preferences,
	ProfilePage,
	Recommendation,
	Registration,
	SearchRouts,
	StatisticsPage,
	UserHistory,
	UserLikeRouts,
} from '@pages';
import PopularRouts from './pages/PopularRouts/PopularRouts';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/main_page' replace />,
			},
			{
				path: '/login',
				element: <Authorization />,
			},
			{
				path: '/register',
				element: <Registration />,
			},
			{
				path: '/register/preferences',
				element: <Preferences />,
			},
			{
				path: '/admin',
				element: <Admin_workbench />,
			},
			{
				path: '/main_page',
				element: <MainPage />,
			},
			{
				path: '/main_page/recomendation',
				element: <Recommendation />,
			},
			{
				path: '/main_page/popular',
				element: <PopularRouts />,
			},
			{
				path: '/main_page/search_page',
				element: <SearchRouts />,
			},
			{
				path: '/main_page/history',
				element: <UserHistory />,
			},
			{
				path: '/map/:routeId',
				element: <MapPage />,
			},
			{
				path: '/favourites',
				element: <UserLikeRouts />,
			},
			{
				path: '/history',
				element: <UserHistory />,
			},
			{
				path: '/profile_page',
				element: <ProfilePage />,
			},
			{
				path: '/profile_page/statistics_page',
				element: <StatisticsPage />,
			},
			{
				path: '/profile_page/achievements_page',
				element: <AchievementsPage />,
			},
			{
				path: '/profile_page/route_history_page',
				element: <UserHistory />,
			},
			{
				path: '/profile_page/edit_profile_page',
				element: <EditProfilePage />,
			},
		],
	},
]);
