import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

/* 
https://www.techifide.com/custom-events-in-angular-2/
http://reactivex.io/rxjs/manual/overview.html#subject
https://plnkr.co/edit/bcI4OXFrZ93CeEM8jaq9?p=info

Subject is multicast so many listeners 
whereas Observable is singlecase meaning 1 listener

*/

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class Broadcaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }
}