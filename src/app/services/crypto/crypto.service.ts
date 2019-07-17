import { Injectable } from '@angular/core';
import { secretbox, randomBytes } from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from 'tweetnacl-util';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private key: Uint8Array = null;

  constructor() { }

  nonce(): Uint8Array {
    return randomBytes(secretbox.nonceLength);
  }

  keyEncode(key) {
    if (key.length < 20) {
      key += 'abcdABCD12345';
    }

    if (key.length < 64) {
      key = key.padEnd(64, 'Aa0');
    }

    return decodeBase64(key).slice(0, 32);
  }

  setKey(key) {
    this.key = key;

    return (key != null); // && typeof key === 'UInt8Array'
  }

  isSetKey() {
    return this.key != null;
  }

  encrypt(json) {
    const nonce = this.nonce();
    const messageUint8 = decodeUTF8(JSON.stringify(json));
    const box = secretbox(messageUint8, nonce, this.key);

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  }

  decrypt(messageWithNonce) {
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
    const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
      secretbox.nonceLength,
      messageWithNonce.length
    );

    const decrypted = secretbox.open(message, nonce, this.key);

    if (!decrypted) {
      throw new Error('Could not decrypt message');
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  }

  isEncrypted(json: any): boolean {
    return json !== undefined && json !== null && json.constructor !== Object;
  }

  tryToDecrypt(data, key) {
    const tempKey = this.key;
    this.key = key;
    const canDecrypt = this.decrypt(data);
    this.key = tempKey;

    return canDecrypt;
  }
}
