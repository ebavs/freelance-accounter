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
    const data = this.readStore();
    this.setAllData(data);
  }

  addFactura(factura : Factura) {
    if (factura.id === null) {
      factura.id = this.calculateId(this.facturas);
    }

    this.facturas.push(factura);
    this.persist();
  }

  getFacturas(): Factura[] {
    return this.facturas;
  }

  getFactura(id): Factura {
    return this.facturas.find(f => f.id === id);
  }

  removeFactura(id) {
    const index = this.facturas.findIndex(f => f.id === id);
    this.facturas.splice(index, 1);
    this.persist();
  }

  addCliente(cliente: Cliente) {
    if (cliente.id === null) {
      cliente.id = this.calculateId(this.clientes);
    }

    this.clientes.push(cliente);
    return cliente;
  }
  
  getCliente(id): Cliente {
    return this.clientes.find(c => c.id === id);
  }

  removeCliente(id) {
    const index = this.clientes.findIndex(c => c.id === id);
    this.clientes.splice(index, 1);
  }

  private calculateId(data: any): number {
    if (data.length === 0) {
      return 1;
    }
    
    return data[data.length - 1].id + 1;
  }

  private persist() {
    store.set('accountingData', 
          {
            facturas: this.facturas,
            clientes: this.clientes,
          });
  }

  readStore(): any {
    return store.get('accountingData');
  }

  setAllData(data) {
    if (data) {
      if (data.facturas) {
        this.facturas = data.facturas;
      }
      
      if (data.clientes) {
        this.clientes = data.clientes;
      }

      this.persist();
    }
  }
}
