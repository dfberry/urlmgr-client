import { Feed} from './feed';
import { Url} from './url';

export * from './feed';
export * from './url';

export interface AppState {
  urls : Url[];
  feeds: Feed[];
}






