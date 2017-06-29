import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../services/broadcast';

@Injectable()
export class ServerUserEvent {
  constructor(private broadcaster: Broadcaster) {}

  // user is inside data
  fire(event: string, data: any): void {
      console.log("ServerUserEvent.fire " + event + " " + JSON.stringify(data));

    this.broadcaster.broadcast(MessageEvent, {event: event, data: data});
  }

  on(): Observable<any> {
      console.log("ServerUserEvent.on " + MessageEvent);
    return this.broadcaster.on<any>(MessageEvent);
  }
}