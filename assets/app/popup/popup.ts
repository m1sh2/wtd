import { Component, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'popup',
  templateUrl: './popup.html',
  styleUrls: ['./popup.css']
})
export class Popup {
  @Input() options: any = {
    isOpen: false,
    title: '',
    content: ''
  };
  popupContent: string = 'Content'

  isContentString() {
    const condition = typeof this.options.content === 'string';
    return condition;
  }

  isContentObject() {
    const condition = typeof this.options.content === 'object';
    return condition;
  }
}