import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/types/worker';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { BancoMonto } from 'src/app/types/banco-monto';

@Component({
  selector: 'config-form',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  submitted: boolean = false;

  participant: string;
  participants: Worker[] = [];

  iva: number;
  ivaError = {
    numero: false,
    repetido: false
  };
  ivas: number[] = [];

  banco: BancoMonto = new BancoMonto();
  bancoError = {
    numero: false,
    fecha: false
  };
  bancos: BancoMonto[] = [];

  constructor(
    private configService: ConfigService,
    private router: Router) {}

  ngOnInit() {
    if (this.configService.config) {
      if (this.configService.config.persons && this.configService.config.persons.length > 0) {
        this.participants = this.configService.config.persons;
      }

      if (this.configService.config.ivas && this.configService.config.ivas.length > 0) {
        this.ivas = this.configService.config.ivas;
      }

      if (this.configService.config.bancoMonto && this.configService.config.bancoMonto.length > 0) {
        this.bancos = this.configService.config.bancoMonto;
      }
    }
  }

  addParticipant() {
    const person: Worker = {
      name: this.participant,
      id: this.participant.toLowerCase().replace(' ', '')
    };

    this.participants.push(person);
    this.participant = '';
  }

  removeParticipant(index) {
    this.participants.splice(index, 1);
  }

  addIva() {
    this.ivaError = {
      numero: false,
      repetido: false
    };

    const i = Number(this.iva);

    if (isNaN(i)) {
      this.ivaError.numero = true;
      return;
    }

    if (this.ivas.includes(i)) {
      this.ivaError.repetido = true;
      return;
    }

    this.ivas.push(i);
    this.ivas = this.ivas.sort((a, b) => a - b);
    this.iva = null;
  }

  removeIva(index) {
    this.ivas.splice(index, 1);
  }

  addMonto() {
    const m = Number(this.banco.monto);
    const d = new Date(this.banco.fecha);

    console.log(m, d, typeof this.banco.fecha);

    this.bancoError = {
      numero: false,
      fecha: false
    };

    if (isNaN(m)) {
      this.bancoError.numero = true;
    }

    if (this.banco.fecha === undefined || this.banco.fecha === '' || !(d instanceof Date)) {
      this.bancoError.fecha = true;
    }

    if (this.bancoError.numero || this.bancoError.fecha) {
      return;
    }

    this.bancos.push(this.banco);
    this.banco = new BancoMonto();
  }

  removeMonto(index) {
    this.bancos.splice(index, 1);
  }

  onSubmit() {
    const persons = this.participants;
    const ivas = this.ivas;
    const bancoMonto = this.bancos;

    this.configService.set({
      persons,
      ivas,
      bancoMonto
    });

    this.router.navigate(['/']);
  }

}
