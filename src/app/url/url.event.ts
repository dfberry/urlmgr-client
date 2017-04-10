import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../services/broadcast';

@Injectable()
export class UrlEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: string): void {
      console.log("UrlEvent.fire " + data);

    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<string> {
      console.log("UrlEvent.on " );
    return this.broadcaster.on<string>(MessageEvent);
  }
}