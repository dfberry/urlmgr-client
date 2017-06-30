// url.ts
import { Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../../utils/index';
import { HttpDataService} from '../../services/index';
import { ConfigService } from '../../config/config.service';

import { AppState } from '../../app.state';
import { User } from '../../user/user.model';

import { IUrl, Url } from './url.model';
import { UrlEvent } from './url.event';

@Injectable()
export class UrlService  {

    public count: Observable<number>;
    public next: Observable<number>;

    // state's url list
    items:Observable <Url[]>;

    // TBD: why keep this around? set by methods
    user: User;

    // App Config's base url
    baseUrl;

    constructor(
        private store:Store<AppState>, 
        private _httpDataService: HttpDataService,
        private configService: ConfigService,
        private urlEvent: UrlEvent,
        private http: Http
    ){
        this.items = store.select(state => state.urls);
        this.baseUrl = configService.get("apiUrl") + "urls/";
    }

    /*
        get user's items from server
        return Observable<Url[]>
    */
    loadItems(user: User): Observable<any>{

        console.log("url.service loadItems");

            if(!user || !user.id) throw Error("user is invalid");
            this.user = user;

            let headers = new Headers();
            headers.set('x-access-token', user.token.token);

            let options:RequestOptionsArgs = {
                headers : headers
            };

            let url = this.baseUrl + "?user=" + user.id;

        return this.http.get(url, options)
        .map((response: Response) => {
            let mydata = response.json();
            console.log(mydata);
            return mydata.data;
        }).catch(this._handleErrorObservable);
    }
    _handleErrorObservable(err:any){
           console.log("url.service _handleErrorObservable returned " + JSON.stringify(err));
 
        console.log(err); //log this
        //throw(err);
        return Observable.of(err); // pass back for ux
    }
    /*
        get properties from server
        return promise<json>

        get url title
        get url's feeds
    */
    getUrlProperties(url, user){
        var self = this;
        return new Promise<Object>((resolve, reject) => {

            if(!user || !user.id) reject("invalid user");

            if(!url) reject("invalid url");

            let post = {
                url: url
            };

            self._httpDataService.postWithAuthReturnText(self.baseUrl + "meta/", post, user)
            .then(meta => {
                let metaObj = JSON.parse(meta);

                let feed=[], title;

                if(metaObj && metaObj.data && metaObj.data.feeds && metaObj.data.feeds)
                {
                    for(var i = 0;i<metaObj.data.feeds.length; i ++){
                        feed.push(metaObj.data.feeds[i].href);
                    }
                }
                if(metaObj && metaObj.data && metaObj.data.title)
                {
                    title = metaObj.data.title;
                }

                resolve({feed: feed, title: title});
            }).catch(err => {
                reject(err);
            });
        });
    }
    /*
        enter item in server-side db than trigger reload
        return Promise<json>
    */
    insertItem(user: User, item: any){
        var self = this;
        return new Promise<Object>((resolve, reject) => {

            if(!user || !user.id) reject("invalid user");
            self.user = user;

            if(!item || !item.user) reject("invalid item");
            item["user"] = self.user.id

            let headers = new Headers();
            headers.set('x-access-token', user.token.token);
            headers.set('Content-Type', 'application/json');

            let options:RequestOptionsArgs = {
                headers : headers
            };

            self._httpDataService.postJsonData(self.baseUrl, item, options).then((data) => {   

                    // TODO: what should happen if there is an error on the server/api side
                    // how would I should the error? 

                    // reload
                    self.urlEvent.fire('URL_ADD_1',data); 

                    // TBD: is this the server-side mongo doc for the item? 
                    resolve(data);  
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    /*
        delete item in server-side db than trigger reload
        return Promise<json>
    */
    removeItem(user, item:Url){
        var self = this;
        return new Promise<Object>((resolve, reject) => {

            if(!user || !user.id) {
                reject("user is invalid");
            }
            self.user = user;

            let urlId = item["id"] ? item["id"] : item["_id"];
            if (!urlId) {
                reject("url is invalid");
            }

            let postForm = {
                user: self.user['id'],
            };

            let headers = new Headers();
            headers.set('x-access-token', self.user.token.token);

            let options:RequestOptionsArgs = {
                headers : headers,
                body : postForm
            };

            self._httpDataService.delete(self.baseUrl + urlId, options)

                .then((data) => {

                    // TODO: what should happen if there is an error on the server/api side
                    // how would I should the error? 

                    // reload
                    self.urlEvent.fire('URL_ADD_1', data); 

                    // TBD: what is data? 
                    resolve(data);  
                
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}