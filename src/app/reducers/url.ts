// url.ts
import {Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../utils/index';
import { HttpDataService, ConfigService} from '../services/index';
import { AppState } from '../app.state';
import { Feed, FeedResponse, FeedDefinition , FeedDefinitionService, FeedResponseService} from './feed';
import { User } from '../user/user.model';

export const ADD_URL = '[Url] add 1';
export const ADD_URLS = '[Url] add N';
export const DELETE_URL = '[Url] delete';
export const UPDATE_URL = '[Url] update';

/** Url definition
 * id: currently next numeric value
 * url: string - currently no checking for valid url string
 */
export interface IUrl{
    id: string;
    url: string;

    status: string;
    statusDate: string;
    createdAt: string;
    updatedAt: string;
}

export class Url implements IUrl{
    id: string;
    url: string;
    feeds: FeedDefinition[];  
    feedResponse: FeedResponse ;
    title: string;
    status: string; 
    statusDate: string;
    createdAt: string;
    updatedAt: string;   
}

export const urlReducer: ActionReducer<Url[]> = (state: Url[] = [], action: Action) => {

    //console.log("urlReducer " + action.type);

     switch (action.type) {
        case ADD_URL:
          return [
              ...state,
              action.payload
          ];       
        case ADD_URLS:
          return action.payload;       
        default:
            return state;
    }
}

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
        private _FeedDefinitionService: FeedDefinitionService,
        private configService: ConfigService
    ){
        console.log("url.ts - ctor");
        this.items = store.select(state => state.urls);
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

        let initialItems: Url[];

        if(!user || !user.id) return;
        this.user = user;

        let headers = new Headers();
        headers.set('x-access-token', user['token']);

        let options:RequestOptionsArgs = {
            headers : headers
        };

        this._httpDataService.getJsonPromise(this.baseUrl + "?user=" + user["id"], options)
            .then(data => {
                let thisUrls = data;
                
                if(data){
                    //console.log(thisUrls);
                    this.store.dispatch({type: ADD_URLS, payload: thisUrls});
                } else {
                    //console.log("url.ts::loadItems - data is empty");
                }
        }).catch((err) => {
                console.log(err);
        });
    }
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
                this.loadItems(this.user);  
                return data;  
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }

    // tell store about change
    private insertToStore(newItem){
        this.store.dispatch({ type: ADD_URL, payload: newItem});
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

        return this._httpDataService.delete(this.baseUrl + '/' + urlId, options)

            .then((data) => {
                console.log("url.ts removeItem http service delete success");
                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                //console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
                this.loadItems(this.user);  
                return data;  
            
            })
            .catch((err) => {
                console.log(err);
                return err;
            });

    }
}

