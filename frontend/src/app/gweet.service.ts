import { Injectable } from '@angular/core'

import { Gweet } from './gweet';
import { GWEETS } from './mock-gweets';

@Injectable()
export class GweetService {
  getGweets(): Promise<Gweet[]> {
    return Promise.resolve(GWEETS);
  }
}
