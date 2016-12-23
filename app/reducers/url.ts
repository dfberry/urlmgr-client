// url.ts
import {Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../utils/index';
import { HttpDataService, ConfigService} from '../services/index';
import { AppState } from './index';
import { Feed, FeedResponse, FeedDefinition , FeedResponseService} from './feed';

export const ADD_URL = 'ADD_URL';
export const ADD_URLS = 'ADD_URLS';
export const DELETE_URL = 'DELETE_URL';
export const UPDATE_URL = 'UPDATE_URL';

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

    console.log("urlReducer " + action.type);

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
export class UrlService{

    items:Observable <Url[]>;
    public count: Observable<number>;
    public next: Observable<number>;

    baseUrl = this.configService.config.apiUrl + "urls";

    constructor(
        private store:Store<AppState>, 
        private _httpDataService: HttpDataService,
        private configService: ConfigService
    ){
        this.items = store.select(state => state.urls);
    }

    // get list from local sails api server aka ../src-api
    //     host: 104.131.155.194
    //     port: 27000
    loadItems(){
        let initialItems: Url[];

        this._httpDataService.getJsonPromise(this.baseUrl)
            .then(data => {
                let thisUrls = data;
                
                if(data){
                    console.log(thisUrls);
                    this.store.dispatch({type: ADD_URLS, payload: thisUrls});
                } else {
                    console.log("url.ts::loadItems - data is empty");
                }
        }).catch((err) => {
                console.log(err);
        });
    }
    // if response from post is equal to url
    // then it was successful
    insertItem(item: Url){

        return this._httpDataService.postJsonData(this.baseUrl, item, null)
            .then((data) => {
                
                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                console.log("url.ts::insertItem - returned data = " + JSON.stringify(data));
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
        console.log("item deleted = " + item.url);
        return this._httpDataService.delete(this.baseUrl + '/' + item.id, null)
            .then((data) => {
                
                // TODO: what should happen if there is an error on the server/api side
                // how would I should the error? 
                console.log("url.ts::remoteItem - returned data = " + JSON.stringify(data));
                this.loadItems();  
                return data;  
            
            })
            .catch((err) => {
                console.log(err);
                return err;
            });

    }
}

