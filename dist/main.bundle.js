webpackJsonp([1],{

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(6);
__webpack_require__(183);
__webpack_require__(184);
var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new Subject_1.Subject();
    }
    Broadcaster.prototype.broadcast = function (key, data) {
        console.log("broadcast.broadcast " + key + "," + data);
        this._eventBus.next({ key: key, data: data });
    };
    Broadcaster.prototype.on = function (key) {
        console.log("broadcast.on " + key);
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return Broadcaster;
}());
exports.Broadcaster = Broadcaster;


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var broadcast_1 = __webpack_require__(137);
var UrlEvent = (function () {
    function UrlEvent(broadcaster) {
        this.broadcaster = broadcaster;
    }
    UrlEvent.prototype.fire = function (data) {
        console.log("UrlEvent.fire " + data);
        this.broadcaster.broadcast(MessageEvent, data);
    };
    UrlEvent.prototype.on = function () {
        console.log("UrlEvent.on ");
        return this.broadcaster.on(MessageEvent);
    };
    return UrlEvent;
}());
UrlEvent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [broadcast_1.Broadcaster])
], UrlEvent);
exports.UrlEvent = UrlEvent;


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//import { FeedDefinition, FeedResponse } from './feed.model';

Object.defineProperty(exports, "__esModule", { value: true });
var Url = (function () {
    function Url() {
    }
    return Url;
}());
exports.Url = Url;


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(22);
__webpack_require__(185);
var store_1 = __webpack_require__(18);
//http://stackoverflow.com/questions/39849060/angular-2-router-v3-observable-guard-with-ngrx
function getState(store) {
    var state;
    store.take(1).subscribe(function (s) { return state = s; });
    console.log("getState store = " + JSON.stringify(state));
    return state;
}
// all authentication is kept in local storage - not state
var AuthGuard = (function () {
    function AuthGuard(router, store) {
        this.router = router;
        this.store = store;
    }
    AuthGuard.prototype.canActivate = function () {
        console.log("AuthGuard::canActivate");
        var state = getState(this.store);
        console.log("canActivate isAuthenticated = " + state.user.isAuthenticated);
        if (!state.user.isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return state.user.isAuthenticated;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        store_1.Store])
], AuthGuard);
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(618));
__export(__webpack_require__(617));


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () { };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        template: " \n     public home\n    "
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
// url.ts
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(21);
var index_1 = __webpack_require__(89);
__webpack_require__(97);
//import { AppState } from '../app.state';
var feed_model_1 = __webpack_require__(224);
var FeedResponseService = (function () {
    function FeedResponseService(_httpDataService, configService) {
        this._httpDataService = _httpDataService;
        this.configService = configService;
        this.baseUrl = configService.config.apiUrl + "urls/";
    }
    FeedResponseService.prototype.getFeed = function (urlId) {
        console.log("getFeed 0, urlId = " + urlId);
        /*this.store.select(state => state.feeds).subscribe(feeds => {
          console.log(feeds ? "getFeed 1 feeds not empty "  + urlId: "getFeed 1 feeds empty "+ urlId);
          feeds.map(feed => {
            
            if(feed.urlId === urlId){
              console.log(feed ? "getFeed 2 feed not empty " + urlId : "getFeed 2 feed empty " + urlId);
              return feed;
            }
          });
        });  */
    };
    // add new feed to state, set new feed as selected feed
    FeedResponseService.prototype.addFeed = function (id, url) {
        console.log("addFeed 0, id = " + id);
        if (!url)
            return;
        var existingFeed = this.getFeed(id);
        console.log((existingFeed && existingFeed.lenght) ? "addFeed 1 existingFeed not empty" : "addFeed existingFeed empty");
        // if feed is already in store, don't go fetch it
        if (existingFeed)
            return;
        // add user auth token to header
        var headers = new http_1.Headers();
        headers.set('x-access-token', this.user['token']);
        var options = {
            headers: headers,
            body: { user: this.user['id'] }
        };
        // TODO: fix this
        //let options = undefined;
        // get feeds for this url
        this._httpDataService.getJsonPromise(this.rssToJsonServiceBaseUrl + url, options)
            .then(function (data) {
            //console.log(this.rssToJsonServiceBaseUrl + url);
            //console.log(JSON.stringify(data));
            var newfeed = new feed_model_1.Feed();
            newfeed.urlId = id;
            var feedResponseItem = new feed_model_1.FeedResponse();
            feedResponseItem.status = data.status;
            feedResponseItem.items = data.items;
            feedResponseItem.feed = data.feed;
            newfeed.feedResponse = feedResponseItem;
            var feedDefinition = new feed_model_1.FeedDefinition();
            feedDefinition.url = url;
            newfeed.feedDefinition = feedDefinition;
            // assume new feed is selected feed
            //this.store.dispatch({type: ADD_FEED, payload: newfeed});
            //this.store.dispatch({type: FEED_SELECTED_ADD, payload: newfeed});
        }).catch(function (err) {
            console.log(err);
        });
    };
    return FeedResponseService;
}());
FeedResponseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.HttpDataService,
        index_1.ConfigService])
], FeedResponseService);
exports.FeedResponseService = FeedResponseService;


/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(37);
var feed_service_1 = __webpack_require__(64);
var user_model_1 = __webpack_require__(28);
var FeedTestComponent = (function () {
    function FeedTestComponent(feedService) {
        this.feedService = feedService;
        this.testForm = new forms_1.FormGroup({
            url: new forms_1.FormControl()
        });
        //this.httpUrlValue = this.testForm.controls['httpUrlValue'];
    }
    FeedTestComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    FeedTestComponent.prototype.ngOnInit = function () {
    };
    FeedTestComponent.prototype.save = function () {
        var url = this.testForm.controls["url"].value;
        console.log("saved " + url);
        //let results = this.feedService.getFeed(url, this.user);
        console.log("after getFeed2 ");
    };
    return FeedTestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], FeedTestComponent.prototype, "user", void 0);
