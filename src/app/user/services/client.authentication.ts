import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../';

// all authentication is kept in local storage 

@Injectable()
export class ClientAuthenticationService{

    currentUser: User = new User();

    constructor(){
      console.log("ClientAuthenticationService");
    }

    public getCurrentUser(): Observable<User>{
        console.log("ClientAuthenticationService " + JSON.stringify(localStorage.getItem('currentUser')));
        this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        return Observable.of(this.currentUser);
    }
    public setCurrentUser(currentUser: User){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUser = currentUser;
    }
    public removeCurrentUser(){
      localStorage.removeItem('currentUser');
      this.currentUser = new User();
    }
    public isAuthenticated(): Boolean {
      return this.currentUser.isAuthenticated;
    }
    public setCurrentAuthenticatedUserFromJson(jsonUser){
        let user = new User();
        user.transform(jsonUser);
        user.isAuthenticated=true;
        console.log("authorized set to true");
        this.setCurrentUser(user);
    }
}