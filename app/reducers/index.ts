import { Url } from './url';
export * from './url';

export interface AppState {
  urls : Url[];
  nextUrlId: number;
}

