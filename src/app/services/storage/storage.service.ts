import { Injectable } from '@angular/core';
import store from 'store';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    protected cryptoService: CryptoService
    ) {}

  readStore(): any {
    const data = store.get('accountingData');

    if (data && this.cryptoService.isEncrypted(data)) {
      return this.cryptoService.decrypt(data);
    } else if (data && !this.cryptoService.isEncrypted(data)) {
      return data;
    }
    return {};
  }

  persist(data: any) {
    const saved = this.readStore();

    if (saved === {}) {
      throw new Error('No data to Read');
    }

    if (data.facturas) {
      saved.facturas = data.facturas;
    }

    if (data.clientes) {
      saved.clientes = data.clientes;
    }

    if (data.gastos) {
      saved.gastos = data.gastos;
    }

    if (data.config) {
      saved.config = data.config;
    }

    const encryptedData = this.cryptoService.encrypt(saved);
    store.set('accountingData', encryptedData);
  }
}
