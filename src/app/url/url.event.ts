import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../services/broadcast';

@Injectable()
export class UrlEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: string): void {

    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<string> {
    return this.broadcaster.on<string>(MessageEvent);
  }
}