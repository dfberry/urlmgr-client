import {Injectable} from '@angular/core';
import { Url/*, Feed*/ } from './url';
import { User } from './user';
import { Store } from '@ngrx/store';

export interface IAppState {
  urls : Url[];
  //feeds: Feed[];
  //selectedFeed: Feed,
  user: User
}
@Injectable()
export class AppState implements IAppState{
  urls: Url[];
  user: User;

  constructor(private store: Store<AppState>){}

  public setUser(user: User){
    this.user = user;
    if(user && user.isAuthenticated){
      this.store.dispatch({type: UserActions.USER_LOGIN, payload: user});
    }
  }
};
export const UserActions = {
      USER_LOGIN : '[User] Authorized',
      USER_CLEAR : '[User] Initialized'
  };

export function UserState(state=new User(), action) {

      console.log("userState state = " + JSON.stringify(state));
      console.log("userState action = " + JSON.stringify(action));

      let user:User = new User();

      switch (action.type) {
          case UserActions.USER_CLEAR:
            return new User();       

          case UserActions.USER_LOGIN:
              user = action.payload;
              user.isAuthenticated = true;
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

      console.log("urlState state = " + JSON.stringify(state));
      console.log("urlState action = " + JSON.stringify(action));

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