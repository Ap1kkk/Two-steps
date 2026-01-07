import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Authorization',
        component: () => import('@/components/views/authorization/Authorization.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/views/authorization/Register.vue')
    },
    {
        path: '/register/preferences',
        name: 'Preferences',
        component: () => import('@/components/views/preferences/Preferences.vue')
    },
    {
        path: '/main_page',
        name: 'MainPage',
        component: () => import('@/components/views/main-page/MainPage.vue')
    },
    {
        path: '/profile_page',
        name: 'Profile',
        component: () => import('@/components/views/profile/ProfilePage.vue')
    },
    {
        path: '/favourites',
        name: 'Favourites',
        component: () => import('@/components/views/favourites/Favourites.vue')
    },
    {
        path: '/map/:routeId?',
        name: 'Map',
        component: () => import('@/components/views/map/Map.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router