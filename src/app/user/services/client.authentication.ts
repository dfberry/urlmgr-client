import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../';

// all authentication is kept in local storage 

@Injectable()
export class ClientAuthenticationService{

    currentUser: Observable<User>;

    constructor(){
      console.log("ClientAuthenticationService");
    }

    public getCurrentUser(): User{
        console.log("ClientAuthenticationService " + JSON.parse(localStorage.getItem('currentUser')));
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    public setCurrentUser(currentUser: User){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    public removeCurrentUser(){
      localStorage.removeItem('currentUser');
    }
    public isAuthenticated(): Boolean {
      let tempUser = this.getCurrentUser();
      if (tempUser && tempUser.isAuthenticated) return true;
      return false;
    }
    public setCurrentAuthenticatedUserFromJson(jsonUser){
        let user = new User();
        user.transform(jsonUser);
        user.isAuthenticated=true;
        console.log("authorized set to true");
        this.setCurrentUser(user);
 
    }



}