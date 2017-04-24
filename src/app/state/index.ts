import { Url/*, Feed*/ } from '../url/url.model';
import { User } from '../user/user.model';

//import { UserActions, UserState } from './state.user';
//import { StateService } from './state.service';

export interface AppState {
  urls : Url[];
  //feeds: Feed[];
  //selectedFeed: Feed,
  user: User
}

export * from './state.user';
export * from './state.url';
export * from './state.service';

