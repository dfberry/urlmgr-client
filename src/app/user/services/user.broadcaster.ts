import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from '../../services/broadcast';
import { UserMessage } from './user.broadcast.message';
import { User } from '../user.model';

@Injectable()
export class UserEvent {
  constructor(private broadcaster: Broadcaster) {}

  // user is inside data
  fire(event: string, emailNPassword: any): void {
      console.log("UserEvent.fire " + event + " " + JSON.stringify(emailNPassword));

      let newUserMessage = new UserMessage();
      newUserMessage.event = event;
      newUserMessage.data = emailNPassword;

    this.broadcaster.broadcast(MessageEvent, newUserMessage);
  }

  on(): Observable<UserMessage> {
      console.log("UserEvent.on " + MessageEvent);
    return this.broadcaster.on<UserMessage>(MessageEvent);
  }
}
