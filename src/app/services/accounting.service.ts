import { Injectable } from '@angular/core';
import { Factura } from '../types/factura';
import store from 'store';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  factura : Factura;
  facturas : Factura[] = [];

  constructor() { 
    const data = store.get('accountingData');
    if (data) {
      this.facturas = data;
    }
  }

  addFactura(factura : Factura) {
    if (factura.id === null) {
      factura.id = this.facturas.length + 1;
    }

    this.facturas.push(factura);
    this.persistFacturas();
  }
  
  getFacturas(): Factura[] {
    return this.facturas;
  }

  persistFacturas() {
    store.set('accountingData', this.facturas);
  }
}
