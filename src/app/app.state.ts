import {Injectable} from '@angular/core';
import { Url } from './url/url/url.model';
import { User, UserEvent } from './user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config/config.service';
import { ServerAuthenticationService } from './services';
import { ServerUserEvent } from './events';

export interface IAppState {
  urls : Url[];
  user: User
}
@Injectable()
export class AppState implements IAppState{
  urls: Url[];
  user: User = new User();
  config: {};
  verifyCredentialsUrl: string;

  constructor(
    private store: Store<AppState>,
    private serverAuthenticationService: ServerAuthenticationService,
    private configService: ConfigService,
    private serverUserEvent: ServerUserEvent,
    private userEvent: UserEvent
  ){
    this.user = new User();
    this.config = configService.getAll();
    this.verifyCredentialsUrl = this.config["apiUrl"] + "auth";
  }

  public setUser(user: User){
    this.user = user; // in case there are public sections of site
    if(this.user.isAuthenticated){
      this.store.dispatch({type: UserActions.USER_LOGIN, payload: user});
    }
  }
  public clearUser(){
    this.user = new User();
    this.store.dispatch({type: UserActions.USER_LOGOUT, payload: undefined});
  }
  public getCurrentUser(): Observable<User>{
    return this.store.select(state => state.user);
  }
  public getState(){
    return this.store;
  }
  public setUrls(urls){
    this.store.dispatch({type: UrlActions.URL_ADD_N, payload: urls});
  }
  public clearUrls(){
    this.store.dispatch({type: UrlActions.URL_CLEAR, payload: []});
  }
  public verifyCredentials(credentials:any){
    console.log("verifyCredentials");
    let self = this;

    return this.serverAuthenticationService.authenticateToServer(credentials,this.verifyCredentialsUrl).then( json => {

      console.log("user credentials verfied " + JSON.stringify(json));

      if(!json || !json.data || !json.data.user) throw Error("user not returned");

      self.user.transform(json.data.user);

      if(!self.user.isAuthenticated) throw Error("user returned but not authorized");

      // only put user in state if user if authenticated
      self.setUser(self.user);
      self.userEvent.fire('USER_LOGON_RESPONSE_SUCCESS',self.user);
    }).catch((err: any) => {
        console.log("user credentials failed ");
        console.log(err);
        self.userEvent.fire('USER_LOGON_RESPONSE_FAILURE',err);
    });
  }
  // when app starts up, but no user is logged on, clear up any leftovers
  public logout(user:User){
    console.log("verifyCredentials");
    let self = this;

    if(!user || !user.id) return;

    return this.serverAuthenticationService.deAuthenticateToServer(user, this.config["apiUrl"] + 'users/' + user.id + '/tokens').then( json => {
        console.log("logout succeeded " + JSON.stringify(json));
        self.clearUser();
        self.userEvent.fire('USER_LOGOUT_RESPONSE_SUCCESS',self.user);
      }).catch((err: any) => {
        console.log("logout failed ");
        console.log(err);
        self.userEvent.fire('USER_LOGOUT_RESPONSE_FAILURE',err);
    });
    
  }
  public isAuthenticated(){
    return this.user.isAuthenticated; 
  }
  /*
  user = {
      email,
      password,
      lastName,
      firstName
  }
  */
  public register(user:any){
    console.log("register");
    let self = this;

    // once user is registered with password, need to forget password on client-side
    if(!user || !user.email || !user.password) return;

    return this.serverAuthenticationService.registerToServer(user, this.config["apiUrl"] + 'users/').then( json => {
        console.log("registration succeeded " + JSON.stringify(json));
        delete user.password;
        self.userEvent.fire('USER_REGISTRATION_RESPONSE_SUCCESS',user);
      }).catch((err: any) => {
        console.log("registration failed ");
        console.log(err);
        self.userEvent.fire('USER_REGISTRATION_RESPONSE_FAILURE',err);
    });
  }
  public saveProfile(user:any){
    console.log("saveProfile");
    let self = this;
    let err=null;

    // ignore password - as password should never be in client-side object
    if(!user || !user.email || !user.id) return;

    return this.serverAuthenticationService.profileChangeToServer(user, this.config["apiUrl"] + 'users/').then( json => {
        self.userEvent.fire('USER_PROFILE_SAVE_RESPONSE_SUCCESS',user);
      }).catch((err: any) => {
        self.userEvent.fire('USER_PROFILE_SAVE_RESPONSE_FAILURE',err);
    });

  }
  public getConfig(config){
    console.log("getConfig");
    return this.config;
  }
};

export const UserActions = {
      USER_LOGIN : '[User] Authorized',
      USER_LOGOUT : '[User] Initialized'
  };

export function UserState(state=new User(), action) {

    console.log("user state changed");
    console.log(action);

      let user:User = new User();

      switch (action.type) {
          case UserActions.USER_LOGOUT:
            return new User();       

          case UserActions.USER_LOGIN:
              user = action.payload;
            return user;   
                
          default:
              return state;
      }
  }


export const UrlActions = {
      URL_ADD_1 : '[Url] Add 1',
      URL_ADD_N : '[Url] Add N',
      URL_DELETE : '[Url] delete',
      URL_UPDATE : '[Url] update',
      URL_CLEAR: '[Url] Initialized'
  };

export function UrlState (state = [], action) {

    console.log("url state changed");
    console.log(action);

     switch (action.type) {
        case UrlActions.URL_ADD_1:
          return [
              ...state,
              action.payload
          ];       
        case UrlActions.URL_ADD_N:
          return action.payload; 
        case UrlActions.URL_CLEAR:
          return [];
        default:
            return state;
    }
}