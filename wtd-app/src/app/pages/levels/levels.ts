'use strict';
// Exit

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './levels.html',
  styleUrls: ['./levels.css']
})
export class Levels {
  title = 'Levels';

  levels: Array<any> = [];

  constructor(
    private router: Router
  ) {

    this.levels.push({
      name: 'Earth',
      id: 'humans-earth',
      icon: 'img/btn-back.svg',
      visible: true,
      active: false,
      done: false,
      pointsResult: 0
    });

    this.levels.push({
      name: 'Mars',
      id: 'humans-mars',
      icon: 'img/btn-shield.svg',
      visible: true,
      active: false,
      done: false,
      pointsResult: 0
    });

    this.levels.push({
      name: 'Venus',
      id: 'humans-venus',
      icon: 'img/btn-comets.svg',
      visible: true,
      active: false,
      done: false,
      pointsResult: 0
    });
  }

  selectLevel(id) {

    this.router.navigate(['/gameplay', id]);
  }
}
