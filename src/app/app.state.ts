import { Url/*, Feed*/ } from './url/url.model';
import { User } from './user/user.model';

export interface AppState {
  urls : Url[];
  //feeds: Feed[];
  //selectedFeed: Feed,
  user: User
}

export const UserStates = {
      USER_LOGIN : '[User] Authorized',
      USER_CLEAR : '[User] Initialized'
  };

export function UserState(state=new User(), action) {

      console.log("userState state = " + JSON.stringify(state));
      console.log("userState action = " + JSON.stringify(action));

      let user:User = new User();

      switch (action.type) {
          case UserStates.USER_CLEAR:
            return new User();       

          case UserStates.USER_LOGIN:
              user = action.payload;
              user.isAuthenticated = true;
            return user;   
                
          default:
              return state;
      }
  }


export const UrlStates = {
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
        case UrlStates.URL_ADD_1:
          return [
              ...state,
              action.payload
          ];       
        case UrlStates.URL_ADD_N:
          return action.payload; 
        case UrlStates.URL_CLEAR:
          return [];
        default:
            return state;
    }
}