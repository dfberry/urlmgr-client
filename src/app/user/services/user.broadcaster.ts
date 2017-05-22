import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../../services/broadcast';

@Injectable()
export class UserEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(event: string, data: {}): void {
      console.log("UserEvent.fire " + event + " " + JSON.stringify(data));

    this.broadcaster.broadcast(MessageEvent, event);
  }

  on(): Observable<string> {
      console.log("UserEvent.on " + MessageEvent);
    return this.broadcaster.on<string>(MessageEvent);
  }
}