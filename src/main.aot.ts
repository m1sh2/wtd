import './polyfills';
import './vendors';

import { enableProdMode } from '@angular/core';
import { Log } from 'ng2-logger/ng2-logger';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

enableProdMode();
Log.setProductionMode();

platformBrowserDynamic().bootstrapModule(AppModule);