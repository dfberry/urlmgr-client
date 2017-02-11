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
var forms_1 = require('@angular/forms');
var index_1 = require('../../../reducers/index');
var validUrl = require('valid-url');
/**************************************************************************
 *
 * Insert New Url
 *
 *
*/
var UrlNewComponent = (function () {
    function UrlNewComponent(urlService, builder) {
        this.urlService = urlService;
        this.builder = builder;
        this.url = new index_1.Url();
        //console.log('UrlNewComponent::constructor');
        this.newForm = this.builder.group({
            httpUrlValue: ['', forms_1.Validators.compose([forms_1.Validators.required, this.checkIfUrl])]
        });
        this.httpUrlValue = this.newForm.controls['httpUrlValue'];
    }
    UrlNewComponent.prototype.ngOnInit = function () {
        //console.log("UrlNewComponent ngOnInit");
    };
    UrlNewComponent.prototype.validForm = function () {
        //console.log("validForm this.httpUrlValue.valid = " + this.httpUrlValue.valid);
        if (this.httpUrlValue.valid)
            return true;
    };
    UrlNewComponent.prototype.save = function () {
        if (this.validForm()) {
            //console.log('UrlNewComponent::save');
            this.url.url = this.httpUrlValue.value;
            //console.log('this.url ' + JSON.stringify(this.url));
            // insert new url name via service
            this.urlService.insertItem(this.url)
                .then(function (data) { return console.log("save data = " + JSON.stringify(data)); })
                .catch(function (err) { return console.log("save err = " + JSON.stringify(err)); });
        }
    };
    // valid url
    UrlNewComponent.prototype.checkIfUrl = function (fieldControl) {
        var thisUrl = fieldControl.value;
        //console.log('UrlNewComponent::checkValidUrl ' + thisUrl);
        var isValid = validUrl.isUri(thisUrl);
        //console.log(thisUrl + " isValid = " + isValid);
        return isValid ? null : { invalidUrl: true };
    };
    UrlNewComponent = __decorate([
        core_1.Component({
            selector: 'url-new',
            template: "\n  <form [formGroup]=\"newForm\" (submit)=\"save()\">\n      <input id=\"httpUrlValue\" type=\"text\" formControlName=\"httpUrlValue\" placeholder=\"Add a url\" />\n      <div *ngIf=\"(!httpUrlValue.valid && !httpUrlValue.pristine)\">\n        <p *ngIf=\"httpUrlValue.hasError('required')\">httpUrlValue is required</p>\n        <p *ngIf=\"httpUrlValue.hasError('invalidUrl')\">Url is not valid</p>\n      </div>\n      <button type=\"submit\" [disabled]=\"!newForm.valid\">Add</button>\n  </form>\n  <!--\n   <pre> newForm.value = {{ newForm.value | json }} </pre>\n   <pre> httpUrlValue.valid = {{ httpUrlValue.valid }} </pre>\n  <div>Valid ={{httpUrlValue.valid}}</div>\n        <div>Pristine ={{httpUrlValue.pristine}}</div>\n        <div>Touch ={{httpUrlValue.touched}}</div>\n  -->\n  ",
            providers: []
        }), 
        __metadata('design:paramtypes', [index_1.UrlService, forms_1.FormBuilder])
    ], UrlNewComponent);
    return UrlNewComponent;
}());
exports.UrlNewComponent = UrlNewComponent;
/**************************************************************************
 *
 * Remove Url
 *
 *
*/
var UrlRemoveComponent = (function () {
    function UrlRemoveComponent(urlService, builder) {
        this.urlService = urlService;
        this.builder = builder;
    }
    UrlRemoveComponent.prototype.remove = function () {
        if (this.url.id) {
            //console.log('UrlNewComponent::remove');
            this.urlService.removeItem(this.url);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Url)
    ], UrlRemoveComponent.prototype, "url", void 0);
    UrlRemoveComponent = __decorate([
        core_1.Component({
            selector: 'url-remove',
            template: "\n    <button (click)=\"remove(url)\" class=\"btn btn-danger\">x</button>\n  ",
            providers: []
        }), 
        __metadata('design:paramtypes', [index_1.UrlService, forms_1.FormBuilder])
    ], UrlRemoveComponent);
    return UrlRemoveComponent;
}());
exports.UrlRemoveComponent = UrlRemoveComponent;
/****************************************************************
 *
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 *
 *
 */
