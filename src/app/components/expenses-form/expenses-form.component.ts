import { Component, OnInit } from '@angular/core';
import { AccountingService } from 'src/app/services/accounting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ivas } from 'src/app/mocks/ivas.mock';
import { Workers } from 'src/app/mocks/persons.mock';
import { Worker } from 'src/app/types/worker';
import { Cliente } from 'src/app/types/cliente';
import { Gasto } from 'src/app/types/gasto';

@Component({
  selector: 'expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {

  expensesForm: FormGroup;
  submitted: Boolean = false;
  clientes: Cliente[];
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
    this.expensesForm = this.formBuilder.group({
      gClientes: [''],
      gConcepto: ['', Validators.required],
      gNumero: ['', Validators.required],
      gFecha: ['', Validators.required],
      gImporte: ['', Validators.required],
      gIva: [this.ivas[0]],
      gNotas: [''],
      gRecurrente: [''],
      gRecurrenteHasta: [''],
      gPara: [0],
    });

    this.clientes = this.accountService.clientes;
  }

  onSubmit() {
    const cliente = this.validateClientes();
    
    this.submitted = true;
    if (this.expensesForm.invalid) {
        return;
    }
    
    const g: Gasto = {
      id: null,
      cliente: cliente,
      numero: this.expensesForm.value.gNumero,
      concepto: this.expensesForm.value.gConcepto,
      fecha: this.expensesForm.value.gFecha,
      importe: this.expensesForm.value.gImporte,
      iva: this.expensesForm.value.gIva,
      notas: this.expensesForm.value.gNotas,
      importeIVA: this.expensesForm.value.gIva > 0 ? (this.expensesForm.value.gImporte * this.expensesForm.value.gIva) / 100 : 0,
      importeFactura: 0,
      recurrente: this.expensesForm.value.gRecurrente,
      recurrenteHasta: this.expensesForm.value.gRecurrenteHasta,
      facturaPara: this.expensesForm.value.gPara === "" ? this.workers[this.expensesForm.value.gPara] : this.workers[0]
    }
    g.importeIVA = Math.round(g.importeIVA * 100) / 100;
    g.importeFactura = +g.importe + g.importeIVA;

    this.accountService.addGasto(g);
    this.expensesForm.reset();
    this.router.navigate(['/']);
  }

  private validateClientes() {
    let cliente: Cliente;
    
    if (this.expensesForm.value.gClientes !== "none" && this.expensesForm.value.gClientes !== "") {
      cliente = this.clientes[this.expensesForm.value.gClientes];
    } else {
      cliente = null;
    }

    return cliente;
  }
}
