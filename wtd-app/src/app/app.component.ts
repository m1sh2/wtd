'use strict';
// App

import { Component, ViewEncapsulation } from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RoutesRecognized
} from '@angular/router';

import { Popup } from './mods/popup/popup';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, Popup],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Immunitet';
  isPopupOpened: boolean = false;
  isBtnBack: boolean = false;
  action: any;

  menuControlItems: Array<any>;
  
  constructor(
    private popup: Popup,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    // popup.isOpen = true;
    this.subscribeRoute();
  }

  ngOnInit() {

  }

  subscribeRoute() {
    // this.router.subscribe( params => {
    //   console.warn(params)
    // })
    let self = this;
    this.router.events.subscribe( event => {
      
      if(event instanceof NavigationEnd) {
        const url = event.url;
        // console.warn(url);
        if (url === '/home' || url.substr(0, 9) === '/gameplay') {
          self.isBtnBack = false;
        } else {
          self.isBtnBack = true;
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  openPopup(msg) {
    // this.popup.open(msg);
    this.action = msg;
    this.isPopupOpened = true;
    this.sendAction();
  }

  receiveAction(act) {
    console.warn(act);
    switch(act) {
      case 'closePopup':
        this.isPopupOpened = false;
        break;
    }
  }

  sendAction() {
    return this.action;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
