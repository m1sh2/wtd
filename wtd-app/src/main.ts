'use strict';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, environment, appRouterProviders } from './app/';
import { Popup } from './app/mods/popup/popup';

const providers = [
  // routes
  appRouterProviders,
  
  // mods
  Popup,

  // ng settings
  {provide: LocationStrategy, useClass: HashLocationStrategy}
];

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, providers);
