import { Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import {Observable} from 'rxjs/Rx';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';

import { HttpDataService, ConfigService} from '../services/index';
import { Url} from './index';
import { AppState } from '../app.state';

let cheerio = require("cheerio");

export const ADD_FEED = '[Feed] add 1';
export const ADD_FEEDS = '[Feed] add N';
export const DELETE_FEED = '[Feed] delete';
export const FIND_FEEDS = '[Feed] find';

export const FEED_SELECTED_ADD = '[Selected Feed] add 1';
export const FEED_SELECTED_SELECT = '[Selected Feed] select';

export class Feed {
  feedDefinition: FeedDefinition;
  feedResponse: FeedResponse;
  urlId: string;

  constructor(){
    this.feedResponse = new FeedResponse();
    this.feedDefinition = new FeedDefinition();
    this.urlId = "";
  }
}
export class FeedDefinition {
    title: string;
    type: string;
    href: string;
    url: string;
    

    constructor(){
      this.title = "";
      this.type = "";
      this.href = "";
      this.url = "";
    }
}
export class FeedResponse {
  status: string;
  feed: FeedInfo;
  items: Array<Article>;

  constructor(){
    this.status = "";
    this.feed = new FeedInfo();
    this.items = [];
  }
}
export class Article {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  categories: Array<string>;
  author: string;
  thumbnail: string;
  description: string;
  content: string;

  constructor(){
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
}
export class FeedInfo {
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
  type: string;

  constructor(){
    this.title = "";
    this.link = "";
    this.author = "";
    this.description = "";
    this.image = "";
    this.type = "";
  }
}

export const feedReducer: ActionReducer<Feed[]> = (state: Feed[] = [], action: Action) => {

    //console.log("feedReducer " + action.type);
    //console.log(state);
    //console.log(action.payload);

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

export const selectedFeedReducer: ActionReducer<Feed> = (state: Feed = new Feed(), action: Action) => {

     switch (action.type) {
        case FEED_SELECTED_ADD:
          return action.payload; 
        case FEED_SELECTED_SELECT: 
        default:
            return state;
    }
}

@Injectable()
export class FeedDefinitionService{

  feedDefinition: FeedDefinition[]=[];

    constructor(
        private _httpDataService: HttpDataService,
        private configService: ConfigService,
        private store:Store<AppState>    ){

        //this.items = store.select(state => state.feeds);
        
    }
    // websiteUrl's html might contain rss link
    getFeedUrl(websiteUrl){

      this._httpDataService.getHtmlPromise(websiteUrl)
      .then(data => {
 
        //Loop through every link
        //$('link').attr('type', 'application/rss+xml').each(function(i, link){
        //  console.log(link.attr('href'));
        //});
     });
    }
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

  getFeed(urlId: string): any{
    console.log("getFeed 0, urlId = " + urlId);
    this.store.select(state => state.feeds).subscribe(feeds => {
      console.log(feeds ? "getFeed 1 feeds not empty "  + urlId: "getFeed 1 feeds empty "+ urlId);
      feeds.map(feed => {
        
        if(feed.urlId === urlId){
          console.log(feed ? "getFeed 2 feed not empty " + urlId : "getFeed 2 feed empty " + urlId);
          return feed;
        } 
      });
    });  
  }

  // add new feed to state, set new feed as selected feed
  addFeed(id: string, url:string){
      console.log("addFeed 0, id = " + id);
      if (!url) return;

      let existingFeed = this.getFeed(id);
      console.log((existingFeed && existingFeed.lenght) ? "addFeed 1 existingFeed not empty" : "addFeed existingFeed empty");
      
      // if feed is already in store, don't go fetch it
      if(existingFeed) return;

      // TODO: fix this
      let options = undefined;

      // get feeds
      this._httpDataService.getJsonPromise(this.rssToJsonServiceBaseUrl + url, options)
          .then(data => {
            //console.log(this.rssToJsonServiceBaseUrl + url);

            //console.log(JSON.stringify(data));

              let newfeed: Feed = new Feed();
              newfeed.urlId = id;

              let feedResponseItem: FeedResponse= new FeedResponse();
              feedResponseItem.status = data.status;
              feedResponseItem.items = data.items;
              feedResponseItem.feed = data.feed;
              newfeed.feedResponse = feedResponseItem;

              let feedDefinition = new FeedDefinition();
              feedDefinition.url = url;

              newfeed.feedDefinition = feedDefinition;

              // assume new feed is selected feed
              this.store.dispatch({type: ADD_FEED, payload: newfeed});
              this.store.dispatch({type: FEED_SELECTED_ADD, payload: newfeed});

        }).catch((err) => {
                console.log(err);
        });
  }

}