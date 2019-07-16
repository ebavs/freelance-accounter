import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CryptoService } from './crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  secretKey: Uint8Array = null;
  keyObservable = new Subject<Uint8Array>();

  constructor(private cryptoService: CryptoService) {
    this.secretKey = this.readKey();
  }

  setKey(key: string): void {
    this.secretKey = this.cryptoService.keyEncode(key);
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
