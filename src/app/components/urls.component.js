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
var index_1 = require('../reducers/index');
var store_1 = require('@ngrx/store');
require('rxjs/add/operator/toArray');
var validUrl = require('valid-url');
/**************************************************************************
 *
 * Show Url list
 *
 *
*/
var UrlMgrComponent = (function () {
    function UrlMgrComponent(urlService, store) {
        this.urlService = urlService;
        this.store = store;
    }
    UrlMgrComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log("UrlMgrComponent ngOnInit");
        // get from http, put in state
        this.urlService.loadItems();
        // get out of state
        this.store.select(function (state) { return state.urls; })
            .distinctUntilChanged()
            .subscribe(function (data) { return _this.onUrlsEmitted(data); });
    };
    // executed once user data arrives from the store
    UrlMgrComponent.prototype.onUrlsEmitted = function (data) {
        this.urls = data;
        //this.printOutState("urls", this.urls);
    };
    // DEBUG
    UrlMgrComponent.prototype.printOutState = function (arrName, arr) {
        for (var i = 0; i < arr.length; i++) {
        }
    };
    UrlMgrComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    UrlMgrComponent = __decorate([
        core_1.Component({
            selector: 'url-mgr',
            template: "\n    <!--url-mgr begin -->\n    <angular2DataTable [rows]=\"urls\"></angular2DataTable>\n    <!--url-mgr end -->\n  ",
            styles: ["\n    div { width: 100%; }\n    .styledurls { background-color: #ffb3b3; }\n  "],
            providers: [index_1.UrlService],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [index_1.UrlService, store_1.Store])
    ], UrlMgrComponent);
    return UrlMgrComponent;
}());
exports.UrlMgrComponent = UrlMgrComponent;
/**************************************************************************
 *
 * Show Individual Url values
 *
 *
*/
var UrlItemComponent = (function () {
    function UrlItemComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Url)
    ], UrlItemComponent.prototype, "url", void 0);
    UrlItemComponent = __decorate([
        core_1.Component({
            selector: 'url-detail',
            template: "\n    <span >{{url.url}}</span>\n    <span >{{url.statusDate | date : mediumDate : '-0800'}}</span>\n    <span >{{url.status}}</span>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], UrlItemComponent);
    return UrlItemComponent;
}());
exports.UrlItemComponent = UrlItemComponent;
/**************************************************************************
 *
 * Show Url list
 *
 *
*/
var UrlListComponent = (function () {
    function UrlListComponent(store) {
        this.store = store;
    }
    UrlListComponent.prototype.ngOnInit = function () {
        //console.log("UrlListComponent::ngOnInit - urls.length = " + this.urls.length);
    };
    UrlListComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UrlListComponent.prototype, "urls", void 0);
    UrlListComponent = __decorate([
        core_1.Component({
            selector: 'url-list',
            template: "\n\n  \n\n    <div class=\"styledurls\">\n      <br>\n      <b>Urls</b>\n      <div *ngFor=\"let item of urls\">\n          <url-detail [url]='item'></url-detail>\n      </div>\n        \n    \n    <url-new></url-new>  \n    </div>\n  ",
            styles: ["\n    div { width: 100%; }\n    .styledurls { background-color: #ffb3b3; }\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], UrlListComponent);
    return UrlListComponent;
}());
exports.UrlListComponent = UrlListComponent;
//# sourceMappingURL=urls.component.js.map