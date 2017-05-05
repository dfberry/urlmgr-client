import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';


// validate user and password against server
@Injectable()
export class AuthenticationHttpService{

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
}