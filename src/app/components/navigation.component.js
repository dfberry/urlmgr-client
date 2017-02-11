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
var store_1 = require('@ngrx/store');
/**************************************************************************
 *
 * Show Feeds for Url
 *
 *
*/
var NavigationComponent = (function () {
    function NavigationComponent(store) {
        this.store = store;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        //console.log("NavigationComponent::ngOnInit " );
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'navigation',
            template: "\n    <!--navigation begin -->\n    <div>\n        <a routerLink=\"/feed\" routerLinkActive=\"active\">Feeds</a> | <a routerLink=\"/url\" routerLinkActive=\"active\">Urls</a>\n    </div>\n    <!--navigation end -->\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map