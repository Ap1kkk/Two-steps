import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Authorization from "./pages/Authorization/Authorization";
import Register from "./pages/Register/Register";
import Preferences from "./pages/Preferences/Preferences";
import { Layout } from "./components/Layout";
import Admin_workbench from "./pages/admin-page/admin_workbench";
import MainPage from "./pages/MainPage/MainPage";
import Recommendation from "./pages/Filters/Recommendation";
import PopularRouts from "./pages/PopularRouts/PopularRouts";
import SearchRouts from "./pages/SearchRouts/SearchRouts";
import UserHistory from "./pages/UserHistory/UserHistory";
import RoutesOnMap from "./pages/RouteMap/RoutesOnMap";
import UserLikeRouts from "./pages/UserLikeRouts/UserLikeRouts";
import StatisticsPage from "./pages/all-profile-pages/StatisticsPage/StatisticsPage";
import ProfilePage from "./pages/all-profile-pages/ProfilePage/ProfilePage";
import AchievementsPage from "./pages/all-profile-pages/AchievementsPage/AchievementsPage";
import EditProfilePage from "./pages/all-profile-pages/EditProfilePage/EditProfilePage";


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

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </StrictMode>
);
