import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@components';
import {
	AchievementsPage,
	Admin_workbench,
	Authorization,
	EditProfilePage,
	Error500Page,
	MainPage,
	MapPage,
	NotFoundPage,
	ProfilePage,
	Recommendation,
	Registration,
	SearchRouts,
	StatisticsPage,
	UserHistory,
	UserLikeRouts,
} from '@pages';
import PopularRouts from './pages/PopularRouts/PopularRouts';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Settings } from './components/Settings/Settings';

function checkAuth(): boolean {
	const token = localStorage.getItem('accessToken');
	return !!token;
}

export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <Error500Page />,
		children: [
			{
				path: '/',
				element: <Navigate to='/routie' replace />,
			},
			{
				path: '/login',
				element: <Authorization />,
			},
			{
				path: '/registration',
				element: <Registration />,
			},
			{
				element: <ProtectedRoute isAuthenticated={true} />,
				children: [
					{
						path: '/admin',
						element: <Admin_workbench />,
					},
					{
						path: '/routie',
						element: <MainPage />,
					},
					{
						path: 'recommendation',
						element: <Recommendation />,
					},
					{
						path: '/popular',
						element: <PopularRouts />,
					},
					{
						path: '/search_page',
						element: <SearchRouts />,
					},
					{
						path: '/history',
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
						path: '/settings',
						element: <Settings />,
					},
					{
						path: '/profile',
						element: <ProfilePage />,
					},
					{
						path: '/profile/statistic',
						element: <StatisticsPage />,
					},
					{
						path: '/profile/achievement',
						element: <AchievementsPage />,
					},
					{
						path: '/profile/history',
						element: <UserHistory />,
					},
					{
						path: '/profile/edit',
						element: <EditProfilePage />,
					},
				],
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
