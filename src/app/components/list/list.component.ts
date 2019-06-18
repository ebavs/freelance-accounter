import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { Factura } from '../../types/factura';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Gasto } from 'src/app/types/gasto';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  quarters: any[];
  quarterActual: any;
  quarterIndex: number;
  facturas: Factura[];
  gastos: Gasto[];
  totales: {
    base: number;
    iva: number,
    irpf: number,
    total: number
  }
  constructor(private accountingService: AccountingService, private modalService: ModalService) { 
    this.quarters = this.accountingService.calculateGroups();
  }

  ngOnInit() {
    this.quarterIndex = this.quarters.length-1;
    this.quarterActual = this.quarters[this.quarterIndex];
    this.refreshData();
  }

  removeFactura(factura) {
    this.modalService.confirm({
      title: 'Borrar Factura', 
      message: '¿Seguro que deseas borrar la factura ' + factura.numero + '?'}
    ).then(() => {
      this.accountingService.removeFactura(factura.id);
      this.refreshData();
    });
  }
  
  removeGasto(gasto) {
    this.modalService.confirm({
      title: 'Borrar Gasto', 
      message: '¿Seguro que deseas borrar el Gasto ' + gasto.concepto + '?'}
    ).then(() => {
      this.accountingService.removeGasto(gasto.id);
      this.refreshData();
    });
  }

  refreshData() {
    this.facturas = this.accountingService.getFacturasGrouped(3, this.quarterActual.quarter, this.quarterActual.year);
    this.gastos = this.accountingService.getGastos();
    this.initTotales();
  }

  initTotales() {
    this.totales = {
      base: 0,
      iva: 0,
      irpf: 0,
      total: 0
    };
    this.facturas.forEach(f => {
      this.totales.base += +f.importe;
      this.totales.iva += +f.importeIVA;  
      this.totales.irpf += +f.importeIRPF;
      this.totales.total += +f.importeFactura;
    });

    this.totales.base = Math.round(this.totales.base * 100) / 100;
    this.totales.iva = Math.round(this.totales.iva * 100) / 100;
    this.totales.irpf = Math.round(this.totales.irpf * 100) / 100;
    this.totales.total = Math.round(this.totales.total * 100) / 100;
  }

  quarterChange(i) {
    this.quarterIndex += i;
    this.quarterActual = this.quarters[this.quarterIndex];

    this.refreshData();
  }
}
