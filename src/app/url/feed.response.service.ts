// url.ts
import { Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createSelector } from 'reselect';

import { type } from '../utils/index';
import { HttpDataService, ConfigService} from '../services/index';

import 'cheerio';

//import { AppState } from '../app.state';
import { Feed, FeedResponse, FeedDefinition } from './feed.model';
import { Url } from './url.model';
import { User } from '../user/user.model';
import { UrlEvent } from './url.event';

@Injectable()
export class FeedResponseService{

  items:Observable <FeedResponse[]>;
  url: string;
  baseUrl;
  user;

    //TODO: fix config
    //private rssToJsonServiceBaseUrl: string = this.configService.config.rssProxy;
    private rssToJsonServiceBaseUrl: string;

    constructor(
        private _httpDataService: HttpDataService,
        private configService: ConfigService ){
        this.baseUrl = configService.config.apiUrl + "urls/";
}


  getFeed(urlId: string): any{
    console.log("getFeed 0, urlId = " + urlId);
    /*this.store.select(state => state.feeds).subscribe(feeds => {
      console.log(feeds ? "getFeed 1 feeds not empty "  + urlId: "getFeed 1 feeds empty "+ urlId);
      feeds.map(feed => {
        
        if(feed.urlId === urlId){
          console.log(feed ? "getFeed 2 feed not empty " + urlId : "getFeed 2 feed empty " + urlId);
          return feed;
        } 
      });
    });  */
  }

  // add new feed to state, set new feed as selected feed
  addFeed(id: string, url:string){
      console.log("addFeed 0, id = " + id);
      if (!url) return;

      let existingFeed = this.getFeed(id);
      console.log((existingFeed && existingFeed.lenght) ? "addFeed 1 existingFeed not empty" : "addFeed existingFeed empty");
      
      // if feed is already in store, don't go fetch it
      if(existingFeed) return;


        // add user auth token to header
        let headers = new Headers();
        headers.set('x-access-token', this.user['token']);
        let options:RequestOptionsArgs = {
            headers : headers,
            body: { user : this.user['id']}
        };

      // TODO: fix this
      //let options = undefined;

      // get feeds for this url
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
              //this.store.dispatch({type: ADD_FEED, payload: newfeed});
              //this.store.dispatch({type: FEED_SELECTED_ADD, payload: newfeed});

        }).catch((err) => {
                console.log(err);
        });
  }

}