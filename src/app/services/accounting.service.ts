import { Injectable } from '@angular/core';
import { Factura } from '../types/factura';
import store from 'store';
import { Cliente } from '../types/cliente';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  facturas: Factura[] = [];
  clientes: Cliente[] = [];

  constructor() { 
    const data = store.get('accountingData');
    if (data) {
      if (data.facturas) {
        this.facturas = data.facturas;
      }
      
      if (data.clientes) {
        this.clientes = data.clientes;
      }
    }
  }

  addFactura(factura : Factura) {
    if (factura.id === null) {
      factura.id = this.facturas.length + 1;
    }

    this.facturas.push(factura);
    this.persist();
  }

  addCliente(cliente: Cliente) {
    if (cliente.id === null) {
      cliente.id = this.clientes.length + 1;
    }

    this.clientes.push(cliente);
    return cliente;
  }
  
  getFacturas(): Factura[] {
    return this.facturas;
  }

  persist() {
    store.set('accountingData', 
          {
            facturas: this.facturas,
            clientes: this.clientes,
          });
  }
}
