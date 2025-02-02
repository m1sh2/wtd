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
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Log } from 'ng2-logger/ng2-logger';
var log = Log.create('SigninApi()');
log.color = 'darkgreen';
var SigninApi = (function () {
    function SigninApi(http) {
        this.http = http;
        this.users = [];
        log.d('constructor()', API);
    }
    SigninApi.prototype.signin = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(API + 'user/signin', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return SigninApi;
}());
SigninApi = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], SigninApi);
export { SigninApi };
//# sourceMappingURL=signin.api.js.map