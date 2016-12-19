var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninApi } from './signin.api';
import { User } from '../user.interface';
import { Log } from 'ng2-logger/ng2-logger';
var log = Log.create('SigninCmp()');
log.color = 'orange';
var SigninCmp = (function () {
    function SigninCmp(signinApi, router) {
        this.signinApi = signinApi;
        this.router = router;
    }
    SigninCmp.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.signinForm);
        var user = new User(this.signinForm.value.email, this.signinForm.value.password);
        this.signinApi
            .signin(user)
            .subscribe(function (data) {
            log.i('onSubmit() success', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/');
            // let taskUpdated = this.tasks.filter(_task => _task.taskId === task.taskId);
            // if (taskUpdated.length === 0) {
            //   log.w('onSubmit() success->taskId incorrect');
            // } else {
            //   taskUpdated[0].name = task.name;
            // }
        }, function (error) {
            // log.i('onSubmit() error', error);
        });
        this.signinForm.reset();
    };
    SigninCmp.prototype.ngOnInit = function () {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    return SigninCmp;
}());
SigninCmp = __decorate([
    Component({
        selector: 'user-signin',
        templateUrl: './signin.html'
    }),
    __metadata("design:paramtypes", [SigninApi, Router])
], SigninCmp);
export { SigninCmp };
//# sourceMappingURL=signin.cmp.js.map