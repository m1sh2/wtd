var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var Popup = (function () {
    function Popup() {
        this.options = {
            isOpen: false,
            title: '',
            content: ''
        };
        this.popupContent = 'Content';
    }
    Popup.prototype.isContentString = function () {
        var condition = typeof this.options.content === 'string';
        return condition;
    };
    Popup.prototype.isContentObject = function () {
        var condition = typeof this.options.content === 'object';
        return condition;
    };
    return Popup;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], Popup.prototype, "options", void 0);
Popup = __decorate([
    Component({
        selector: 'popup',
        templateUrl: './popup.html',
        styleUrls: ['./popup.css']
    }),
    __metadata("design:paramtypes", [])
], Popup);
export { Popup };
//# sourceMappingURL=popup.js.map