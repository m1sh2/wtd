var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
var Page = (function () {
    function Page() {
    }
    Page.prototype.open = function (content) {
        var page = $('<div/>');
        var pageContent = $('<div/>');
        var pageClose = $('<span/>');
        var body = $('body');
        pageContent.html(content)
            .addClass('page-content');
        pageClose.addClass('button')
            .addClass('page-close')
            .addClass('button-close')
            .html('&times;')
            .click(function () {
            page.animate({ left: '100%' }, 500, function () {
                page.remove();
            });
        });
        page.append(pageClose)
            .append(pageContent)
            .addClass('page')
            .css('left', '100%');
        body.append(page);
        page.animate({ left: '0%' }, 500);
    };
    return Page;
}());
Page = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], Page);
export { Page };
//# sourceMappingURL=page.js.map