import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { CryptoService } from './crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // secretKey: Uint8Array = null;
  // keyObservable = new Subject<Uint8Array>();
  private validatedSubject: BehaviorSubject<boolean>;
  validated: Observable<boolean>;

  constructor(private cryptoService: CryptoService) {
    const keyIsOk = this.cryptoService.setKey(this.readKey());
    this.validatedSubject = new BehaviorSubject<boolean>(keyIsOk);
    this.validated = this.validatedSubject.asObservable();
  }

  setKey(key: string): void {
    const secretKey = this.cryptoService.keyEncode(key);
    sessionStorage.setItem('poison', JSON.stringify(secretKey.map(x => x)));
    this.cryptoService.setKey(secretKey);
    this.validatedSubject.next(true);
  }

  isAuth(): boolean {
    return this.cryptoService.isSetKey();
  }

  readKey() {
    const tempKey = sessionStorage.getItem('poison');
    if (tempKey !== null) {
      return new Uint8Array(Object.values(JSON.parse(tempKey)));
    }
    return null;
  }
}
