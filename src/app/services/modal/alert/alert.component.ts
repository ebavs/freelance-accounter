import { Component } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends Modal {

  constructor() {
    super();
  }
}
