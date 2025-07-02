import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PublicLayout } from './layouts/public/public-layout';
import { PrivateLayout } from './layouts/private/private-layout';
import { Login } from './public/login/login';
import { Register } from './public/register/register';
import { Dashboard } from './auth/dashboard/dashboard';
import { Events } from './auth/events/events';
import { Profile } from './auth/profile/profile';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            },
        ],
    },
    {
        path: 'auth',
        component: PrivateLayout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'eventos',
                component: Events
            },  
            {
                path: 'perfil',
                component: Profile
            }
        ]
    }
];
