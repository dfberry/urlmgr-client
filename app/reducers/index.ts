import { Url } from './url';
import { FeedMgr } from './feed';

export * from './feed';
export * from './url';


export interface AppState {
  urls : Url[];
  nextUrlId: number;
  feeds: FeedMgr[];
}

