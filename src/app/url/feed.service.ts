// url.ts
import { Injectable, OnInit} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { createSelector } from 'reselect';
import * as cheerio from 'cheerio';

import { type } from '../utils/index';
import { HttpDataService, ConfigService} from '../services/index';

//import { AppState } from '../app.state';
//import { Feed, FeedResponse, FeedDefinition , FeedDefinitionService, FeedResponseService} from './feed';
import { Url } from './url.model';
import { User } from '../user/user.model';
//import { UrlEvent } from './url.event';


@Injectable()
export class FeedService  {

    //items:Observable <Url[]>;
    //public count: Observable<number>;
    //public next: Observable<number>;
    user: User;

    currentConfig;
    baseUrl;
    mimeTypes: string[] = [
        'application/rss+xml',
        'application/xml',
        'application/rdf+xml',
        'application/atom+xml',
    ];
    constructor(
        private http: HttpDataService,
        private configService: ConfigService
    ){
        this.baseUrl = configService.config.apiUrl;
    }



    searchMimeTypes(links){
        var ret = [];
        this.mimeTypes.sort();
        for(var i = 0; i < links.length; i += 1) {
            if(this.mimeTypes.indexOf(links[i].type) > -1){
                ret.push( links[i].href );
            }
        }
        console.log(ret);
        return (ret.length==0) ? "" : ret.sort()[0];
    }
}