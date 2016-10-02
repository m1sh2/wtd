'use strict';
// Settings

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {
  title = 'Settings';

  constructor(
    private router: Router
  ) {
    
  }
}
