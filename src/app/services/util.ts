import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  constructor() {}

  timestamp() {
    return Math.floor(new Date().valueOf() / 1000);
  }
}