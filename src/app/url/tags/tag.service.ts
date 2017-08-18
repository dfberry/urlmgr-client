import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//http://stackoverflow.com/questions/37992671/how-to-preload-a-config-file-in-angular2
@Injectable()
export class TagService {
 
  public results: any;

  constructor(private http: Http) {}
  load(config) {

      if(!config || !config.apiUrl) return Observable.throw('error constructing api url');

      let url = config.apiUrl + 'tags/all';

      return this.http
      .get(url)
      .map((response: Response) => response.json());

    }
  }