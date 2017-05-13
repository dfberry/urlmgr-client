import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../../services/broadcast';

@Injectable()
export class UserEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: string): void {
      //console.log("UserEvent.fire " + data);

    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<string> {
      //console.log("UserEvent.on " );
    return this.broadcaster.on<string>(MessageEvent);
  }
}