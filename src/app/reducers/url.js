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
// url.ts
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var index_1 = require('../services/index');
var feed_1 = require('./feed');
exports.ADD_URL = '[Url] add 1';
exports.ADD_URLS = '[Url] add N';
exports.DELETE_URL = '[Url] delete';
exports.UPDATE_URL = '[Url] update';
var Url = (function () {
    function Url() {
    }
    return Url;
}());
exports.Url = Url;
exports.urlReducer = function (state, action) {
    //console.log("urlReducer " + action.type);
    if (state === void 0) { state = []; }
    switch (action.type) {
        case exports.ADD_URL:
            return state.concat([
                action.payload
            ]);
        case exports.ADD_URLS:
            return action.payload;
        default:
            return state;
    }
};
var UrlService = (function () {
    function UrlService(store, _httpDataService, configService, _FeedDefinitionService) {
        this.store = store;
        this._httpDataService = _httpDataService;
        this.configService = configService;
        this._FeedDefinitionService = _FeedDefinitionService;
        this.baseUrl = this.configService.config.apiUrl + "urls";
        this.items = store.select(function (state) { return state.urls; });
    }
    // get list from local sails api server aka ../src-api
    //     host: 104.131.155.194
    //     port: 27000
    UrlService.prototype.loadItems = function () {
        var _this = this;
        var initialItems;
        this._httpDataService.getJsonPromise(this.baseUrl)
            .then(function (data) {
            var thisUrls = data;
            if (data) {
                //console.log(thisUrls);
                _this.store.dispatch({ type: exports.ADD_URLS, payload: thisUrls });
            }
            else {
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    // if response from post is equal to url
    // then it was successful
    UrlService.prototype.insertItem = function (item) {
        var _this = this;
        return this._httpDataService.postJsonData(this.baseUrl, item, null)
            .then(function (data) {
            _this._FeedDefinitionService.getFeedUrl(item);
            // TODO: what should happen if there is an error on the server/api side
            // how would I should the error? 
            //console.log("url.ts::insertItem - returned data = " + JSON.stringify(data));
            _this.loadItems();
            return data;
        })
            .catch(function (err) {
            console.log(err);
            return err;
        });
    };
    // tell store about change
    UrlService.prototype.insertToStore = function (newItem) {
        this.store.dispatch({ type: exports.ADD_URL, payload: newItem });
    };
    // delete item
    UrlService.prototype.removeItem = function (item) {
        var _this = this;
        //console.log("item deleted = " + item.url);
        return this._httpDataService.delete(this.baseUrl + '/' + item.id, null)
            .then(function (data) {
            // TODO: what should happen if there is an error on the server/api side
            // how would I should the error? 
            //console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
            _this.loadItems();
            return data;
        })
            .catch(function (err) {
            console.log(err);
            return err;
        });
    };
    UrlService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store, index_1.HttpDataService, index_1.ConfigService, feed_1.FeedDefinitionService])
    ], UrlService);
    return UrlService;
}());
exports.UrlService = UrlService;
//# sourceMappingURL=url.js.map