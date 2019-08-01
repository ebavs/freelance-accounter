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

  periods: any[];
  periodActual: any;
  periodIndex: number;
  viewSelected: number;
  facturas: Factura[];
  gastos: Gasto[];
  totales: {
    fBase: number;
    fIva: number,
    fIrpf: number,
    fTotal: number,
    gBase: number;
    gIva: number,
    gTotal: number,
    tBase: number;
    tIva: number,
    tIrpf: number,
    tTotal: number,
  };

  constructor(private accountingService: AccountingService, private modalService: ModalService) {
    this.periods = this.accountingService.calculateGroups(3);
  }

  ngOnInit() {
    this.periodIndex = this.periods.length - 1;
    this.periodActual = this.periods[this.periodIndex];
    this.viewSelected = 3;
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
    if (this.periods.length > 0) {
      this.facturas = this.accountingService.getFacturasGrouped(this.viewSelected, this.periodActual.quarter, this.periodActual.year);
      this.gastos = this.accountingService.getGastosGrouped(this.viewSelected, this.periodActual.quarter, this.periodActual.year);
    } else {
      this.facturas = this.accountingService.getFacturas();
      this.gastos = this.accountingService.getGastos();
    }

    this.initTotales();
  }

  initTotales() {
    this.totales = {
      fBase: 0,
      fIva: 0,
      fIrpf: 0,
      fTotal: 0,
      tBase: 0,
      tIva: 0,
      tIrpf: 0,
      tTotal: 0,
      gBase: 0,
      gIva: 0,
      gTotal: 0
    };

    this.facturas.forEach(f => {
      this.totales.fBase += +f.importe;
      this.totales.fIva += +f.importeIVA;
      this.totales.fIrpf += +f.importeIRPF;
      this.totales.fTotal += +f.importeFactura;
    });

    this.gastos.forEach(g => {
      this.totales.gBase += +g.importe;
      this.totales.gIva += +g.importeIVA;
      this.totales.gTotal += +g.importeFactura;
    });

    this.totales.tBase = Math.round((+this.totales.fBase - +this.totales.gBase) * 100) / 100;
    this.totales.tIva = Math.round((this.totales.fIva - this.totales.gIva) * 100) / 100;
    this.totales.tIrpf = Math.round(this.totales.fIrpf * 100) / 100;
    this.totales.tTotal = Math.round((this.totales.fTotal - this.totales.gTotal) * 100) / 100;

    this.totales.fBase = Math.round(this.totales.fBase * 100) / 100;
    this.totales.fIva = Math.round(this.totales.fIva * 100) / 100;
    this.totales.fIrpf = Math.round(this.totales.fIrpf * 100) / 100;
    this.totales.fTotal = Math.round(this.totales.fTotal * 100) / 100;

    this.totales.gBase = Math.round(this.totales.gBase * 100) / 100;
    this.totales.gIva = Math.round(this.totales.gIva * 100) / 100;
    this.totales.gTotal = Math.round(this.totales.gTotal * 100) / 100;
  }

  quarterChange(i) {
    this.periodIndex += i;
    this.periodActual = this.periods[this.periodIndex];

    this.refreshData();
  }

  viewChange(i: number) {
    this.viewSelected = i;

    if (i === 1) {
      this.periodIndex = new Date().getMonth() + 1;
    } else if (i === 3) {
      this.periodIndex = (new Date().getMonth() + 1) / 3;
    } else {
      this.periodIndex = 1;
    }
    this.periods = this.accountingService.calculateGroups(i);
    if (this.periods.length > 0) {
      this.periodActual = this.periods[this.periodIndex];
    } else {
      this.periodActual = {
        text: ''
      };
    }

    this.refreshData();
  }
}
