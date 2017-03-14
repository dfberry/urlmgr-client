import { Url, Feed } from './reducers/';
import { User } from './user/user.model';

export interface AppState {
  urls : Url[];
  feeds: Feed[];
  selectedFeed: Feed,
  user: User
}

export const UserStates = {
      USER_LOGIN : '[User] Authorized',
      USER_LOGOFF : '[User] No longer Authorized',
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