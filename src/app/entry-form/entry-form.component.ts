import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Factura } from '../types/factura';
import { AccountingService } from '../services/accounting.service';

@Component({
  selector: 'entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {
  
  entryForm: FormGroup;
  submitted: Boolean = false;

  constructor( 
    private accountService : AccountingService,
    private formBuilder: FormBuilder
  ) {
    
  }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      fNumero: ['', Validators.required],
      fFecha: ['', Validators.required],
      fImporte: ['', Validators.required],
      fVencimiento: ['', Validators.required],
      fIva: [''],
      fNotas: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.entryForm.invalid) {
        return;
    }

    const f: Factura = {
      id: null,
      numero: this.entryForm.value.fNumero,
      fecha: this.entryForm.value.fFecha,
      importe: this.entryForm.value.fImporte,
      vencimiento: this.entryForm.value.fVencimiento,
      iva: this.entryForm.value.fIva !== true ? true : false,
      notas: this.entryForm.value.fNotas,
      importeIRPF: this.entryForm.value.fIva !== true ? (this.entryForm.value.fImporte * 15) / 100 : 0,
      importeIVA: this.entryForm.value.fIva !== true ? (this.entryForm.value.fImporte * 21) / 100 : 0,
      importeFactura: 0
    }
    f.importeFactura = f.importe - f.importeIRPF + f.importeIVA;

    this.accountService.addFactura(f);
    this.entryForm.reset();
  }

}
