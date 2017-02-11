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
var router_1 = require('@angular/router');
var FeedMgrComponent = (function () {
    function FeedMgrComponent(feedResponseService, route, store) {
        this.feedResponseService = feedResponseService;
        this.route = route;
        this.store = store;
        this.selectedFeed = new index_1.Feed();
        this.feeds = new Array();
    }
    FeedMgrComponent.prototype.ngOnInit = function () {
        /*
            this.urlId = this.route.snapshot.params['id'];
            this.feedUrl = this.route.snapshot.params['url'];
        
            if (this.feedUrl && this.urlId){
        
              // set selectedFeed
              this.feedResponseService.addFeed(this.urlId, this.feedUrl);
              this.store.select(state => state.selectedFeed)
                .distinctUntilChanged()
                .subscribe(selectedFeed => this.onEmitted(selectedFeed));
            }
            */
        var _this = this;
        // get all feeds
        this.store.select(function (state) { return state.feeds; })
            .distinctUntilChanged()
            .subscribe(function (feeds) { return _this.onEmittedFeeds(feeds); });
    };
    // executed once user data arrives from the store
    //public onEmitted(data:Feed){
    //  this.selectedFeed = data;
    //this.printOutState("feeds", this.feeds);
    //}
    // executed once user data arrives from the store
    FeedMgrComponent.prototype.onEmittedFeeds = function (data) {
        this.feeds = data;
        //this.printOutState("feeds", this.feeds);
    };
    // DEBUG
    FeedMgrComponent.prototype.printOutState = function (arrName, arr) {
        for (var i = 0; i < arr.length; i++) {
        }
    };
    FeedMgrComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    FeedMgrComponent = __decorate([
        core_1.Component({
            selector: 'feed-mgr',
            template: "\n    <span>feed-mgr</span>\n    \n    <feed-list [feeds]=\"feeds\"></feed-list>\n  ",
            styles: ["\n    div { width: 100%; }\n    .styledurls { background-color: #ffb3b3; }\n  "],
            providers: [index_1.FeedResponseService],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [index_1.FeedResponseService, router_1.ActivatedRoute, store_1.Store])
    ], FeedMgrComponent);
    return FeedMgrComponent;
}());
exports.FeedMgrComponent = FeedMgrComponent;
var FeedListComponent = (function () {
    function FeedListComponent(store) {
        this.store = store;
    }
    FeedListComponent.prototype.ngOnInit = function () {
        if (this.feeds) {
        }
    };
    FeedListComponent.prototype.ngOnChanges = function (changes) {
        //console.log("feeds.component.ts::FeedListComponent - ngOnChanges");
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FeedListComponent.prototype, "feeds", void 0);
    FeedListComponent = __decorate([
        core_1.Component({
            selector: 'feed-list',
            template: "\n      <b>Feeds</b>\n      <div *ngFor=\"let feed of feeds\">\n        <h4>{{feed.feedResponse.feed.title }}</h4>\n        <div *ngFor=\"let item of feed.feedResponse.items\">\n        <span>{{item.pubDate | date }}</span>\n        <span ><a href=\"{{item.link}}\">{{item.title }}</a></span>\n        </div>\n        <hr>\n      </div>\n  ",
            styles: ["\n    div { width: 100%; }\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], FeedListComponent);
    return FeedListComponent;
}());
exports.FeedListComponent = FeedListComponent;
/**************************************************************************
 *
 * Show Feeds for Url
 *
 *
*/
var FeedResponseComponent = (function () {
    function FeedResponseComponent(store, feedResponseService, route) {
        this.store = store;
        this.feedResponseService = feedResponseService;
        this.route = route;
        this.selectedFeed = new index_1.Feed();
        this.found = false;
    }
    FeedResponseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.urlId = this.route.snapshot.params['id'];
        this.url = this.route.snapshot.params['url'];
        console.log("FeedResponseComponent " + this.urlId);
        console.log("FeedResponseComponent " + this.url);
        if (this.url && this.urlId) {
            this.selectedFeed = new index_1.Feed();
            console.log("FeedResponseComponent - addFeed");
            this.feedResponseService.addFeed(this.urlId, this.url);
        }
        // get out of state
        this.store.select(function (state) { return state.selectedFeed; })
            .distinctUntilChanged()
            .subscribe(function (data) { return _this.onFeedsEmitted(data); });
        /*
      this.store.select(state => state.selectedFeed)
        .distinctUntilChanged()
        .subscribe(data => this.onSelectedFeedEmitted(data));
        */
    };
    FeedResponseComponent.prototype.onFeedsEmitted = function (data) {
        this.selectedFeed = data;
        console.log("feed returned");
        this.found = true;
    };
    FeedResponseComponent = __decorate([
        core_1.Component({
            selector: 'feed-response',
            template: "\n   <span>feed-response<span>\n   <div *ngIf=\"found\">\n   <div *ngFor=\"let item of selectedFeed.feedResponse.items\">\n          <div ><a href=\"{{item.link}}\" > {{item.title}}</a></div>\n    </div>\n    </div>\n\n  ",
            providers: [index_1.FeedResponseService],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [store_1.Store, index_1.FeedResponseService, router_1.ActivatedRoute])
    ], FeedResponseComponent);
    return FeedResponseComponent;
}());
exports.FeedResponseComponent = FeedResponseComponent;
/**************************************************************************
 *
 * Show Feed Link - used in datatable
 *
 *
*/
var UrlFeedDetailLinkComponent = (function () {
    function UrlFeedDetailLinkComponent(store) {
        this.store = store;
        this.feedUrl = "";
        this.feedTitle = "";
    }
    UrlFeedDetailLinkComponent.prototype.ngOnInit = function () {
        if (!this.url) {
        }
        this.feedTitle = this.url.title;
        this.getFirstFeedUrl();
    };
    UrlFeedDetailLinkComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    UrlFeedDetailLinkComponent.prototype.getFirstFeedUrl = function () {
        //console.log("feed component::getFirstFeedUrl ");
        if (this.url && this.url.feeds && this.url.feeds.length > 0) {
            this.feedUrl = this.url.feeds[0].href;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Url)
    ], UrlFeedDetailLinkComponent.prototype, "url", void 0);
    UrlFeedDetailLinkComponent = __decorate([
        core_1.Component({
            selector: 'url-feed-detail-link',
            template: "\n    <div *ngIf=\"feedUrl\">\n        <a [routerLink]=\"['/feed', url.id, feedUrl]\">{{feedTitle}}</a> \n    </div>\n    <div *ngIf=\"!feedUrl\">\n       {{feedTitle}}\n    </div>\n      ",
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], UrlFeedDetailLinkComponent);
    return UrlFeedDetailLinkComponent;
}());
exports.UrlFeedDetailLinkComponent = UrlFeedDetailLinkComponent;
//# sourceMappingURL=feeds.component.js.map