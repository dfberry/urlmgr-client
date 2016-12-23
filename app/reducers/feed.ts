import { Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import {Observable} from 'rxjs/Rx';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';

import { HttpDataService, ConfigService} from '../services/index';


import { Url} from './index';
import { AppState } from './index';
export const ADD_FEED = 'ADD_FEED';
export const ADD_FEEDS = 'ADD_FEEDS';
export const DELETE_FEED = 'DELETE_FEED';
export const FIND_FEEDS = 'FIND_FEEDS';

export class Feed {
  feedDefinition: FeedDefinition;
  feedResponse: FeedResponse;
}
export class FeedDefinition {
    title: string;
    type: string;
    href: string;
}
export class FeedResponse {
  status: string;
  feed: FeedInfo;
  items: Array<Article>;
}
export class Article {
  title: string;
  link: string;
  guid: string;
  pubDate: Date;
  categories: Array<string>;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
}
export class FeedInfo {
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
  type: string;
}

export const feedReducer: ActionReducer<Feed[]> = (state: Feed[] = [], action: Action) => {

    console.log("feedReducer " + action.type);
    console.log(state);
    console.log(action.payload);

     switch (action.type) {
        case ADD_FEED:
          return [
              ...state,
              action.payload
          ];       
        case ADD_FEEDS:

          return action.payload;  
        case FIND_FEEDS:
          return action.payload; 
        default:
            return state;
    }
}
@Injectable()
export class FeedDefinitionService{

}

/**
 * Represents Feed
 * https://www.becompany.ch/en/blog/tech/2016/09/19/angular2-rss-reader.html
 */
@Injectable()
export class FeedResponseService{

  items:Observable <FeedResponse[]>;
  public count: Observable<number>;
  public next: Observable<number>;
  url: string;

    private rssToJsonServiceBaseUrl: string = this.configService.config.rssProxy;

    constructor(
        private _httpDataService: HttpDataService,
        private configService: ConfigService,
        private store:Store<AppState>    ){

        //this.items = store.select(state => state.feeds);
        
    }

  // use rss2json to fix cors and munge xml to json
  loadItems(id: string, url: string): any {
      if (!url) {
        console.log("feed loadItems url is empty");
        return;
      }
      if (url){

        let initialItems: Feed[];

        this.url = url;

        this._httpDataService.getJsonPromise(this.rssToJsonServiceBaseUrl + url)
            .then(data => {
                console.log(data);

                //let feedMgrList: FeedResponse[]=[];

                let feed: Feed = new Feed();
                let feedResponseItem: FeedResponse= new FeedResponse();
                console.log(feedResponseItem);
                feedResponseItem.status = data.status;
                feedResponseItem.items = data.items;
                feedResponseItem.feed = data.feed;

                console.log(feedResponseItem);
                feed.feedResponse = feedResponseItem;
                //feedMgrItem.title = data.feed.title;
                //feedMgrItem.parentId = id;
                //feedMgrItem.url = url;
                //feedMgrItem.articles = data.items;

                //feedMgrList.push(feedResponseItem);
                //tempUrl.id = id;
                //tempUrl.feedResponse = feedResponseItem;

                //console.log(tempUrl);
           

                this.store.dispatch({type: ADD_FEED, payload: feed});
        }).catch((err) => {
                console.log(err);
        });
      }
  }
}