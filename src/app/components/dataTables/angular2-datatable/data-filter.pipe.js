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
var _ = require("lodash");
var core_1 = require("@angular/core");
var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return row.url.indexOf(query) > -1; });
        }
        return array;
    };
    DataFilterPipe = __decorate([
        core_1.Pipe({
            name: "dataFilter"
        }), 
        __metadata('design:paramtypes', [])
    ], DataFilterPipe);
    return DataFilterPipe;
}());
exports.DataFilterPipe = DataFilterPipe;
var FeedParserPipe = (function () {
    function FeedParserPipe() {
    }
    FeedParserPipe.prototype.feedPropertyTitle = function (temp) {
        if (temp.includes(' - Atom')) {
            return temp.replace(/ - Atom/ig, "");
        }
        else if (temp.includes(' - Rss')) {
            return temp.replace(/ - Rss/ig, "");
        }
        else {
            return temp;
        }
    };
    // validate that feed is valid array and has values
    FeedParserPipe.prototype.validFeedAndProperty = function (temp, arrNum, prop) {
        if (Array.isArray(temp)
            && temp.length > 0 &&
            temp[arrNum] &&
            temp[arrNum].hasOwnProperty(prop)) {
            return true;
        }
        else {
            return false;
        }
    };
    // get property value
    FeedParserPipe.prototype.feedProperty = function (temp, arrNum, prop) {
        arrNum = !arrNum ? 0 : arrNum - 1;
        if (this.validFeedAndProperty(temp, arrNum, prop)) {
            return temp[arrNum][prop];
        }
        else {
            return;
        }
    };
    FeedParserPipe.prototype.transform = function (item, feedProperty, arrNum) {
        switch (feedProperty) {
            case 'found':
                // assumes if feeds is there then it must have children
                var feedsFound = (item.feeds && item.feeds.length > 0) ? true : false;
                //console.log("feedsFound = " + feedsFound);
                return feedsFound;
            case 'title':
                if (item.feeds && item.feeds.length > 0) {
                    var current = this.feedProperty(item.feeds, arrNum, feedProperty);
                    var newTitle = this.feedPropertyTitle(current);
                    newTitle = !newTitle ? '<null>' : newTitle;
                    //console.log('pipe title = ' + newTitle);
                    return this.feedPropertyTitle(newTitle);
                }
                else {
                    //console.log('pipe title from item '  + item.url);
                    return item.url;
                }
            case 'href':
                var href = this.feedProperty(item.feeds, arrNum, feedProperty);
                //console.log('pipe href = ' + href);
                return href;
            default:
                //console.log('returned nothing from data-filter.pipe');
                return;
        }
    };
    FeedParserPipe = __decorate([
        core_1.Pipe({
            name: "feedParser"
        }), 
        __metadata('design:paramtypes', [])
    ], FeedParserPipe);
    return FeedParserPipe;
}());
exports.FeedParserPipe = FeedParserPipe;
//# sourceMappingURL=data-filter.pipe.js.map