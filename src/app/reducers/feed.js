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
require('@ngrx/core/add/operator/select');
var index_1 = require('../services/index');
var cheerio = require("cheerio");
exports.ADD_FEED = '[Feed] add 1';
exports.ADD_FEEDS = '[Feed] add N';
exports.DELETE_FEED = '[Feed] delete';
exports.FIND_FEEDS = '[Feed] find';
exports.FEED_SELECTED_ADD = '[Selected Feed] add 1';
exports.FEED_SELECTED_SELECT = '[Selected Feed] select';
var Feed = (function () {
    function Feed() {
        this.feedResponse = new FeedResponse();
        this.feedDefinition = new FeedDefinition();
        this.urlId = "";
    }
    return Feed;
}());
exports.Feed = Feed;
var FeedDefinition = (function () {
    function FeedDefinition() {
        this.title = "";
        this.type = "";
        this.href = "";
        this.url = "";
    }
    return FeedDefinition;
}());
exports.FeedDefinition = FeedDefinition;
var FeedResponse = (function () {
    function FeedResponse() {
        this.status = "";
        this.feed = new FeedInfo();
        this.items = [];
    }
    return FeedResponse;
}());
exports.FeedResponse = FeedResponse;
var Article = (function () {
    function Article() {
        this.title = "";
        this.link = "";
        this.guid = "";
        this.pubDate = "";
        this.categories = [];
        this.author = "";
        this.thumbnail = "";
        this.description = "";
        this.content = "";
    }
    return Article;
}());
exports.Article = Article;
var FeedInfo = (function () {
    function FeedInfo() {
        this.title = "";
        this.link = "";
        this.author = "";
        this.description = "";
        this.image = "";
        this.type = "";
    }
    return FeedInfo;
}());
exports.FeedInfo = FeedInfo;
exports.feedReducer = function (state, action) {
    //console.log("feedReducer " + action.type);
    //console.log(state);
    //console.log(action.payload);
    if (state === void 0) { state = []; }
    switch (action.type) {
        case exports.ADD_FEED:
            return state.concat([
                action.payload
            ]);
        case exports.ADD_FEEDS:
            return action.payload;
        case exports.FIND_FEEDS:
            return action.payload;
        default:
            return state;
    }
};
exports.selectedFeedReducer = function (state, action) {
    if (state === void 0) { state = new Feed(); }
    switch (action.type) {
        case exports.FEED_SELECTED_ADD:
            return action.payload;
        case exports.FEED_SELECTED_SELECT:
        default:
            return state;
    }
};
var FeedDefinitionService = (function () {
    function FeedDefinitionService(_httpDataService, configService, store) {
        //this.items = store.select(state => state.feeds);
        this._httpDataService = _httpDataService;
        this.configService = configService;
        this.store = store;
        this.feedDefinition = [];
    }
    // websiteUrl's html might contain rss link
    FeedDefinitionService.prototype.getFeedUrl = function (websiteUrl) {
        this._httpDataService.getHtmlPromise(websiteUrl)
            .then(function (data) {
            //Loop through every link
            //$('link').attr('type', 'application/rss+xml').each(function(i, link){
            //  console.log(link.attr('href'));
            //});
        });
    };
    FeedDefinitionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.HttpDataService, index_1.ConfigService, store_1.Store])
    ], FeedDefinitionService);
    return FeedDefinitionService;
}());
exports.FeedDefinitionService = FeedDefinitionService;
/**
 * Represents Feed
 * https://www.becompany.ch/en/blog/tech/2016/09/19/angular2-rss-reader.html
 */
var FeedResponseService = (function () {
    function FeedResponseService(_httpDataService, configService, store) {
        //this.items = store.select(state => state.feeds);
        this._httpDataService = _httpDataService;
        this.configService = configService;
        this.store = store;
        this.rssToJsonServiceBaseUrl = this.configService.config.rssProxy;
    }
    FeedResponseService.prototype.getFeed = function (urlId) {
        console.log("getFeed 0, urlId = " + urlId);
        this.store.select(function (state) { return state.feeds; }).subscribe(function (feeds) {
            console.log(feeds ? "getFeed 1 feeds not empty " + urlId : "getFeed 1 feeds empty " + urlId);
            feeds.map(function (feed) {
                if (feed.urlId === urlId) {
                    console.log(feed ? "getFeed 2 feed not empty " + urlId : "getFeed 2 feed empty " + urlId);
                    return feed;
                }
            });
        });
    };
    // add new feed to state, set new feed as selected feed
    FeedResponseService.prototype.addFeed = function (id, url) {
        var _this = this;
        console.log("addFeed 0, id = " + id);
        if (!url)
            return;
        var existingFeed = this.getFeed(id);
        console.log((existingFeed && existingFeed.lenght) ? "addFeed 1 existingFeed not empty" : "addFeed existingFeed empty");
        // if feed is already in store, don't go fetch it
        if (existingFeed)
            return;
        // get feeds
        this._httpDataService.getJsonPromise(this.rssToJsonServiceBaseUrl + url)
            .then(function (data) {
            //console.log(this.rssToJsonServiceBaseUrl + url);
            //console.log(JSON.stringify(data));
            var newfeed = new Feed();
            newfeed.urlId = id;
            var feedResponseItem = new FeedResponse();
            feedResponseItem.status = data.status;
            feedResponseItem.items = data.items;
            feedResponseItem.feed = data.feed;
            newfeed.feedResponse = feedResponseItem;
            var feedDefinition = new FeedDefinition();
            feedDefinition.url = url;
            newfeed.feedDefinition = feedDefinition;
            // assume new feed is selected feed
            _this.store.dispatch({ type: exports.ADD_FEED, payload: newfeed });
            _this.store.dispatch({ type: exports.FEED_SELECTED_ADD, payload: newfeed });
        }).catch(function (err) {
            console.log(err);
        });
    };
    FeedResponseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.HttpDataService, index_1.ConfigService, store_1.Store])
    ], FeedResponseService);
    return FeedResponseService;
}());
exports.FeedResponseService = FeedResponseService;
//# sourceMappingURL=feed.js.map