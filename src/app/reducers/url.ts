// url.ts
import {Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../utils/index';
import { HttpDataService} from '../services/index';
import { AppState } from './index';
import { Feed, FeedResponse, FeedDefinition , FeedDefinitionService, FeedResponseService} from './feed';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../user/auth.service';

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

    currentConfig;
    baseUrl;
    user={};

    constructor(
        private store:Store<AppState>, 
        private _httpDataService: HttpDataService,
        private _FeedDefinitionService: FeedDefinitionService,
        private authService: AuthenticationService,
        private configService: ConfigService
    ){
        console.log("url.ts - ctor");
        this.items = store.select(state => state.urls);
        this.baseUrl = this.configService.get('apiUrl');
        this.user = this.authService.getCurrentUser();
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

    loadItems(){
        console.log("url.ts - loadItems");

        let initialItems: Url[];
        let options = this.getTokenedHeaders();
        options.search = this.getQueryStringWithUserId();

        this._httpDataService.getJsonPromise(this.baseUrl + "urls", options)
            .then(data => {
                if(data) this.store.dispatch({type: ADD_URLS, payload: data});
        }).catch((err) => {
                console.log(err);
        });
    }
    // if response from post is equal to url
    // then it was successful
    insertItem(item: any){

        let initialItems: Url[];
        let options = this.getTokenedHeaders();
        item.user = this.user['id'];

        return this._httpDataService.postJsonData(this.baseUrl + "urls", item, options)
            .then((data) => {
                
                //this._FeedDefinitionService.getFeedUrl(item);

                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                //console.log("url.ts::insertItem - returned data = " + JSON.stringify(data));
                this.loadItems();  
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
    removeItem(item:Url){
        console.log("url.ts removeItem, item to delet = " + JSON.stringify(item));

        let options = this.getTokenedHeaders();
        options.search = this.getQueryStringWithUserId();

        return this._httpDataService.delete(this.baseUrl + "urls/" + item.id, options)
            .then((data) => {
                console.log("url.ts removeItem http service delete success");
                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                //console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
                this.loadItems();  
                return data;  
            
            })
            .catch((err) => {
                console.log(err);
                return err;
            });

    }
}

