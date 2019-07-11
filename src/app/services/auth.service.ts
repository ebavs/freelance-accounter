import { Injectable } from '@angular/core';
import { decodeBase64 } from 'tweetnacl-util';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  secretKey: Uint8Array = null;
  keyObservable = new Subject<Uint8Array>();

  constructor() {
    this.secretKey = this.readKey();
  }

  setKey(key: string): void {
    if (key.length < 20) {
      key += 'abcdABCD12345';
    }

    if (key.length < 64) {
      key = key.padEnd(64, 'Aa0');
    }

    this.secretKey = decodeBase64(key).slice(0, 32);
    sessionStorage.setItem('poison', JSON.stringify(this.secretKey.map(x => x)));
    this.keyObservable.next(this.secretKey);
  }

  isValidKey(): boolean {
    return this.secretKey !== null;
  }

  isAuth(): boolean {
    return this.isValidKey();
  }

  readKey() {
    const tempKey = sessionStorage.getItem('poison');
    if (tempKey !== null) {
      return new Uint8Array(Object.values(JSON.parse(tempKey)));
    }
    return null;
  }
}