FeedTestComponent = __decorate([
    core_1.Component({
        selector: 'feed-test',
        template: "\n   <span>feed-test<span>\n<form [formGroup]=\"testForm\" (submit)=\"save()\">\n      <input id=\"url\" type=\"text\" formControlName=\"url\" placeholder=\"Add a url\" />\n      <button type=\"submit\">Add</button>\n  </form>\n      <hr>\n<!--\n      <div *ngFor=\"let item of items\">\n              <div >{{item}}</div>\n        </div>\n        \n-->\n  <div> {{ results }}</div>\n\n  ",
        providers: [feed_service_1.FeedService]
    }),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedTestComponent);
exports.FeedTestComponent = FeedTestComponent;


/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(186);
var user_model_1 = __webpack_require__(28);
// services
//import { UrlService } from './url.service';
var feed_service_1 = __webpack_require__(64);
// state
//import { AppState } from '../app.state';
var validUrl = __webpack_require__(232);
/**************************************************************************
 *
 * Show Url list
 *
 *
*/
var UrlMgrComponent = (function () {
    function UrlMgrComponent(
        //private urlService: UrlService
        //, private store: Store<AppState>
        feedService) {
        this.feedService = feedService;
    }
    UrlMgrComponent.prototype.ngOnInit = function () {
        //console.log("url component ngOnInit");
        /*
        this.store.select(state => state.urls)
          .distinctUntilChanged()
          .subscribe(data => this.onUrlsEmitted(data));
        
      
        this.store.select(state => state.user)
          .distinctUntilChanged()
          .subscribe(data => this.onUserEmitted(data));
          */
        //this.feedService.getFeedLinkFromHtml('<h2 class="title">Hello world</h2>');
    };
    // executed once user data arrives from the store
    //public onUrlsEmitted(data:Url[]){
    //  this.urls = data;
    //}
    /*public onUserEmitted(user:User){
      console.log("urls.onUserEmitted");
  
      this.user = user;
      this.urlService.loadItems(user);
  
      console.log("urls.component onUserEmitted = " + JSON.stringify(user));
      console.log("urls.component onUserEmitted, this.user = " + JSON.stringify(this.user));
  
      // get out of state
  
    }*/
    // DEBUG
    UrlMgrComponent.prototype.printOutState = function (arrName, arr) {
        for (var i = 0; i < arr.length; i++) {
            //console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    };
    UrlMgrComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            //console.log(`UrlMgrComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    };
    return UrlMgrComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UrlMgrComponent.prototype, "urls", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], UrlMgrComponent.prototype, "user", void 0);
UrlMgrComponent = __decorate([
    core_1.Component({
        selector: 'url-mgr-component',
        template: "\n    url-mgr-component\n    <url-datatable [user]=\"user\" [rows]=\"urls\"></url-datatable>\n  ",
        styles: ["\n    div { width: 100%; }\n    .styledurls { background-color: #ffb3b3; }\n  "],
        //providers: [UrlService],
        changeDetection: core_1.ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], UrlMgrComponent);
exports.UrlMgrComponent = UrlMgrComponent;


/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(22);
var http_1 = __webpack_require__(21);
var user_model_1 = __webpack_require__(28);
var user_broadcaster_1 = __webpack_require__(66);
var auth_service_1 = __webpack_require__(65);
var config_1 = __webpack_require__(91);
var LoginComponent = (function () {
    function LoginComponent(http, authService, router, userEvent) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        this.userEvent = userEvent;
        this.username = "";
        this.password = "";
        this.authError = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("login function");
        console.log("username " + this.username);
        console.log("password " + this.password);
        var postForm = {
            email: this.username,
            password: this.password
        };
        console.log("postForm");
        return this.http.post(config_1.Configuration.urls.base + "/auth", postForm)
            .map(function (response) {
            console.log(response.json());
            var user = response.json().data;
            if (user && user.token) {
                var authenticatedUser = new user_model_1.User();
                authenticatedUser.transform(user);
                authenticatedUser["isAuthenticated"] = true;
                _this.authService.setCurrentUser(authenticatedUser);
                _this.userEvent.fire('USER_LOGON');
                _this.router.navigate(['/dashboard']);
            }
        })
            .toPromise()
            .catch(function (err) {
            console.log("http::data-getJsonPromise err " + err);
            _this.authError = err._body;
            //return Promise.reject(err)
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        template: " \n      <div class=\"col-md-6\">\n          <h2>Login</h2>\n\n          <form (submit)=\"login()\">\n              \n              <div class=\"form-group\" >\n                  <label for=\"username\">User</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\" placeholder=\"Your email here\" required />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"password\">Password</label>\n                  <input type=\"password\"  class=\"form-control\" [(ngModel)]=\"password\" name=\"password\" placeholder=\"Your password here\" required />\n              </div>\n              <div class=\"form-group\">\n                  <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\n                  <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n              </div>\n                <div *ngIf=\"authError\" class=\"form-group has-error\">\n                    <label class=\"control-label\" >{{authError}}</label>\n                </div>\n          </form>\n      </div>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http,
        auth_service_1.AuthenticationService,
        router_1.Router,
        user_broadcaster_1.UserEvent])
], LoginComponent);
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(22);
var http_1 = __webpack_require__(21);
var user_broadcaster_1 = __webpack_require__(66);
var auth_service_1 = __webpack_require__(65);
var config_1 = __webpack_require__(91);
var ProfileComponent = (function () {
    function ProfileComponent(http, authService, userEvent, router, activatedRoute) {
        this.http = http;
        this.authService = authService;
        this.userEvent = userEvent;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.user = {};
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.getCurrentUser();
        // if ?logout=true, then logout
        this.activatedRoute.queryParams.subscribe(function (data) {
            console.log('queryParams', data['logout']);
            if (data['logout'])
                _this.logout();
        });
    };
    ProfileComponent.prototype.logout = function () {
        var _this = this;
        var postForm = {
            user: this.user['id'],
        };
        var headers = new http_1.Headers();
        headers.set('x-access-token', this.user['token']);
        var options = {
            headers: headers,
            body: postForm
        };
        // remove user from ngrx storage
        this.userEvent.fire('USER_CLEAR');
        // remove user from local storage to log user out
        this.authService.removeCurrentUser();
        // clear local variable
        this.user = {};
        return this.http.delete(config_1.Configuration.urls.base + '/users/' + postForm.user + '/tokens', options)
            .map(function (response) {
            // nothing returned but 200
            console.log("logout success ");
            _this.router.navigate(['/']);
            return;
        })
            .toPromise()
            .catch(function (err) {
            console.log("logout err " + err);
            return Promise.reject(err.message);
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        template: " \n<div >\n   <h2>Profile</h2>\n   <form (submit)=\"logout()\">\n      <div>\n\n              <div class=\"form-group\" >\n                  <label for=\"firstname\">First Name</label>\n                  <input readonly type=\"text\" class=\"form-control\" value=\"{{user.firstName}}\" />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"lastname\">Last Name</label>\n                  <input readonly  type=\"text\"  class=\"form-control\" value=\"{{user.lastName}}\" />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"username\">Email</label>\n                  <input readonly  type=\"text\" class=\"form-control\" value=\"{{user.email}}\" />\n              </div>\n\n              <div class=\"form-group\" >\n                  <label for=\"lastLogin\">Last Login</label>\n                  <input readonly type=\"text\" class=\"form-control\" value=\"{{user.lastLogin}}\" />\n              </div>\n\n               <button [disabled]=\"loading\" class=\"btn btn-primary\">Logout</button>\n        </div>\n   </form>\n</div>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http,
        auth_service_1.AuthenticationService,
        user_broadcaster_1.UserEvent,
        router_1.Router,
        router_1.ActivatedRoute])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;


/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(22);
var http_1 = __webpack_require__(21);
var config_1 = __webpack_require__(91);
var RegisterComponent = (function () {
    function RegisterComponent(http, router) {
        this.http = http;
        this.router = router;
        this.lastName = "";
        this.firstName = "";
        this.email = "";
        this.password = "";
        this.asyncErrors = {
            username: {
                error: false,
                message: "user is taken"
            }
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        console.log("login function");
        console.log("email " + this.email);
        console.log("password " + this.password);
        console.log("lastName " + this.lastName);
        console.log("firstName " + this.firstName);
        var postForm = {
            email: this.email,
            password: this.password,
            lastName: this.lastName,
            firstName: this.firstName
        };
        console.log("postForm = " + JSON.stringify(postForm));
        return this.http.post(config_1.Configuration.urls.base + '/users', postForm)
            .map(function (response) {
            console.log("register success " + response.json());
            _this.router.navigate(['/login']);
        })
            .toPromise()
            .catch(function (err) {
            // duplicate error
            if (err.status == 403) {
                console.log("duplicate email entered");
                _this.asyncErrors.username.error = true;
                return Promise.reject("duplicate email entered");
            }
            console.log("register error " + err);
            return Promise.reject(err.message);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        template: " \n      <div class=\"col-md-6\">\n          <h2>Register</h2>\n          <form (submit)=\"register()\">\n              <div class=\"form-group\" >\n                  <label for=\"firstName\">First Name</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"firstName\" name=\"firstname\" placeholder=\"Your first name here\" required />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"lastName\">Last Name</label>\n                  <input type=\"text\"  class=\"form-control\" [(ngModel)]=\"lastName\" name=\"lastname\" placeholder=\"Your last name here\" required />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"email\">Email</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"email\" name=\"username\" placeholder=\"Your email here\" required />\n              </div>\n              <div class=\"form-group\" >\n                  <label for=\"password\">Password</label>\n                  <input type=\"password\"  class=\"form-control\" [(ngModel)]=\"password\" name=\"password\" placeholder=\"Your password here\" required />\n              </div>\n              <div class=\"form-group\">\n                  <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\n                  <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n              </div>\n          </form>\n      </div>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ 233:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 233;

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var platform_browser_dynamic_1 = __webpack_require__(238);
var app_module_1 = __webpack_require__(615);
var environment_1 = __webpack_require__(231);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User() {
        this.id = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.token = "";
        this.expires = "0";
        this.isAuthenticated = false;
        this.lastLogin = "0";
    }
    User.prototype.transform = function (user) {
        if (!user)
            return;
        if (user.hasOwnProperty("id"))
            this.id = user.id;
        if (user.hasOwnProperty("email"))
            this.email = user.email;
        if (user.hasOwnProperty("firstName"))
            this.firstName = user.firstName;
        if (user.hasOwnProperty("lastName"))
            this.lastName = user.lastName;
        if (user.hasOwnProperty("token"))
            this.token = user.token;
        if (user.hasOwnProperty("roles"))
            this.roles = user.roles;
        if (user.hasOwnProperty("expires"))
            this.expires = user.expires;
        if (user.hasOwnProperty("isAuthenticated"))
            this.isAuthenticated = user.isAuthenticated;
        if (user.hasOwnProperty("lastLogin"))
            this.lastLogin = user.lastLogin;
    };
    return User;
}());
exports.User = User;


/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var auth_service_1 = __webpack_require__(65);
var store_1 = __webpack_require__(18);
var app_state_1 = __webpack_require__(88);
var environment_1 = __webpack_require__(231);
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
var AppComponent = (function () {
    function AppComponent(store, authService) {
        this.store = store;
        this.authService = authService;
        this.show = false;
        console.log("AppComponent ctor");
        this.show = environment_1.environment.production ? true : false;
        console.log(__webpack_require__.i({"ENV":"development"}));
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("AppComponent ngOnInit");
        this.loadUserStateFromLocalStorage();
    };
    AppComponent.prototype.loadUserStateFromLocalStorage = function () {
        var localStorageUser = this.authService.getCurrentUser();
        if (localStorageUser && localStorageUser.isAuthenticated) {
            this.store.dispatch({ type: app_state_1.UserActions.USER_LOGIN, payload: localStorageUser });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        template: " \n    <ngrx-store-log-monitor *ngIf=\"show\" toggleCommand=\"ctrl-h\" positionCommand=\"ctrl-m\"></ngrx-store-log-monitor>\n    <div class=\"container\">\n        <navigation></navigation>\n        <router-outlet></router-outlet>\n    </div>\n    ",
        changeDetection: core_1.ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [store_1.Store,
        auth_service_1.AuthenticationService])
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
// ng
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(43);
var forms_1 = __webpack_require__(37);
var http_1 = __webpack_require__(21);
var router_1 = __webpack_require__(22);
var common_1 = __webpack_require__(15);
// ng 3rd party
__webpack_require__(56);
__webpack_require__(140);
var store_1 = __webpack_require__(18);
var store_devtools_1 = __webpack_require__(92);
var store_log_monitor_1 = __webpack_require__(246);
var angular2_datatable_1 = __webpack_require__(152);
// this app
var index_1 = __webpack_require__(222);
var index_2 = __webpack_require__(89);
var app_component_1 = __webpack_require__(614);
var app_routing_1 = __webpack_require__(616);
var app_state_1 = __webpack_require__(88);
var app_routing_authguard_1 = __webpack_require__(221);
var user_module_1 = __webpack_require__(631);
var url_module_1 = __webpack_require__(626);
var home_module_1 = __webpack_require__(619);
var userModule = user_module_1.UserModule.forRoot();
var urlModule = url_module_1.UrlModule.forRoot();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            // my code
            app_routing_1.AppRoutes,
            userModule,
            urlModule,
            home_module_1.HomeModule,
            // 3rd party code
            angular2_datatable_1.DataTableModule,
            // angular code
            common_1.CommonModule,
            router_1.RouterModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            store_1.StoreModule.provideStore({ urls: app_state_1.UrlState, /*feeds: feedReducer, selectedFeed: selectedFeedReducer, */ user: app_state_1.UserState }),
            store_devtools_1.StoreDevtoolsModule.instrumentStore({
                monitor: store_log_monitor_1.useLogMonitor({
                    visible: true,
                    position: 'right'
                })
            }),
            store_log_monitor_1.StoreLogMonitorModule
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.NavigationComponent,
            index_1.DashboardComponent
        ],
        providers: [
            index_2.HttpDataService,
            index_2.ConfigService,
            index_2.Broadcaster,
            app_routing_authguard_1.AuthGuard,
            { provide: core_1.APP_INITIALIZER, useFactory: function (config) { return function () { return config.load(); }; }, deps: [index_2.ConfigService], multi: true }
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(22);
var index_1 = __webpack_require__(222);
var home_component_1 = __webpack_require__(223);
var app_routing_authguard_1 = __webpack_require__(221);
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'dashboard', component: index_1.DashboardComponent, canActivate: [app_routing_authguard_1.AuthGuard] }
];
exports.AppRoutes = router_1.RouterModule.forRoot(appRoutes, { useHash: true });


/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(18);
var user_broadcaster_1 = __webpack_require__(66);
var url_event_1 = __webpack_require__(138);
var app_state_1 = __webpack_require__(88);
var url_service_1 = __webpack_require__(90);
/**************************************************************************
 *
 * Show Dashboard
 *
 *
*/
var DashboardComponent = (function () {
    function DashboardComponent(store, userEvent, urlEvent, urlService) {
        this.store = store;
        this.userEvent = userEvent;
        this.urlEvent = urlEvent;
        this.urlService = urlService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("dashboard component ngOnInit");
        this.registerUrlBroadcast();
        this.store.select(function (state) { return state.user; })
            .distinctUntilChanged()
            .subscribe(function (user) {
            _this.onUserChange(user);
        });
    };
    DashboardComponent.prototype.onUserChange = function (user) {
        console.log("dashboard onUserChange");
        this.user = user;
        this.onUrlEvent();
    };
    DashboardComponent.prototype.onUrlEvent = function (urlAction) {
        console.log("dashboard onUrlChange");
        // if no user or any state object's action is clear  
        if (!this.user || !this.user.email) {
            this.clearUrls();
        }
        else {
            this.loadUrls();
        }
        // so has user and isn't a clear action
    };
    DashboardComponent.prototype.clearUrls = function () {
        this.store.dispatch({ type: app_state_1.UrlActions.URL_CLEAR, payload: [] });
    };
    DashboardComponent.prototype.loadUrls = function () {
        var _this = this;
        this.urlService.loadItems(this.user).then(function (urls) {
            console.log("dashboard - load urls into state");
            _this.urls = urls;
            _this.store.dispatch({ type: app_state_1.UrlActions.URL_ADD_N, payload: urls });
        }).catch(function (err) {
            console.log("dashboard::onUrlEvent - error = " + JSON.stringify(err));
        });
    };
    DashboardComponent.prototype.registerUrlBroadcast = function () {
        var _this = this;
        this.userEvent.on()
            .subscribe(function (message) {
            console.log("dashboard url event received");
            _this.onUrlEvent(message);
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        template: "\n   <!--dashboard begin -->\n   <url-mgr-component [urls]=\"urls\" [user]=\"user\"></url-mgr-component>\n   <!--dashboard end -->\n  "
    }),
    __metadata("design:paramtypes", [store_1.Store,
        user_broadcaster_1.UserEvent,
        url_event_1.UrlEvent,
        url_service_1.UrlService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(18);
var app_state_1 = __webpack_require__(88);
var user_model_1 = __webpack_require__(28);
var auth_service_1 = __webpack_require__(65);
var user_broadcaster_1 = __webpack_require__(66);
var NavigationComponent = (function () {
    function NavigationComponent(store, authService, userEvent) {
        this.store = store;
        this.authService = authService;
        this.userEvent = userEvent;
        this.currentUser = new user_model_1.User();
    }
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get out of state
        console.log("navigation ngOnInit");
        this.registerBroadcast();
        this.store.select(function (state) { return state.user; })
            .distinctUntilChanged()
            .subscribe(function (user) { return _this.onUserChange(user); });
    };
    NavigationComponent.prototype.onUserChange = function (user) {
        console.log("navigation onUserChange");
        this.currentUser = user;
    };
    NavigationComponent.prototype.registerBroadcast = function () {
        var _this = this;
        this.userEvent.on()
            .subscribe(function (message) {
            console.log("user broadcast event = " + JSON.stringify(message));
            switch (message) {
                case "USER_LOGON":
                    // received message the user logged on
                    // need to set state to that user
                    _this.store.dispatch({ type: app_state_1.UserActions.USER_LOGIN, payload: _this.authService.getCurrentUser() });
                    return;
                case "USER_CLEAR":
                    // received message the user logged on
                    // need to set state to that user
                    _this.store.dispatch({ type: app_state_1.UserActions.USER_CLEAR, payload: undefined });
                    return;
            }
        });
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'navigation',
        template: "\n\n        <div class=\"row\">\n          <div class=\"col-md-3\">\n            <span *ngIf=\"!currentUser.isAuthenticated\"><a routerLink=\"/login\" routerLinkActive=\"active\">Login</a></span>\n            <span *ngIf=\"currentUser.isAuthenticated\"><a routerLink=\"/profile\" routerLinkActive=\"active\">{{ currentUser.email }}</a> | <a routerLink=\"/profile\" [queryParams]=\"{logout: 'true'}\" routerLinkActive=\"active\">Logout</a></span>\n          </div>\n          <div class=\"col-md-2\">\n            <span *ngIf=\"!currentUser.isAuthenticated\"> <a routerLink=\"/register\" routerLinkActive=\"active\">Register</a></span>\n            <span *ngIf=\"currentUser.isAuthenticated\"> <a routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard</a></span>\n          </div>           \n        </div>\n       \n\n  "
    }),
    __metadata("design:paramtypes", [store_1.Store,
        auth_service_1.AuthenticationService,
        user_broadcaster_1.UserEvent])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;


/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var home_component_1 = __webpack_require__(223);
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            home_component_1.HomeComponent
        ],
        exports: [home_component_1.HomeComponent]
    })
], HomeModule);
exports.HomeModule = HomeModule;


/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(21);
var ConfigService = (function () {
    function ConfigService(http) {
        this.http = http;
    }
    ConfigService.prototype.load = function () {
        var _this = this;
        //console.log('Inside Load');
        return new Promise(function (resolve) {
            _this.http.get('config.json').map(function (res) { return res.json(); })
                .subscribe(function (config) {
                //console.log('Configuration loaded...........');
                //console.log(config);
                _this.config = config;
                console.log(_this.config);
                resolve();
            });
        });
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ConfigService);
exports.ConfigService = ConfigService;
;


/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(21);
var Rx_1 = __webpack_require__(56);
var HttpDataService = (function () {
    function HttpDataService(_http) {
        this._http = _http;
    }
    HttpDataService.prototype.getJsonObservable = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json().data; })
            .catch(this._handleErrorObservable);
    };
    HttpDataService.prototype._handleErrorObservable = function (err) {
        console.log(err); //log this
        //throw(err);
        return Rx_1.Observable.of(err); // pass back for ux
    };
    /*
    getTitle(url){
        this.getJsonPromise(url)
        .then(response => {
            let html = response.text;
            var matches = html.match(/<title>(.*?)<\/title>/);
            console.log('title = ' + matches[0]);
            return matches[0];
        })
        .catch((err: any) => {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err.message)
        });
    }
    */
    HttpDataService.prototype.postWithAuthReturnText = function (url, post, user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("url = " + url);
            // post form
            //let post = {
            //    url: url,
            //    user: user.id
            // }
            post["user"] = user.id;
            // headers
            var headers = new http_1.Headers();
            headers.set('x-access-token', user['token']);
            headers.set('Content-Type', 'application/json');
            var options = {
                headers: headers
            };
            return _this.postHtmlData(url, post, options)
                .then(function (data) {
                resolve(data || "");
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    HttpDataService.prototype.getHtmlPromise = function (url) {
        console.log("getJsonPromise url = " + url);
        return this._http.get(url)
            .map(function (response) {
            //console.log(response.json());
            return response.text();
        })
            .toPromise()
            .catch(function (err) {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err);
        });
    };
    HttpDataService.prototype.getJsonPromise = function (url, options) {
        //console.log("getJsonPromise url = " + url);
        return this._http.get(url, options)
            .map(function (response) {
            //console.log(response.json());
            return response.json().data;
        })
            .toPromise()
            .catch(function (err) {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err);
        });
    };
    HttpDataService.prototype.postHtmlData = function (url, body, options) {
        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
            .map(function (res) { return res.text(); })
            .toPromise()
            .catch(function (err) {
            return Promise.reject(err);
        });
    };
    HttpDataService.prototype.postJsonData = function (url, body, options) {
        console.log("HttpDataService::postJsonData url = " + url);
        console.log("HttpDataService::postJsonData body = " + JSON.stringify(body));
        console.log("HttpDataService::postJsonData options = " + JSON.stringify(options));
        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
            .map(function (res) { return res.json(); })
            .toPromise()
            .catch(function (err) {
            console.log('http::data-postJsonData err ' + err);
            return Promise.reject(err);
        });
    };
    HttpDataService.prototype.delete = function (url, options) {
        //console.log("HttpDataService::delete url = " + url);
        return this._http.delete(url, options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .catch(function (err) {
            console.log('http::data-delete err ' + err);
            return Promise.reject(err);
        });
    };
    /*
        // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    */
    HttpDataService.prototype.getDefaultPostOptions = function () {
        var headers = new http_1.Headers();
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    return HttpDataService;
}());
HttpDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpDataService);
exports.HttpDataService = HttpDataService;


/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(74);
var core_1 = __webpack_require__(1);
var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return row.url.indexOf(query) > -1; });
        }
        return array;
    };
    return DataFilterPipe;
}());
DataFilterPipe = __decorate([
    core_1.Pipe({
        name: "dataFilter"
    })
], DataFilterPipe);
exports.DataFilterPipe = DataFilterPipe;


/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(74);
var core_1 = __webpack_require__(1);
var FeedParserPipe = (function () {
    function FeedParserPipe() {
    }
    // TODO: this is a noop - remove it's use
    FeedParserPipe.prototype.feedPropertyTitle = function (temp) {
        return temp;
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
    return FeedParserPipe;
}());
FeedParserPipe = __decorate([
    core_1.Pipe({
        name: "feedParser"
    })
], FeedParserPipe);
exports.FeedParserPipe = FeedParserPipe;


/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(22);
var feed_model_1 = __webpack_require__(224);
var feed_response_service_1 = __webpack_require__(225);
/**************************************************************************
 *
 * Show Feeds for Url
 *
 *
*/
var FeedResponseComponent = (function () {
    function FeedResponseComponent(feedResponseService, route) {
        this.feedResponseService = feedResponseService;
        this.route = route;
        this.selectedFeed = new feed_model_1.Feed();
        this.found = false;
    }
    FeedResponseComponent.prototype.ngOnInit = function () {
        this.urlId = this.route.snapshot.params['id'];
        this.url = this.route.snapshot.params['url'];
        console.log("FeedResponseComponent " + this.urlId);
        console.log("FeedResponseComponent " + this.url);
        if (this.url && this.urlId) {
            this.selectedFeed = new feed_model_1.Feed();
            console.log("FeedResponseComponent - addFeed");
            this.feedResponseService.addFeed(this.urlId, this.url);
        }
        // get out of state
        //this.store.select(state => state.selectedFeed)
        // .distinctUntilChanged()
        //  .subscribe(data => this.onFeedsEmitted(data));
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
    return FeedResponseComponent;
}());
FeedResponseComponent = __decorate([
    core_1.Component({
        selector: 'feed-response',
        template: "\n   <span>feed-response<span>\n   <div *ngIf=\"found\">\n   <div *ngFor=\"let item of selectedFeed.feedResponse.items\">\n          <div ><a href=\"{{item.link}}\" > {{item.title}}</a></div>\n    </div>\n    </div>\n\n  ",
        providers: [feed_response_service_1.FeedResponseService]
    }),
    __metadata("design:paramtypes", [feed_response_service_1.FeedResponseService,
        router_1.ActivatedRoute])
], FeedResponseComponent);
exports.FeedResponseComponent = FeedResponseComponent;


/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var user_model_1 = __webpack_require__(28);
/****************************************************************
 *
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 *
 *
 */
var UrlDataTableComponent = (function () {
    function UrlDataTableComponent() {
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
    }
    UrlDataTableComponent.prototype.ngOnInit = function () {
        //console.log("UrlNewComponent ngOnInit");
        //console.log("dt.component angular2DataTableComponent ngOnInit input this.user " + JSON.stringify(this.user));
    };
    UrlDataTableComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            //console.log(`dt.component::angular2DataTableComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    };
    UrlDataTableComponent.prototype.toInt = function (num) {
        return +num;
    };
    return UrlDataTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UrlDataTableComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], UrlDataTableComponent.prototype, "user", void 0);
UrlDataTableComponent = __decorate([
    core_1.Component({
        selector: 'url-datatable',
        template: "\n  url-datatable\n<div class=\"container-fluid\">\n    <div class=\"col-xs-12 col-md-10 col-lg-8 \">\n\n        <div class=\"page-header\">\n        </div>\n\n        <div class=\"row\">\n            <h2 class=\"col-xs-10\">Urls</h2>\n            <div class=\"col-xs-2\">\n                <label class=\"label-control\">Rows on page</label>\n                <select class=\"form-control input-sm\" [(ngModel)]=\"rowsOnPage\">\n                    <option [ngValue]=\"5\">5</option>\n                    <option [ngValue]=\"10\">10</option>\n                    <option [ngValue]=\"15\">15</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <url-new [user]=\"user\"></url-new>\n            </div>\n\n            <table class=\"table table-striped\" \n                    [mfData]=\"rows | dataFilter : filterQuery\" \n                    #mf=\"mfDataTable\"\n                   [mfRowsOnPage]=\"rowsOnPage\" \n                   [(mfSortBy)]=\"sortBy\" \n                   [(mfSortOrder)]=\"sortOrder\">\n                <thead>\n                <tr>\n                    <th>\n                        Filter by name:\n                        <input class=\"form-control\" [(ngModel)]=\"filterQuery\"/>\n                    </th>\n                </tr>\n                <tr  class=\"panel-heading\">\n                    <th></th>\n                    <th>\n                        <mfDefaultSorter by=\"title\">Title</mfDefaultSorter>\n                    </th>\n                    <th>\n                        Url\n                    </th>\n                    <th>\n                        Feeds\n                    </th>\n                </tr>\n\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let item of mf.data\">\n                    <td>\n                        <url-remove [user]=\"user\" [url]=\"item\">x</url-remove>\n                    </td>\n                        \n                    <td>{{ item.title }}\n                    </td>\n                    <td>\n                        <a href='{{item.url}}'>site</a>\n                    </td>\n                    <td>\n                        <div *ngFor=\"let feed of item.feeds; let idx = index;\">\n                            <a href=\"{{feed}}\">{{idx}} - feed</a>\n                        </div>\n                    </td>\n                </tr>\n                </tbody>\n                <tfoot>\n                <tr>\n                    <td colspan=\"5\">\n                        <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,15]\"></mfBootstrapPaginator>\n                    </td>\n                </tr>\n                </tfoot>\n            </table>\n        </div>\n    </div>\n</div>\n<!--\n<div *ngIf=\"user\" >user.id = {{user.id}}</div>\n<div *ngIf=\"!user\" >user is empty</div>\n-->\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], UrlDataTableComponent);
exports.UrlDataTableComponent = UrlDataTableComponent;


/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var forms_1 = __webpack_require__(37);
__webpack_require__(56);
var angular2_datatable_1 = __webpack_require__(152);
__webpack_require__(97);
// routes
var url_route_1 = __webpack_require__(629);
// models
var url_model_1 = __webpack_require__(139);
// pipes
var data_filter_pipe_1 = __webpack_require__(622);
var feed_parser_pipe_1 = __webpack_require__(623);
// component
var url_mgr_component_1 = __webpack_require__(227);
var url_remove_component_1 = __webpack_require__(628);
var url_new_component_1 = __webpack_require__(627);
var url_datatable_component_1 = __webpack_require__(625);
var feed_response_component_1 = __webpack_require__(624);
var feed_test_component_1 = __webpack_require__(226);
// services
var url_service_1 = __webpack_require__(90);
var url_event_1 = __webpack_require__(138);
var feed_service_1 = __webpack_require__(64);
var feed_response_service_1 = __webpack_require__(225);
var UrlModule = UrlModule_1 = (function () {
    function UrlModule() {
    }
    // singleton regardless of lazy loading
    UrlModule.forRoot = function () {
        return {
            ngModule: UrlModule_1,
            providers: [
                // exported services
                url_model_1.Url,
                url_event_1.UrlEvent,
                url_service_1.UrlService,
                feed_service_1.FeedService,
                feed_response_service_1.FeedResponseService
            ]
        };
    };
    return UrlModule;
}());
UrlModule = UrlModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_datatable_1.DataTableModule,
            forms_1.ReactiveFormsModule,
            url_route_1.UrlRoutes
        ],
        declarations: [
            // components & pipes
            url_mgr_component_1.UrlMgrComponent,
            url_remove_component_1.UrlRemoveComponent,
            url_new_component_1.UrlNewComponent,
            url_datatable_component_1.UrlDataTableComponent,
            data_filter_pipe_1.DataFilterPipe,
            feed_parser_pipe_1.FeedParserPipe,
            feed_response_component_1.FeedResponseComponent,
            feed_test_component_1.FeedTestComponent
        ],
        providers: [
            // services
            url_model_1.Url,
            url_event_1.UrlEvent,
            url_service_1.UrlService,
            feed_service_1.FeedService,
            feed_response_service_1.FeedResponseService
        ],
        exports: [
            // exported components
            url_mgr_component_1.UrlMgrComponent,
            feed_test_component_1.FeedTestComponent
        ]
    })
], UrlModule);
exports.UrlModule = UrlModule;
var UrlModule_1;


/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(37);
var user_model_1 = __webpack_require__(28);
var url_model_1 = __webpack_require__(139);
var url_service_1 = __webpack_require__(90);
var feed_service_1 = __webpack_require__(64);
var validUrl = __webpack_require__(232);
var UrlNewComponent = (function () {
    function UrlNewComponent(urlService, builder, differs, feedService) {
        this.urlService = urlService;
        this.builder = builder;
        this.differs = differs;
        this.feedService = feedService;
        this.url = new url_model_1.Url();
        this.newForm = this.builder.group({
            httpUrlValue: ['', forms_1.Validators.compose([forms_1.Validators.required, this.checkIfUrl])]
        });
        this.httpUrlValue = this.newForm.controls['httpUrlValue'];
    }
    UrlNewComponent.prototype.ngOnInit = function () {
        console.log("dt.component UrlNewComponent ngOnInit input this.user " + JSON.stringify(this.user));
    };
    UrlNewComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            console.log("dt.component::UrlNewComponent - ngOnChanges - " + propName + ": currentValue = " + cur + ", previousValue = " + prev);
        }
    };
    UrlNewComponent.prototype.validForm = function () {
        if (this.httpUrlValue.valid)
            return true;
    };
    UrlNewComponent.prototype.save = function () {
        var _this = this;
        if (this.validForm()) {
            this.url.url = this.httpUrlValue.value;
            if (this.url.url && this.user.id && this.user.token) {
                this.urlService.getUrlProperties(this.url.url, this.user)
                    .then(function (properties) {
                    if (properties["feed"])
                        _this.url["feeds"] = properties["feed"];
                    if (properties["title"])
                        _this.url["title"] = properties["title"];
                    _this.urlService.insertItem(_this.user, _this.url)
                        .then(function (data) { return console.log("save data = " + JSON.stringify(data)); })
                        .catch(function (err) { return console.log("save err = " + JSON.stringify(err)); });
                }).catch(function (error) { return console.log(error); });
            }
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
    return UrlNewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], UrlNewComponent.prototype, "user", void 0);
UrlNewComponent = __decorate([
    core_1.Component({
        selector: 'url-new',
        template: "  \n  <form [formGroup]=\"newForm\" (submit)=\"save()\">\n      <input id=\"httpUrlValue\" type=\"text\" formControlName=\"httpUrlValue\" placeholder=\"Add a url\" />\n      <div *ngIf=\"(!httpUrlValue.valid && !httpUrlValue.pristine)\">\n        <p *ngIf=\"httpUrlValue.hasError('required')\">Url is required</p>\n        <p *ngIf=\"httpUrlValue.hasError('invalidUrl')\">Url is not valid</p>\n      </div>\n      <button type=\"submit\" [disabled]=\"!newForm.valid\">Add</button>\n      <!--\n      <div *ngIf=\"user\" >user.id = {{user.id}}</div>\n      <div *ngIf=\"!user\" >user is empty</div>\n      -->\n  </form>\n  ",
        providers: []
    }),
    __metadata("design:paramtypes", [url_service_1.UrlService,
        forms_1.FormBuilder,
        core_1.KeyValueDiffers,
        feed_service_1.FeedService])
], UrlNewComponent);
exports.UrlNewComponent = UrlNewComponent;


/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(37);
var url_model_1 = __webpack_require__(139);
var user_model_1 = __webpack_require__(28);
var url_service_1 = __webpack_require__(90);
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
        if (this.url && this.user && this.user.token) {
            //console.log('UrlNewComponent::remove');
            this.urlService.removeItem(this.user, this.url);
            //.then(data => console.log("save data = " + JSON.stringify(data)))
            //.catch(err => console.log("save err = " + JSON.stringify(err)));
        }
    };
    UrlRemoveComponent.prototype.ngOnInit = function () {
        //console.log("UrlNewComponent ngOnInit");
        //console.log("dt.component UrlRemoveComponent ngOnInit input this.user " + JSON.stringify(this.user));
    };
    UrlRemoveComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            //console.log(`dt.component::UrlRemoveComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    };
    return UrlRemoveComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", url_model_1.Url)
], UrlRemoveComponent.prototype, "url", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], UrlRemoveComponent.prototype, "user", void 0);
UrlRemoveComponent = __decorate([
    core_1.Component({
        selector: 'url-remove',
        template: "\n    <button (click)=\"remove(url)\" class=\"btn btn-danger\">x</button>\n    <!--\n    <div *ngIf=\"user\" >user.id = {{user.id}}</div>\n    <div *ngIf=\"!user\" >user is empty</div>\n    -->\n  ",
        providers: []
    }),
    __metadata("design:paramtypes", [url_service_1.UrlService,
        forms_1.FormBuilder])
], UrlRemoveComponent);
exports.UrlRemoveComponent = UrlRemoveComponent;


/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(22);
var url_mgr_component_1 = __webpack_require__(227);
var feed_test_component_1 = __webpack_require__(226);
var urlRoutes = [
    { path: 'urls', component: url_mgr_component_1.UrlMgrComponent },
    { path: 'feedtest', component: feed_test_component_1.FeedTestComponent }
];
exports.UrlRoutes = router_1.RouterModule.forRoot(urlRoutes);


/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(21);
var AuthenticationComponent = (function () {
    function AuthenticationComponent(http) {
        this.http = http;
    }
    AuthenticationComponent.prototype.ngOnInit = function () { };
    return AuthenticationComponent;
}());
AuthenticationComponent = __decorate([
    core_1.Component({
        selector: 'user-auth',
        template: " \n<div  style=\"background-color:#ff00ff\">\n    <div class=\"row\">\n        <div class=\"col-xs-11 col-sm-6\">\n            <div class=\"row\">\n                <div class=\"col-xs-3 col-sm-4\">\n                    <login></login>\n                </div>\n                <div class=\"col-xs-1 col-sm-4\">\n                    &nbsp;\n                </div>\n                <div class=\"col-xs-3 col-sm-4\">\n                   <register></register>\n                </div>\n                <div class=\"col-xs-1 col-sm-4\">\n                    &nbsp;\n                </div>\n                <div class=\"col-xs-3 col-sm-4\">\n                   <profile></profile>\n                </div>            \n              </div>\n        </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationComponent);
exports.AuthenticationComponent = AuthenticationComponent;


/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var forms_1 = __webpack_require__(37);
__webpack_require__(56);
var auth_component_1 = __webpack_require__(630);
var login_component_1 = __webpack_require__(228);
var register_component_1 = __webpack_require__(230);
var profile_component_1 = __webpack_require__(229);
var user_routes_1 = __webpack_require__(632);
var auth_service_1 = __webpack_require__(65);
var user_model_1 = __webpack_require__(28);
var user_broadcaster_1 = __webpack_require__(66);
var config_1 = __webpack_require__(91);
var UserModule = UserModule_1 = (function () {
    function UserModule() {
    }
    // singleton regardless of lazy loading
    UserModule.forRoot = function () {
        return {
            ngModule: UserModule_1,
            providers: [
                auth_service_1.AuthenticationService,
                user_model_1.User,
                user_broadcaster_1.UserEvent
            ]
        };
    };
    return UserModule;
}());
UserModule = UserModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            user_routes_1.UserRoutes,
            forms_1.FormsModule
        ],
        declarations: [
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            profile_component_1.ProfileComponent,
            auth_component_1.AuthenticationComponent
        ],
        providers: [
            auth_service_1.AuthenticationService,
            user_model_1.User,
            user_broadcaster_1.UserEvent,
            config_1.Configuration
        ],
        exports: [
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            profile_component_1.ProfileComponent,
            auth_component_1.AuthenticationComponent
        ]
    })
], UserModule);
exports.UserModule = UserModule;
var UserModule_1;


/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(22);
var login_component_1 = __webpack_require__(228);
var register_component_1 = __webpack_require__(230);
var profile_component_1 = __webpack_require__(229);
var userRoutes = [
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent }
];
exports.UserRoutes = router_1.RouterModule.forRoot(userRoutes);


/***/ }),

/***/ 635:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(235);


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
// url.ts
var core_1 = __webpack_require__(1);
var index_1 = __webpack_require__(89);
//import { UrlEvent } from './url.event';
var FeedService = (function () {
    function FeedService(http, configService) {
        this.http = http;
        this.configService = configService;
        this.mimeTypes = [
            'application/rss+xml',
            'application/xml',
            'application/rdf+xml',
            'application/atom+xml',
        ];
        this.baseUrl = configService.config.apiUrl;
    }
    FeedService.prototype.searchMimeTypes = function (links) {
        var ret = [];
        this.mimeTypes.sort();
        for (var i = 0; i < links.length; i += 1) {
            if (this.mimeTypes.indexOf(links[i].type) > -1) {
                ret.push(links[i].href);
            }
        }
        console.log(ret);
        return (ret.length == 0) ? "" : ret.sort()[0];
    };
    return FeedService;
}());
FeedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.HttpDataService,
        index_1.ConfigService])
], FeedService);
exports.FeedService = FeedService;


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
// all authentication is kept in local storage - not state
var AuthenticationService = (function () {
    function AuthenticationService() {
    }
    AuthenticationService.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem('currentUser'));
    };
    AuthenticationService.prototype.setCurrentUser = function (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };
    AuthenticationService.prototype.removeCurrentUser = function () {
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var tempUser = this.getCurrentUser();
        return (tempUser && tempUser["isAuthenticated"]);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var broadcast_1 = __webpack_require__(137);
var UserEvent = (function () {
    function UserEvent(broadcaster) {
        this.broadcaster = broadcaster;
    }
    UserEvent.prototype.fire = function (data) {
        console.log("UserEvent.fire " + data);
        this.broadcaster.broadcast(MessageEvent, data);
    };
    UserEvent.prototype.on = function () {
        console.log("UserEvent.on ");
        return this.broadcaster.on(MessageEvent);
    };
    return UserEvent;
}());
UserEvent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [broadcast_1.Broadcaster])
], UserEvent);
exports.UserEvent = UserEvent;


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __webpack_require__(28);
exports.UserActions = {
    USER_LOGIN: '[User] Authorized',
    USER_CLEAR: '[User] Initialized'
};
function UserState(state, action) {
    if (state === void 0) { state = new user_model_1.User(); }
    console.log("userState state = " + JSON.stringify(state));
    console.log("userState action = " + JSON.stringify(action));
    var user = new user_model_1.User();
    switch (action.type) {
        case exports.UserActions.USER_CLEAR:
            return new user_model_1.User();
        case exports.UserActions.USER_LOGIN:
            user = action.payload;
            user.isAuthenticated = true;
            return user;
        default:
            return state;
    }
}
exports.UserState = UserState;
exports.UrlActions = {
    URL_ADD_1: '[Url] Add 1',
    URL_ADD_N: '[Url] Add N',
    URL_DELETE: '[Url] delete',
    URL_UPDATE: '[Url] update',
    URL_CLEAR: '[Url] Initialized'
};
function UrlState(state, action) {
    if (state === void 0) { state = []; }
    console.log("urlState state = " + JSON.stringify(state));
    console.log("urlState action = " + JSON.stringify(action));
    switch (action.type) {
        case exports.UrlActions.URL_ADD_1:
            return state.concat([
                action.payload
            ]);
        case exports.UrlActions.URL_ADD_N:
            return action.payload;
        case exports.UrlActions.URL_CLEAR:
            return [];
        default:
            return state;
    }
}
exports.UrlState = UrlState;


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(621));
__export(__webpack_require__(620));
__export(__webpack_require__(137));


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
// url.ts
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(18);
var http_1 = __webpack_require__(21);
var index_1 = __webpack_require__(89);
var cheerio = __webpack_require__(97);
var url_event_1 = __webpack_require__(138);
var feed_service_1 = __webpack_require__(64);
var UrlService = (function () {
    function UrlService(store, _httpDataService, 
        //private _FeedDefinitionService: FeedDefinitionService,
        configService, urlEvent, feedService) {
        this.store = store;
        this._httpDataService = _httpDataService;
        this.configService = configService;
        this.urlEvent = urlEvent;
        this.feedService = feedService;
        console.log("url.ts - ctor");
        this.items = store.select(function (state) { return state.urls; });
        this.baseUrl = configService.config.apiUrl + "urls/";
    }
    UrlService.prototype.getTokenedHeaders = function () {
        // add user auth token to header
        var headers = new http_1.Headers();
        headers.set('x-access-token', this.user['token']);
        var options = {
            headers: headers
        };
        return options;
    };
    UrlService.prototype.getQueryStringWithUserId = function () {
        var params = new http_1.URLSearchParams();
        params.set("user", this.user['id']);
        return params;
    };
    UrlService.prototype.getBodyWithUserId = function () {
        return { user: this.user['id'] };
    };
    UrlService.prototype.loadItems = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!user || !user.id) {
                console.log("urlService::loadItems - user is empty");
                reject("user is empty");
            }
            _this.user = user;
            var headers = new http_1.Headers();
            headers.set('x-access-token', user['token']);
            var options = {
                headers: headers
            };
            return _this._httpDataService.getJsonPromise(_this.baseUrl + "?user=" + user["id"], options)
                .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    UrlService.prototype.getUrlProperties = function (url, user) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            var post = {
                url: url
            };
            _this._httpDataService.postWithAuthReturnText(_this.baseUrl + "meta/", post, user)
                .then(function (meta) {
                var metaObj = JSON.parse(meta);
                var feed = [], title;
                if (metaObj && metaObj.data && metaObj.data.feeds && metaObj.data.feeds) {
                    for (var i = 0; i < metaObj.data.feeds.length; i++) {
                        feed.push(metaObj.data.feeds[i].href);
                    }
                }
                if (metaObj && metaObj.data && metaObj.data.title) {
                    title = metaObj.data.title;
                }
                resolve({ feed: feed, title: title });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    UrlService.prototype.getTitle = function (html) {
        var $ = cheerio.load(html);
        var title = $("title").text();
        return title;
    };
    UrlService.prototype.getLinks = function (html) {
        var list = [];
        var $ = cheerio.load(html);
        $('link').each(function () {
            var type = $(this).attr("type");
            var href = $(this).attr("href");
            if (type) {
                type = type.replace('\\"', '');
                type = type.replace('\\"', '');
                if (href) {
                    href = href.replace('\\"', '');
                    href = href.replace('\\"', '');
                }
                list.push({ type: type, href: href });
            }
        });
        return list.sort();
    };
    UrlService.prototype.getUrlHtml = function (url, user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // post form
            var post = {
                url: url,
                user: user.id
            };
            // headers
            var headers = new http_1.Headers();
            headers.set('x-access-token', user['token']);
            headers.set('Content-Type', 'application/json');
            var options = {
                headers: headers
            };
            return _this._httpDataService.postHtmlData(_this.baseUrl + "feeds/", post, options)
                .then(function (data) {
                resolve(data || "");
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    UrlService.prototype.insertItem = function (user, item) {
        var _this = this;
        if (!user || !user.id)
            return;
        this.user = user;
        item["user"] = this.user.id;
        var headers = new http_1.Headers();
        headers.set('x-access-token', user['token']);
        headers.set('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        console.log("url insert item = " + JSON.stringify(item));
        console.log("url insert options = " + JSON.stringify(options));
        return this._httpDataService.postJsonData(this.baseUrl, item, options).then(function (data) {
            //this._FeedDefinitionService.getFeedUrl(item);
            // TODO: what should happen if there is an error on the server/api side
            // how would I should the error? 
            //console.log("url.ts::insertItem - returned data = " + JSON.stringify(data));
            _this.urlEvent.fire('URL_ADD_1');
            return data;
        })
            .catch(function (err) {
            console.log(err);
            return err;
        });
    };
    // tell store about change
    UrlService.prototype.insertToStore = function (newItem) {
        //this.store.dispatch({ type: ADD_URL, payload: newItem});
    };
    // delete item
    UrlService.prototype.removeItem = function (user, item) {
        //console.log("item deleted = " + item.url);
        var _this = this;
        if (!user || !user.id) {
            console.log("UrlService::removeItem, user is empty");
            return;
        }
        this.user = user;
        var urlId = item["id"] ? item["id"] : item["_id"];
        if (!urlId) {
            console.log("UrlService::removeItem, urlId is empty");
            return;
        }
        var postForm = {
            user: this.user['id'],
        };
        var headers = new http_1.Headers();
        headers.set('x-access-token', this.user['token']);
        var options = {
            headers: headers,
            body: postForm
        };
        console.log("UrlService::removeItem, options = " + JSON.stringify(options));
        return this._httpDataService.delete(this.baseUrl + urlId, options)
            .then(function (data) {
            console.log("url.ts removeItem http service delete success");
            // TODO: what should happen if there is an error on the server/api side
            // how would I should the error? 
            //console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
            //this.loadItems(this.user); 
            // really just need it to reload
            _this.urlEvent.fire('URL_ADD_1');
            return data;
        })
            .catch(function (err) {
            console.log(err);
            return err;
        });
    };
    return UrlService;
}());
UrlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [store_1.Store,
        index_1.HttpDataService,
        index_1.ConfigService,
        url_event_1.UrlEvent,
        feed_service_1.FeedService])
], UrlService);
exports.UrlService = UrlService;


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
// all authentication is kept in local storage - not state
var Configuration = (function () {
    function Configuration() {
    }
    return Configuration;
}());
Configuration.urls = {
    base: "http://urlmgrapi.dfberry.io/v1",
    auth: ['login', 'register', 'logout']
};
Configuration = __decorate([
    core_1.Injectable()
], Configuration);
exports.Configuration = Configuration;


/***/ })

},[637]);
//# sourceMappingURL=main.bundle.js.map