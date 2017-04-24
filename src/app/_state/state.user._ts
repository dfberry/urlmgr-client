import { User } from '../user/user.model';

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