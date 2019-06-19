import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Factura } from '../../types/factura';
import { AccountingService } from '../../services/accounting.service';
import { Router } from '@angular/router';
import { Cliente } from '../../types/cliente';
import { ivas } from 'src/app/mocks/ivas.mock';
import { Workers } from 'src/app/mocks/persons.mock';
import { Worker } from 'src/app/types/worker';

@Component({
  selector: 'entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {
  
  entryForm: FormGroup;
  submitted: Boolean = false;
  intChecked: Boolean = false;
  clientes: Cliente[];
  isSelectVisible: Boolean = true;
  ivas: any;
  workers: Worker[] = [];

  constructor( 
    private accountService : AccountingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.ivas = ivas.reverse();
    this.workers = Workers;
  }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      fClientes: [''],
      fCliente: [''],
      fNumero: ['', Validators.required],
      fConcepto: ['', Validators.required],
      fFecha: ['', Validators.required],
      fImporte: ['', Validators.required],
      fVencimiento: [0, Validators.required],
      fIva: [this.ivas[0]],
      fNotas: [''],
      fPor: [0],
      fPara: [''],
      fInternacional: [false]
    });

    this.clientes = this.accountService.getClientes();
    this.isSelectVisible = this.clientes.length > 0;
  }

  changeCliente() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  onSubmit() {
    const cliente = this.validateClientes();
    
    this.submitted = true;
    if (this.entryForm.invalid) {
        return;
    }
    
    const f: Factura = {
      id: null,
      cliente: cliente,
      numero: this.entryForm.value.fNumero,
      concepto: this.entryForm.value.fConcepto,
      fecha: this.entryForm.value.fFecha,
      importe: this.entryForm.value.fImporte,
      vencimiento: this.entryForm.value.fVencimiento,
      iva: this.entryForm.value.fIva,
      notas: this.entryForm.value.fNotas,
      importeIRPF: this.entryForm.value.fIva !== true ? (this.entryForm.value.fImporte * 15) / 100 : 0,
      importeIVA: this.entryForm.value.fIva > 0 ? (this.entryForm.value.fImporte * this.entryForm.value.fIva) / 100 : 0,
      importeFactura: 0,
      facturadoPor: this.workers[this.entryForm.value.fPor],
      facturadoPara: this.entryForm.value.fPara === "" ? this.workers[this.entryForm.value.fPor] : this.workers[this.entryForm.value.fPara],
      internacional: this.entryForm.value.fInternacional,
    }

    if (this.entryForm.value.fInternacional) {
      f.importeIRPF = 0;
      f.importeIVA = 0;
      f.iva = 0;  
    } else {
      f.importeIRPF = Math.round(f.importeIRPF * 100) / 100;
      f.importeIVA = Math.round(f.importeIVA * 100) / 100;
    }
    f.importeFactura = f.importe - f.importeIRPF + f.importeIVA;

    this.accountService.addFactura(f);
    this.entryForm.reset();
    this.router.navigate(['/']);
  }

  private validateClientes() {
    let cliente: Cliente;
    
    if (!this.isSelectVisible && this.entryForm.value.fCliente !== "") {
      cliente = this.accountService.addCliente({id: null, name: this.entryForm.value.fCliente});
    } else if(this.isSelectVisible && (this.entryForm.value.fClientes !== "none" && this.entryForm.value.fClientes !== "")) {
      cliente = this.clientes[this.entryForm.value.fClientes];
    } else if (!this.isSelectVisible){
      this.entryForm.get('fCliente').setErrors({Required: true});
    } else {
      this.entryForm.get('fClientes').setErrors({Required: true});
    }

    return cliente;
  }

  changeIntCheck() {
    this.intChecked = !this.intChecked;

    if (this.intChecked === true) {
      this.entryForm.controls['fIva'].disable();
      this.entryForm.controls['fIva'].setValue(0);
    } else {
      this.entryForm.controls['fIva'].enable();
    }
  }
}
