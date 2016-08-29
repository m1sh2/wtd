'use strict';
// App

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: '<h1>{{title}}</h1><a routerLink="/gameplay">Play</a>',
  styleUrls: ['home.css']
})
export class Home {
  title = 'app works!';

}
