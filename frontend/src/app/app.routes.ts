import { Route } from '@angular/router';
import { Welcome } from '../components/welcome/welcome';
import { Register } from '../components/register/register';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
import { authGuard } from '../guards/auth.guard';

export const appRoutes: Route[] = [
    {path: '', component: Welcome},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'home', component: Home, canActivate: [authGuard]},
];
