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
 * Show Dashboard
 *
 *
*/
var DashboardComponent = (function () {
    function DashboardComponent(store) {
        this.store = store;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        //console.log("UrlFeedDetailComponent::ngOnInit " );
    };
    DashboardComponent.prototype.ngOnChanges = function (changes) {
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            template: "\n   <!--dashboard begin -->\n   <navigation></navigation>\n   <url-mgr></url-mgr>\n   <!--dashboard end -->\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map