'use strict';
// Routing

import {
  provideRouter,
  RouterConfig
} from '@angular/router';

import { Home } from './mods/home/home';
import { Gameplay } from './mods/gameplay/gameplay';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'gameplay',
    component: Gameplay
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
