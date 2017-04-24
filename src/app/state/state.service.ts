import { Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserActions } from '../app.state';
import { User } from '../user/user.model';

@Injectable()
export class StateService{
      constructor(
        private store: Store<AppState>
    ){}
    public userLogon(user:User){
        this.store.dispatch({type: UserActions.USER_LOGIN, payload: user});
    }
}