import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../../services';

@Injectable()
export class UrlEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(event: string, data: any): void {
    console.log("UrlEvent.fire " + event + " " + JSON.stringify(data));

    this.broadcaster.broadcast(MessageEvent, { event: event, data:data});
  }

  on(): Observable<string> {
    return this.broadcaster.on<string>(MessageEvent);
  }
}