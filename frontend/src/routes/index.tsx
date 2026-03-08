import { Routes, Route, Navigate } from 'react-router-dom';
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

export const Index = () => {
	return (
		<Routes>
			<Route path='/login' element={<Authorization />} />
			<Route path='/register' element={<Register />} />
			<Route path='/register/preferences' element={<Preferences />} />

			<Route element={<Layout />}>
				<Route path='/' element={<Navigate to='/main_page' replace />} />

				<Route path='/admin' element={<Admin_workbench />} />

				<Route path='/main_page' element={<MainPage />} />
				<Route path='/main_page/recomendation' element={<Recommendation />} />
				<Route path='/main_page/popular' element={<PopularRouts />} />
				<Route path='/main_page/search_page' element={<SearchRouts />} />
				<Route path='/main_page/history' element={<UserHistory />} />

				<Route path='/map/:routeId' element={<RoutesOnMap />} />

				<Route path='/favourites' element={<UserLikeRouts />} />
				<Route path='/history' element={<UserHistory />} />

				<Route path='/profile_page' element={<Profile />} />
				<Route path='/profile_page/statistics_page' element={<StatisticsPage />} />
				<Route path='/profile_page/achievements_page' element={<Achievements />} />
				<Route path='/profile_page/route_history_page' element={<UserHistory />} />
				<Route path='/profile_page/edit_profile_page' element={<EditProfile />} />
			</Route>
		</Routes>
	);
};