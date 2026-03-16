import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from 'components/Layout';

import Authorization from 'src/pages/Authorization/Authorization';
import Register from 'src/pages/Register/Register';
import Preferences from 'src/pages/Preferences/Preferences';
import Admin_workbench from 'src/pages/admin-page/admin_workbench';
import MainPage from 'src/pages/MainPage/MainPage';
import RoutesOnMap from 'src/pages/RouteMap/RoutesOnMap';
import Recommendation from 'src/pages/Filters/Recommendation';
import UserLikeRouts from 'src/pages/UserLikeRouts/UserLikeRouts';
import PopularRouts from 'src/pages/PopularRouts/PopularRouts';
import UserHistory from 'src/pages/UserHistory/UserHistory';
import SearchRouts from 'src/pages/SearchRouts/SearchRouts';
import Profile from 'src/pages/all-profile-pages/ProfilePage/ProfilePage';
import StatisticsPage from 'src/pages/all-profile-pages/StatisticsPage/StatisticsPage';
import Achievements from 'src/pages/all-profile-pages/AchievementsPage/AchievementsPage';
import EditProfile from 'src/pages/all-profile-pages/EditProfilePage/EditProfilePage';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Authorization />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/register/preferences',
		element: <Preferences />,
	},
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/main_page' replace />,
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
				element: <RoutesOnMap />,
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
				element: <Profile />,
			},
			{
				path: '/profile_page/statistics_page',
				element: <StatisticsPage />,
			},
			{
				path: '/profile_page/achievements_page',
				element: <Achievements />,
			},
			{
				path: '/profile_page/route_history_page',
				element: <UserHistory />,
			},
			{
				path: '/profile_page/edit_profile_page',
				element: <EditProfile />,
			},
		],
	},
]);