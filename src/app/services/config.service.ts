import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { CryptoService } from './crypto/crypto.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends StorageService {

  config: any = {};

  constructor(
    private authService: AuthService,
    protected cryptoService: CryptoService
    ) {
      super(cryptoService);

      this.authService.validated.subscribe(() => {
        this.init();
      });

      if (this.authService.readKey() !== null && this.config === null) {
        this.init();
      }
    }

  init() {
    const data = this.readStore();
    this.setData(data);
  }

  set(data: any) {
    this.config = { ...this.config, ...data };

    this.persist({
      config: this.config
    });
  }

  setData(data, persist: boolean = false) {
    if (data) {
      if (data.config) {
        this.config = data.config;
      }

      if (persist) {
        this.persist({
          config: this.config
        });
      }
    }
  }
}
