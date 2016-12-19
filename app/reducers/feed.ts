import { Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { HttpDataService, ConfigService} from '../services/index';
import {Observable} from 'rxjs/Rx';
import { Url} from './index';
import { AppState } from './index';

export const ADD_FEED = 'ADD_FEED';
export const ADD_FEEDS = 'ADD_FEEDS';
export const DELETE_FEED = 'DELETE_FEED';
export const FIND_BY_PARENT_URL = 'FIND_BY_PARENT_URL';



export interface IFeed{
    id: number;
    url: string;
    parentUrl:string ;
    raw: string;
    type: string;

}
export interface FeedEntry {
  title: string,
  link: string,
  guid: string,
  pubDate: Date,
  categories: Array<string>,
  author: string,
  thumbnail: string,
  description: string,
  content: string
}
export interface FeedInfo {
  title: string,
  link: string,
  author: string,
  description: string,
  image: string
}
export interface FeedResponse {
  status: string,
  feed: FeedInfo,
  items: Array<FeedEntry>
}

export class Feed implements IFeed{
    id: number;
    url: string;
    raw: string;
    type: string; 
    parentUrl:string ;
}

export class Article{
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;

}

export class FeedMgr {
  title: string;
  parentId: string;
  url: string;
  articles: Article[]
}


export const feedReducer: ActionReducer<FeedMgr[]> = (state: FeedMgr[] = [], action: Action) => {

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
        default:
            return state;
    }
}


/**
 * Represents Feed
 * https://www.becompany.ch/en/blog/tech/2016/09/19/angular2-rss-reader.html
 */
@Injectable()
export class FeedService{

  items:Observable <FeedMgr[]>;
  public count: Observable<number>;
  public next: Observable<number>;
  url: string;

    private rssToJsonServiceBaseUrl: string = this.configService.config.rssProxy;

    constructor(
        private _httpDataService: HttpDataService,
        private configService: ConfigService,
        private store:Store<AppState>    ){

        this.items = store.select(state => state.feeds);
        
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

                //data.push['urlParent'] = url;
                let feedMgrList: FeedMgr[]=[];

                let feedMgrItem = new FeedMgr();
                feedMgrItem.title = data.feed.title;
                feedMgrItem.parentId = id;
                feedMgrItem.url = url;
                feedMgrItem.articles = data.items;

                feedMgrList.push(feedMgrItem);

                console.log(feedMgrItem);

                this.store.dispatch({type: ADD_FEEDS, payload: feedMgrList});
        }).catch((err) => {
                console.log(err);
        });
      }
  }
  findByUrlId(url: Url): FeedMgr[]{

    // need to create an item of same type for reducer to use
    let tempFeed: FeedMgr = [{
      parentId: url.id,
      title: null,
      articles: null,
      url: null
    }];

    FeedMgr

    let foundFeedMgr = this.store.dispatch({type: FIND_FEEDS, payload: tempFeed});
    return foundFeedMgr;
  }

}