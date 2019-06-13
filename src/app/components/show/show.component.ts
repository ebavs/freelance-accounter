import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { Factura } from '../../types/factura';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ConfirmComponent } from 'src/app/services/modal/confirm/confirm.component';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  facturas: Factura[];
  constructor(private accountingService: AccountingService, private modalService: ModalService) { 
    this.facturas = this.accountingService.getFacturas();
  }

  ngOnInit() {
    
  }

  addEntry() {
    
  }

  confirmModal() {
    //this.modalService.open(ConfirmComponent);
    const result = this.modalService.confirm({title: 'Borrar Factura', message: '¿Seguro que deseas borrar esta Factura?'});
    result.then((d) => {
      console.log('result is ' + d);
    }, (r) => {
      console.log('result is ' + r);
    });
    
  }

}
