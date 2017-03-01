"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var GweetService = (function () {
    function GweetService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.gweetsUrl = 'http://localhost:8000/gweets/';
        this.usersUrl = 'http://localhost:8000/get_auth_token/';
        this.token = "";
    }
    GweetService.prototype.getGweets = function () {
        return this.http
            .get("" + this.gweetsUrl)
            .toPromise()
            .then(function (response) { return response.json().results; })
            .catch(this.handleError);
    };
    GweetService.prototype.create = function (post) {
        var auth_headers = this.headers;
        auth_headers.append("Authorization", "Token " + this.token);
        console.log(auth_headers);
        return this.http
            .post("" + this.gweetsUrl, JSON.stringify({ text: post }), { headers: auth_headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    GweetService.prototype.login = function (username, password) {
        var _this = this;
        this.http
            .post(this.usersUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.token = res.json().token; })
            .catch(this.handleError);
        this.user = username;
    };
    GweetService.prototype.handleError = function (error) {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    };
    GweetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GweetService);
    return GweetService;
}());
exports.GweetService = GweetService;
//# sourceMappingURL=gweet.service.js.map