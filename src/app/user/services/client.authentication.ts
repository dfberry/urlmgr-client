import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../';

// all authentication is kept in local storage 

@Injectable()
export class ClientAuthenticationService{

    public name:String = "ClientAuthenticationService";
    instatiatedDateTime : Date ;
    private currentUser: User;

    constructor(){

      this.currentUser = new User();
      this.instatiatedDateTime  = new Date();
      console.log("ClientAuthenticationService c'tor " + this.instatiatedDateTime);
    }

    public getCurrentUser(): Observable<User>{
        let newUser = localStorage.getItem('currentUser');
        if(!newUser) return Observable.of(new User());
        if(newUser) this.currentUser =  JSON.parse(newUser);
        console.log("ClientAuthenticationService " + JSON.stringify(newUser));
        return Observable.of(this.currentUser);
    }
    public setCurrentUser(currentUser: User){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUser = currentUser;
    }
    public removeCurrentUser(){
      localStorage.removeItem('currentUser');
      this.currentUser = new User();
      console.log("user cleared on client-side");
    }
    public isAuthenticated(): Boolean {
      if(this.currentUser)return this.currentUser.isAuthenticated;
      throw new Error("clientAuthService - user isn't initialized");
    }
    public setCurrentAuthenticatedUserFromJson(jsonUser){
        let user = new User();
        user.transform(jsonUser);
        
        // TBD: fix to use valid token and user.isAuthenticated()
        //user.isAuthenticated=true;
        
        console.log("authorized set to true");
        this.setCurrentUser(user);
    }
}