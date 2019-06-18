import { Injectable } from '@angular/core';
import { Factura } from '../types/factura';
import store from 'store';
import { Cliente } from '../types/cliente';
import { Gasto } from '../types/gasto';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  facturas: Factura[] = [];
  clientes: Cliente[] = [];
  gastos: Gasto[] = [];
  groups: any;

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
    return this.facturas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  getFacturasGrouped(NumberOfMonths, NumberGroup, year): Factura[] {
    const firstMonth = ((NumberOfMonths * NumberGroup) - NumberOfMonths) + 1;
    const lastMonth = firstMonth + NumberOfMonths - 1;
    
    return this.getFacturas().filter((f) => {
      const fecha = new Date(f.fecha);
      return fecha.getFullYear() === year && fecha.getMonth() >= firstMonth-1 && fecha.getMonth() <= lastMonth;
    });
  }

  getFactura(id): Factura {
    return this.facturas.find(f => f.id === id);
  }

  removeFactura(id) {
    const index = this.facturas.findIndex(f => f.id === id);
    this.facturas.splice(index, 1);
    this.persist();
  }
  
  addGasto(gasto : Gasto) {
    if (gasto.id === null) {
      gasto.id = this.calculateId(this.gastos);
    }

    this.gastos.push(gasto);
    this.persist();
  }

  getGastos(): Gasto[] {
    return this.gastos;
  }

  getGasto(id): Gasto {
    return this.gastos.find(g => g.id === id);
  }

  removeGasto(id) {
    const index = this.gastos.findIndex(g => g.id === id);
    this.gastos.splice(index, 1);
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
            gastos: this.gastos,
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
      
      if (data.gastos) {
        this.gastos = data.gastos;
      }

      this.persist();
    }
  }

  calculateGroups() {
    const data = [...this.facturas, ...this.gastos].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    const minDate = new Date(data[0].fecha);
    const maxDate = new Date(data[data.length-1].fecha);
    const quarters = ['Enero/Febrero/Marzo', 'Abril/Mayo/Junio', 'Julio/Agosto/Sepiembre', 'Octubre/Noviembre/Diciembre'];
    const options = [];

    for (let pastYear = minDate.getFullYear(); pastYear < maxDate.getFullYear(); pastYear++) {
      quarters.forEach((q,index) => {
        const yes = data.find(e => parseInt((new Date(e.fecha).getMonth() / 3).toString()) === index && new Date(e.fecha).getFullYear() === pastYear);
        if(yes) {
          options.push({
            text: q + ' ' + pastYear,
            quarter: index+1,
            year: pastYear
          });
        }
      });
    }

    quarters.slice(0, parseInt((maxDate.getMonth() / 3 + 1).toString())).forEach((q, index) => options.push({
      text: q + ' ' + maxDate.getFullYear(),
      quarter: index+1,
      year: maxDate.getFullYear()
    }));
    
    return options;
  }
}
