import { Route } from '@angular/router';
import { Welcome } from '../components/welcome/welcome';
import { Register } from '../components/register/register';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
import { authGuard } from '../guards/auth.guard';
import { CardNew } from '../components/card-new/card-new';
import { AppLayout } from './layout/app-layout/app-layout';
import { PublicLayout } from './layout/public-layout/public-layout';

export const appRoutes: Route[] = [

  // 🌐 RUTAS PUBLICAS (SIN SIDENAV)
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Welcome },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },

  // 🔐 RUTAS PRIVADAS (CON SIDENAV)
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'card-new', component: CardNew },
    ],
  },

];