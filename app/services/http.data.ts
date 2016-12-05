import {Injectable} from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HttpDataService{
    
    constructor(private _http: Http){}

    getJsonObservable(url){
        return this._http.get(url)
        .map((response: Response) => response.json())
        .catch(this._handleErrorObservable);
    }
    _handleErrorObservable(err:any){
        console.log(err); //log this
        //throw(err);
        return Observable.of(err); // pass back for ux
    }
    getTitle(url){
        this.getJsonPromise(url)
        .then(response => {
            let html = response.text;
            var matches = html.match(/<title>(.*?)<\/title>/);
            console.log('title = ' + matches[0]);
            return matches[0];
        })
        .catch((err: any) => {
            console.log("http::data-getJsonPromise err " + err);
            return Promise.reject(err.message)
        });
    }
    getJsonPromise(url){
        return this._http.get(url)
            .map((response:Response) => response.json())
            .toPromise()
            .catch((err: any) => {
                console.log("http::data-getJsonPromise err " + err);
                return Promise.reject(err.message)
            });
    }
    postJsonData(url, body, options ){
        console.log("HttpDataService::postJsonData url = " + url);
        console.log("HttpDataService::postJsonData body = " + body);

        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
           .map(res =>  res.json())
           .toPromise()
            .catch((err: any) => {
                console.log('http::data-postJsonData err ' + err);
                return Promise.reject(err.message)
            });
    }

    getDefaultPostOptions(){
        var headers = new Headers();
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });
        return options;
    }
}