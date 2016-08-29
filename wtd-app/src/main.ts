'use strict';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, environment, appRouterProviders } from './app/';

const providers = [
  appRouterProviders,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
];

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, providers);
