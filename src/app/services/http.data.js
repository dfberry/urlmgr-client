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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var HttpDataService = (function () {
    function HttpDataService(_http) {
        this._http = _http;
    }
    HttpDataService.prototype.getJsonObservable = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); })
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
    HttpDataService.prototype.getHtmlPromise = function (url) {
        //console.log("getJsonPromise url = " + url);
        return this._http.get(url)
            .map(function (response) {
            //console.log(response.json());
            return response.text();
        })
            .toPromise()
            .catch(function (err) {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err.message);
        });
    };
    HttpDataService.prototype.getJsonPromise = function (url) {
        //console.log("getJsonPromise url = " + url);
        return this._http.get(url)
            .map(function (response) {
            //console.log(response.json());
            return response.json();
        })
            .toPromise()
            .catch(function (err) {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err.message);
        });
    };
    HttpDataService.prototype.postJsonData = function (url, body, options) {
        //console.log("HttpDataService::postJsonData url = " + url);
        //console.log("HttpDataService::postJsonData body = " + body);
        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
            .map(function (res) { return res.json(); })
            .toPromise()
            .catch(function (err) {
            console.log('http::data-postJsonData err ' + err);
            return Promise.reject(err.message);
        });
    };
    HttpDataService.prototype.delete = function (url, options) {
        //console.log("HttpDataService::delete url = " + url);
        return this._http.delete(url, options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .catch(function (err) {
            console.log('http::data-delete err ' + err);
            return Promise.reject(err.message);
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
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    HttpDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpDataService);
    return HttpDataService;
}());
exports.HttpDataService = HttpDataService;
//# sourceMappingURL=http.data.js.map