var angular2DataTableComponent = (function () {
    function angular2DataTableComponent() {
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
    }
    angular2DataTableComponent.prototype.ngOnInit = function () {
        //console.log("dataTable");
    };
    angular2DataTableComponent.prototype.ngOnChanges = function (changes) { };
    angular2DataTableComponent.prototype.toInt = function (num) {
        return +num;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], angular2DataTableComponent.prototype, "rows", void 0);
    angular2DataTableComponent = __decorate([
        core_1.Component({
            selector: 'angular2DataTable',
            template: "\n<div class=\"container-fluid\">\n    <div class=\"col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2\">\n\n        <div class=\"page-header\">\n        </div>\n\n        <div class=\"row\">\n            <h2 class=\"col-xs-10\">Urls</h2>\n            <div class=\"col-xs-2\">\n                <label class=\"label-control\">Rows on page</label>\n                <select class=\"form-control input-sm\" [(ngModel)]=\"rowsOnPage\">\n                    <option [ngValue]=\"5\">5</option>\n                    <option [ngValue]=\"10\">10</option>\n                    <option [ngValue]=\"15\">15</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\"><url-new></url-new></div>\n\n            <table class=\"table table-striped\" \n                    [mfData]=\"rows | dataFilter : filterQuery\" \n                    #mf=\"mfDataTable\"\n                   [mfRowsOnPage]=\"rowsOnPage\" \n                   [(mfSortBy)]=\"sortBy\" \n                   [(mfSortOrder)]=\"sortOrder\">\n                <thead>\n                <tr>\n                    <th colspan=\"5\">\n                        Filter by name:\n                        <input class=\"form-control\" [(ngModel)]=\"filterQuery\"/>\n                    </th>\n                </tr>\n                <tr  class=\"panel-heading\">\n                    <th style=\"width: 10%\"></th>\n                    <th style=\"width: 20%\">\n                        <mfDefaultSorter by=\"createdAt\">Date added</mfDefaultSorter>\n                    </th>\n                    <th style=\"width: 10%\">\n                        <mfDefaultSorter by=\"feeds\">feed</mfDefaultSorter>\n                    </th>\n                    <th style=\"width: 40%\">\n                        <mfDefaultSorter by=\"status\">Status</mfDefaultSorter>\n                    </th>\n                    \n\n                    <!--\n                    <th style=\"width: 20%\">\n                        <mfDefaultSorter [by]=\"sortByWordLength\">Feeds Json</mfDefaultSorter>\n                    </th>\n                    -->\n                </tr>\n\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let item of mf.data\">\n                    <td>\n                        <url-remove [url]=\"item\">x</url-remove>\n                    </td>\n                    <td>{{ item.createdAt | date:\"MM/dd/yy\" }}</td>\n                    <td><url-feed-detail-link [url]=\"item\"></url-feed-detail-link></td>\n                    <td>\n                    <a href='{{item.url}}'>{{ item | feedParser:\"title\":1 }}</a>\n                    <!--\n                    {{ item.feeds | json }}\n                    -->\n                    </td>\n                </tr>\n                </tbody>\n                <tfoot>\n                <tr>\n                    <td colspan=\"5\">\n                        <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,15]\"></mfBootstrapPaginator>\n                    </td>\n                </tr>\n                </tfoot>\n            </table>\n        </div>\n    </div>\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], angular2DataTableComponent);
    return angular2DataTableComponent;
}());
exports.angular2DataTableComponent = angular2DataTableComponent;
//# sourceMappingURL=dt.component.js.map