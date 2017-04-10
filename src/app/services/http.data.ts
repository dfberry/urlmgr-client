import {Injectable} from '@angular/core';
import { Http, Response, URLSearchParams,RequestOptionsArgs, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HttpDataService{
    
    constructor(
        private _http: Http){}

    getJsonObservable(url){
        return this._http.get(url)
        .map((response: Response) => response.json().data)
        .catch(this._handleErrorObservable);
    }
    _handleErrorObservable(err:any){
        console.log(err); //log this
        //throw(err);
        return Observable.of(err); // pass back for ux
    }
    /*
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
    */
    postWithAuthReturnText(url, post, user): Promise<string>{
        return new Promise<string>((resolve, reject) => {

            console.log("url = " + url);
            // post form
            //let post = {
            //    url: url,
            //    user: user.id
           // }
           post["user"] = user.id;

            // headers
            let headers = new Headers();
            headers.set('x-access-token', user['token']);
            headers.set('Content-Type', 'application/json');

            let options: RequestOptionsArgs = {
                headers : headers
            };

            return this.postHtmlData(url, post, options)
                .then(data => {
                    resolve(data || "");
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
    getHtmlPromise(url){
        console.log("getJsonPromise url = " + url);
        return this._http.get(url)
            .map((response:Response) => {
                //console.log(response.json());
                return response.text();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("http::data-getJsonPromise err " + err);
                return Promise.reject(err)
            });
    }
    getJsonPromise(url, options){
        //console.log("getJsonPromise url = " + url);
        return this._http.get(url, options)
            .map((response:Response) => {
                //console.log(response.json());
                return response.json().data;
            })
            .toPromise()
            .catch((err: any) => {
                console.log("http::data-getJsonPromise err " + err);
                return Promise.reject(err)
            });
    }
    postHtmlData(url, body, options ){
        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
            .map(res =>  res.text())
            .toPromise()
            .catch((err: any) => {
                return Promise.reject(err)
            });
    }
    postJsonData(url, body, options ){
        console.log("HttpDataService::postJsonData url = " + url);
        console.log("HttpDataService::postJsonData body = " + JSON.stringify(body));
        console.log("HttpDataService::postJsonData options = " + JSON.stringify(options));

        return this._http.post(url, body, options ? options : this.getDefaultPostOptions())
           .map(res =>  res.json())
           .toPromise()
            .catch((err: any) => {
                console.log('http::data-postJsonData err ' + err);
                return Promise.reject(err)
            });
    }
    delete(url, options ){
        //console.log("HttpDataService::delete url = " + url);
 
        return this._http.delete(url, options )
           .map(res =>  res.json())
           .toPromise()
            .catch((err: any) => {
                console.log('http::data-delete err ' + err);
                return Promise.reject(err)
            });
    }
    /*
        // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    */

    getDefaultPostOptions(){
        var headers = new Headers();
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });
        return options;
    }
}