import { Component, Input } from '@angular/core';

import { Modal } from '../modal';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends Modal {

  @Input('data') data: any;
  
  constructor() {
    super();
  }
}
