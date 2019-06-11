import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../services/accounting.service';
import { Factura } from '../types/factura';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  facturas: Factura[];
  constructor(private accountingService: AccountingService) { 
    this.facturas = this.accountingService.getFacturas();
  }

  ngOnInit() {
  }

  addEntry() {
    
  }

}
