'use strict';
// Routing

import {
  provideRouter,
  RouterConfig
} from '@angular/router';

import { Home } from './pages/home/home';
import { Gameplay } from './pages/gameplay/gameplay';
import { Credits } from './pages/credits/credits';
import { Settings } from './pages/settings/settings';
import { Exit } from './pages/exit/exit';
import { Levels } from './pages/levels/levels';

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
    path: 'gameplay/:levelId',
    component: Gameplay
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: 'credits',
    component: Credits
  },
  {
    path: 'exit',
    component: Exit
  },
  {
    path: 'levels',
    component: Levels
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
