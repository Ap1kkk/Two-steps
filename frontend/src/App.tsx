import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout, ProtectedRoute } from '@components';
import {
	AchievementPage,
	AuthorizationPage,
	Error500Page,
	FilterDesktopPage,
	FilterMobilePage,
	MainPage,
	MapPage,
	NotFoundPage,
	ProfilePage,
	RegistrationPage,
	RoutesMobilePage,
	SettingsPage,
	StatisticPage,
} from '@pages';

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
				element: <AuthorizationPage />,
			},
			{
				path: '/registration',
				element: <RegistrationPage />,
			},
			{
				element: <ProtectedRoute isAuthenticated={true} />,
				children: [
					{
						path: '/routie',
						element: <MainPage />,
					},
					{
						path: '/map/:routeId',
						element: <MapPage />,
					},
					{
						path: '/settings',
						element: <SettingsPage />,
					},
					{
						path: '/profile',
						element: <ProfilePage />,
					},
					{
						path: '/filter',
						element: <FilterDesktopPage />,
					},
					{
						path: '/filter-mobile',
						element: <FilterMobilePage />,
					},
					{
						path: '/routes',
						element: <RoutesMobilePage />,
					},
					{
						path: '/statistic',
						element: <StatisticPage />,
					},
					{
						path: '/achievement',
						element: <AchievementPage />,
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
