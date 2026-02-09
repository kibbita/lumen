import { Route } from '@angular/router';
import { Welcome } from '../components/welcome/welcome';
import { Register } from '../components/register/register';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
import { authGuard } from '../guards/auth.guard';
import { CardNew } from '../components/card-new/card-new';

export const appRoutes: Route[] = [
    {path: '', component: Welcome},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: 'card-new', component: CardNew},
];
