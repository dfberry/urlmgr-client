import {Injectable} from '@angular/core';
import { User } from '../user.model';

@Injectable()
export class UserMessage {
  event: string;
  data: any;
}

@Injectable()
export class UserRegistrationMessage{
  event:string;
  data: any;
}