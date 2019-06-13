import { Component, Input } from '@angular/core';
import { Modal } from './modal';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends Modal {
  constructor() {
    super();
  }
}
