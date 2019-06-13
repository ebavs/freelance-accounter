import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { Factura } from '../../types/factura';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  facturas: Factura[];
  constructor(private accountingService: AccountingService, private modalService: ModalService) { 
    this.facturas = this.accountingService.getFacturas();
  }

  ngOnInit() {
    
  }

  confirmModal(factura) {
    this.modalService.confirm({
      title: 'Borrar Factura', 
      message: '¿Seguro que deseas borrar la factura ' + factura.numero + '?'}
    ).then(() => {
      this.accountingService.removeFactura(factura.id);
      this.facturas = this.accountingService.getFacturas();
    });
  }

}
