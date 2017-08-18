
import {Jsonp, JsonpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TestBed, fakeAsync, async, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';

// https://codecraft.tv/courses/angular/unit-testing/http-and-jsonp/

class SearchItem {
  constructor(public name: string,
              public artist: string,
              public thumbnail: string,
              public artistId: string) {
  }
}

@Injectable()
export class SearchService {
  apiRoot: string = 'https://local.fake.server/search';
  results: SearchItem[];

  constructor(private jsonp: Jsonp) {
    this.results = [];
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
      this.jsonp.request(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().results.map(item => {
                  console.log("search item returned " + JSON.stringify(item));
                  return new SearchItem(
                      item.trackName,
                      item.artistName,
                      item.artworkUrl60,
                      item.artistId
                  );
                });
                resolve(this.results);
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
  }
}
describe('Service: Search', () => {
  
    let service: SearchService;
    let backend: MockBackend;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JsonpModule],
        providers: [
          SearchService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Jsonp,
            useFactory: (backend, options) => new Jsonp(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
  
      backend = TestBed.get(MockBackend); 
  
      service = TestBed.get(SearchService); 
    });

    it('search should return SearchItems', fakeAsync(() => { 
      let response = {
        "resultCount": 1,
        "results": [
          {
            "artistId": 78500,
            "artistName": "U2",
            "trackName": "Beautiful Day",
            "artworkUrl60": "image.jpg",
          }]
      };
    
      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(new Response(<ResponseOptions>{
          body: JSON.stringify(response)
        }));
      });
    
      // Perform a request and make sure we get the response we expect
      service.search("U2"); 
      tick(); 
    
      expect(service.results.length).toBe(1); 
      expect(service.results[0].artist).toBe("U2");
      expect(service.results[0].name).toBe("Beautiful Day");
      expect(service.results[0].thumbnail).toBe("image.jpg");
      expect(service.results[0].artistId).toBe(78500);
    }));
  });