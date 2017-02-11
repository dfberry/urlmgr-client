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
var FirstFeedPipe = (function () {
    function FirstFeedPipe() {
    }
    FirstFeedPipe.prototype.transform = function (items) {
        //console.log("FirstFeedPipe: transform");
        return JSON.stringify(items);
        /*return items.filter(item => {
            //console.log("FirstFeedPipe: return");
          if(item && item.feeds && item.feed.length>0){
              //console.log("FirstFeedPipe: " + item.feeds[0].href)
            return item.feeds[0].href;
          }
        });*/
    };
    FirstFeedPipe = __decorate([
        core_1.Pipe({ name: 'firstFeed' }), 
        __metadata('design:paramtypes', [])
    ], FirstFeedPipe);
    return FirstFeedPipe;
}());
exports.FirstFeedPipe = FirstFeedPipe;
//# sourceMappingURL=firstFeed.js.map