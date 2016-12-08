import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class Page {
  open(content) {
    let page = $('<div/>');
    let pageContent = $('<div/>');
    let pageClose = $('<span/>');
    let body = $('body');

    pageContent.html(content)
      .addClass('page-content');
    
    pageClose.addClass('button')
      .addClass('page-close')
      .addClass('button-close')
      .html('&times;')
      .click(() => {
        page.animate({left: '100%'}, 500, () => {
          page.remove();
        })
      });

    page.append(pageClose)
      .append(pageContent)
      .addClass('page')
      .css('left', '100%');

    body.append(page);
    page.animate({left: '0%'}, 500);
  }
}