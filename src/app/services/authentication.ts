/*
  to server 
*/
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';


// validate user and password against server
@Injectable()
export class ServerAuthenticationService{

    currentUser: Observable<User>;

    constructor(
      private http: Http
    ){}

    public authenticateToServer(authObj,serverUrl) {
        let self = this;
        return this.http.post(serverUrl, authObj)
            .map((response:Response) => {
                console.log("auth.http.service auth returned");
                return response.json();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("auth.http.service auth  failed err " + err);
                console.log(err.text());
                throw self.errMsg(err);
            });
    }
    
    public registerToServer(regObj, serverUrl){

        let self = this;

        return this.http.post(serverUrl, regObj)
            .map((response:Response) => {
                console.log("auth.http.service registration returned");
                return response.json();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("auth.http.service registration failed err " + err);
                throw self.errMsg(err);
            });
    }

    public deAuthenticateToServer(userObj, serverUrl){

        let self = this;

        if (!userObj || !userObj.id || !userObj.token || !userObj.token.token) return Promise.reject("logout: user id || user token not found");

        let userId= userObj.id,
            userToken= userObj.token.token;

        let headers = new Headers();
        headers.set('x-access-token', userToken);

        let options:RequestOptionsArgs = {
            headers : headers,
            body : {
                user: userId
            }
        };

        return this.http.delete(serverUrl, options)
            .map((response:Response) => {
                // nothing returned but 200
                console.log("logout success "); 
                return response.json();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("logout err " + err);
                console.log(err.text());
                throw self.errMsg(err);
            });
    }
    public profileChangeToServer(userObj, ServerUrl){
        return Promise.resolve("services/authentication::profileChangeToServer not implemented");
    }

    private errMsg(err){
        if(!err) return Error("unable to determine server authentication error");

        if(!err.hasOwnProperty("_body")) return Error("unable to determine server authentication error message");

        // api server is down
        if(err.status === 0) return Error("server is unreachable");
        
        let data;

        typeof err._body === "object" ? data = err._body : data = JSON.parse(err._body);

        // expected error from server
        if(data && data.api && data.api.error && data.api.error.message) return Error(data.api.error.message);

        return Error(data);
    }
}