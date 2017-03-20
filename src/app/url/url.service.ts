// url.ts
import { Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../utils/index';
import { HttpDataService, ConfigService} from '../services/index';

import { AppState } from '../app.state';
//import { Feed, FeedResponse, FeedDefinition , FeedDefinitionService, FeedResponseService} from './feed';
import { Url } from './url.model';
import { User } from '../user/user.model';
import { UrlEvent } from './url.event';

@Injectable()
export class UrlService  {

    items:Observable <Url[]>;
    public count: Observable<number>;
    public next: Observable<number>;
    user: User;

    currentConfig;
    baseUrl;

    constructor(
        private store:Store<AppState>, 
        private _httpDataService: HttpDataService,
        //private _FeedDefinitionService: FeedDefinitionService,
        private configService: ConfigService,
        private urlEvent: UrlEvent
    ){
        console.log("url.ts - ctor");
        this.items = store.select(state => state.urls);
        this.baseUrl = configService.config.apiUrl + "urls/";
    }

    getTokenedHeaders(){
        // add user auth token to header
        let headers = new Headers();
        headers.set('x-access-token', this.user['token']);
        let options:RequestOptionsArgs = {
            headers : headers
        };
        return options;
    }
    getQueryStringWithUserId(){
        let params: URLSearchParams = new URLSearchParams();
        params.set("user", this.user['id']);
        return params;
    }
    getBodyWithUserId(){
        return {user: this.user['id']};
    }

    loadItems(user){
        return new Promise<Url[]>((resolve, reject) => {

            if(!user || !user.id) {
                console.log("urlService::loadItems - user is empty");
                reject("user is empty");
            }
            this.user = user;

            let headers = new Headers();
            headers.set('x-access-token', user['token']);

            let options:RequestOptionsArgs = {
                headers : headers
            };

            return this._httpDataService.getJsonPromise(this.baseUrl + "?user=" + user["id"], options)
                .then(data => {
                    resolve(data);
            }).catch(err => {
                    console.log(err);
                    reject(err);
            });

        });
    }
/*
    loadItems(user) {

        let initialItems: Url[];

        if(!user || !user.id) {
            console.log("urlService::loadItems - user is empty");
            return Promise.reject("user is empty");
        }
        this.user = user;

        let headers = new Headers();
        headers.set('x-access-token', user['token']);

        let options:RequestOptionsArgs = {
            headers : headers
        };

        return this._httpDataService.getJsonPromise(this.baseUrl + "?user=" + user["id"], options)
            .then(data => {
                return Promise.resolve(data);
        }).catch(err => {
                console.log(err);
                return Promise.reject(err);
        });
    }
    */
    // if response from post is equal to url
    // then it was successful

    insertItem(user: User, item: Url){

        if(!user || !user.id) return;
        this.user = user;

        item["user"] = this.user.id

        let headers = new Headers();
        headers.set('x-access-token', user['token']);
        headers.set('Content-Type', 'application/json');

        let options:RequestOptionsArgs = {
            headers : headers
        };

        console.log("url insert item = " + JSON.stringify(item));
        console.log("url insert options = " + JSON.stringify(options))

        return this._httpDataService.postJsonData(this.baseUrl, item, options).then((data) => {
                
                //this._FeedDefinitionService.getFeedUrl(item);

                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                //console.log("url.ts::insertItem - returned data = " + JSON.stringify(data));
                this.urlEvent.fire('URL_ADD_1');  
                return data;  
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }

    // tell store about change
    private insertToStore(newItem){
        //this.store.dispatch({ type: ADD_URL, payload: newItem});
    }

    // delete item

    removeItem(user, item:Url){
        //console.log("item deleted = " + item.url);

        if(!user || !user.id) {
            console.log("UrlService::removeItem, user is empty");
            return;
        }
        this.user = user;

        let urlId = item["id"] ? item["id"] : item["_id"];
        if (!urlId) {
            console.log("UrlService::removeItem, urlId is empty");
            return;
        }

        let postForm = {
            user: this.user['id'],
        };

        let headers = new Headers();
        headers.set('x-access-token', this.user['token']);

        let options:RequestOptionsArgs = {
            headers : headers,
            body : postForm
        };

        console.log("UrlService::removeItem, options = " + JSON.stringify(options));

        return this._httpDataService.delete(this.baseUrl + urlId, options)

            .then((data) => {
                console.log("url.ts removeItem http service delete success");
                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                //console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
                //this.loadItems(this.user); 

                // really just need it to reload
                this.urlEvent.fire('URL_ADD_1'); 
                return data;  
            
            })
            .catch((err) => {
                console.log(err);
                return err;
            });

    }
}