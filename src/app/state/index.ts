import { Url/*, Feed*/ } from '../url/url.model';
import { User } from '../user/user.model';

export interface AppState {
  urls : Url[];
  //feeds: Feed[];
  //selectedFeed: Feed,
  user: User
}

export * from './state.url';
export * from './state.user';
