import {Injectable} from '@angular/core';
import { Url/*, Feed*/ } from './url/url.model';
import { User } from './user/user.model';
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
  public getCurrentUser(){
    return this.user;
  }
  public getState(){
    return this.store;
  }
};
export const UserActions = {
      USER_LOGIN : '[User] Authorized',
      USER_CLEAR : '[User] Initialized'
  };
function newUnauthenticatedUser(){
  let user = new User();
  user.isAuthenticated = false;
  return user;
}
export function UserState(state = new User(), action) {

  switch ((action && action.type) ? action.type : null) {

    // set user
    case UserActions.USER_LOGIN:
      let user = action.payload;
      user.isAuthenticated = true;
      return user;

    // reset user
    case UserActions.USER_CLEAR:
      return newUnauthenticatedUser();
    default:
      return newUnauthenticatedUser();
  }
}


export const UrlActions = {
      URL_ADD_1 : '[Url] Add 1',
      URL_ADD_N : '[Url] Add N',
      URL_CLEAR: '[Url] Initialized'
  };

export function UrlState (state = [], action) {

     switch ((action && action.type) ? action.type : undefined) {
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