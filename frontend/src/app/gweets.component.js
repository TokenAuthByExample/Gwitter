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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var gweet_service_1 = require("./gweet.service");
var GweetsComponent = (function () {
    function GweetsComponent(router, gweetService) {
        this.router = router;
        this.gweetService = gweetService;
        this.currentText = '';
        this.charsLeft = "140";
        this.title = "Gwitter";
    }
    GweetsComponent.prototype.getGweets = function () {
        var _this = this;
        this.gweetService
            .getGweets()
            .then(function (gweets) { return _this.gweets = gweets; });
    };
    GweetsComponent.prototype.postGweet = function () {
        var _this = this;
        var currentText = this.currentText.trim();
        if (!currentText) {
            return;
        }
        this.gweetService.create(currentText)
            .then(function (gweet) {
            _this.getGweets();
            _this.currentText = "";
        });
    };
    GweetsComponent.prototype.login = function (email, password) {
        this.gweetService.login(email, password);
    };
    GweetsComponent.prototype.ngOnInit = function () {
        this.getGweets();
    };
    GweetsComponent.prototype.changed = function () {
        this.charsLeft = (140 - this.currentText.length).toString();
    };
    return GweetsComponent;
}());
GweetsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-gweets',
        templateUrl: './gweets.component.html',
        styleUrls: ['./gweets.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        gweet_service_1.GweetService])
], GweetsComponent);
exports.GweetsComponent = GweetsComponent;
//# sourceMappingURL=gweets.component.js.map