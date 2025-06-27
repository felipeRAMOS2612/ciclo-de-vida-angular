import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PublicLayout } from './layouts/public/public-layout';
import { PrivateLayout } from './layouts/private/private-layout';
import { Login } from './public/login/login';

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
            }
        ],
    },
    {
        path: 'auth',
        component: PrivateLayout,
        children: [
            
        ]
    }
];
