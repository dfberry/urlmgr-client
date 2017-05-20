import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../user.model';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';


// validate user and password against server
@Injectable()
export class AuthenticateWithServerService{

    currentUser: Observable<User>;

    constructor(private http: Http){

    }

    public authenticateToServer(authObj,serverUrl) {
        return this.http.post(serverUrl, authObj)
            .map((response:Response) => {
                console.log("auth.http.service auth returned");
                return response.json();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("auth.http.service auth  failed err " + err);
                throw err;
            });
    }
    
    public registerToServer(regObj, serverUrl){

        return this.http.post(serverUrl, regObj)
            .map((response:Response) => {
                console.log("auth.http.service registration returned");
                return response.json();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("auth.http.service registration failed err " + err);
                throw err;
            });
    }

    public deAuthenticateToServer(userObj, serverUrl){

        let postForm = {
            user: userObj['id'],
        };

        let headers = new Headers();
        headers.set('x-access-token', userObj['token']);

        let options:RequestOptionsArgs = {
            headers : headers,
            body : postForm
        };

        return this.http.delete(serverUrl, options)
            .map((response:Response) => {
                // nothing returned but 200
                //console.log("logout success "); 
                return Promise.resolve();
            })
            .toPromise()
            .catch((err: any) => {
                //console.log("logout err " + err);
                return Promise.reject(err.message)
            });
    }
}