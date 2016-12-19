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
import { SignupApi } from './signup.api';
import { User } from '../user.interface';
import { Log } from 'ng2-logger/ng2-logger';
var log = Log.create('SignupCmp()');
log.color = 'orange';
var SignupCmp = (function () {
    function SignupCmp(signupApi) {
        this.signupApi = signupApi;
    }
    SignupCmp.prototype.ngOnInit = function () {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SignupCmp.prototype.onSubmit = function () {
        console.log(this.signupForm);
        var user = new User(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName);
        this.signupApi
            .signup(user)
            .subscribe(function (data) {
            log.i('onSubmit() success', data);
            // let taskUpdated = this.tasks.filter(_task => _task.taskId === task.taskId);
            // if (taskUpdated.length === 0) {
            //   log.w('onSubmit() success->taskId incorrect');
            // } else {
            //   taskUpdated[0].name = task.name;
            // }
        }, function (error) {
            // log.i('onSubmit() error', error);
        });
        this.signupForm.reset();
    };
    return SignupCmp;
}());
SignupCmp = __decorate([
    Component({
        selector: 'user-signup',
        templateUrl: './signup.html'
    }),
    __metadata("design:paramtypes", [SignupApi])
], SignupCmp);
export { SignupCmp };
//# sourceMappingURL=signup.cmp.js.map