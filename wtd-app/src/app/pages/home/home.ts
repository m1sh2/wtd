'use strict';
// Home

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  title = 'Immunitet';
  menuItems: Array<any> = [
    {
      name: 'Play',
      url: '/levels'
    },
    {
      name: 'Settings',
      url: '/settings'
    },
    {
      name: 'Credits',
      url: '/credits'
    },
    {
      name: 'Exit',
      url: '/exit'
    }
  ];
}
