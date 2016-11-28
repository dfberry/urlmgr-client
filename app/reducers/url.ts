// url.ts
import {Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { HttpDataService} from '../services/index';
import { Observable } from 'rxjs/Rx';
import { AppState } from './index';
import { ConfigService } from '../services/index';

export const ADD_URL = 'ADD_URL';
export const ADD_URLS = 'ADD_URLS';
export const DELETE_URL = 'DELETE_URL';

/** Url definition
 * id: currently next numeric value
 * url: string - currently no checking for valid url string
 */
export interface IUrl{
    id: number;
    url: string;
    status: string;
    statusDate: string;
    createdAt: string;
    updatedAt: string;
}
export class Url implements Url{
    id: number;
    url: string;
    status: string; 
    statusDate: string;
    createdAt: string;
    updatedAt: string;   
}
/** 

    Url NGRX reducer
    @constructor - initialized to empty array
    @param {array} Url - array of current Urls 
    @param {object} action - type of action to apply to current state

*/
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
/**
 * Represents Url state
 * this should be the only entry/exit point for manipulating state
 */
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
                let len = thisUrls.length;
                let next = len + 1;
                this.store.dispatch({type: ADD_URLS, payload: thisUrls});
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
        return;
    }
}