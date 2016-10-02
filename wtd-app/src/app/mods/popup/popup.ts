'use strict';
// Popup

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'popup',
  templateUrl: './popup.html',
  styleUrls: ['./popup.css']
})
export class Popup {
  title: string = 'app works!';
  @Input() msg: any;
  @Output() action = new EventEmitter<any>();
  closeCallback: any = undefined;

  constructor() {
    
  }

  ngOnInit() {
    console.warn('opened on init');
    this.open();
  }

  open() {
    const msg = this.msg;
    this.title = msg.title;

    console.warn('opened', msg);



    // let self = this;
    // let a = jQuery('<div/>');
    // let bg = jQuery('<div/>');
    // let cnt = jQuery('<div/>');
    // let close = jQuery('<button/>');

    // a.addClass('popup');
    // bg.addClass('popup-bg');
    // cnt.addClass('popup-cnt');

    // close.addClass('close')
    //   .html('Close')
    //   .click(function() {
    //     if (
    //       msg.hasOwnProperty('type')
    //       && (msg.type==='game-over' || msg.type==='game-victory')
    //       && msg.closeCallback instanceof Function
    //     ) {
    //       close.click(msg.closeCallback);
    //     }
    //     a.remove();
    //   });

    // if (msg.hasOwnProperty('type')) {
    //   cnt.addClass(msg.type);
    // }
    // cnt.html(msg.msg);

    // if (!!msg.title) {
    //   cnt.prepend('<h1>' + msg.title + '</h1>');
    // }
    // cnt.append(close);

    // a.append(bg);
    // a.append(cnt);

    // jQuery('body').append(a);
  }

  close() {
    console.warn('closed');
    this.action.emit('closePopup');

    if (!!this.msg.closeCallback) {
      this.msg.closeCallback();
    }
  }
}
