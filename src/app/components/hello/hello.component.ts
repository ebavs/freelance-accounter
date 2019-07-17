import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import store from 'store';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  helloForm: FormGroup;
  submitted: Boolean = false;
  correctKey = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.helloForm = this.formBuilder.group({
      passKey: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9]+$/i)
        ]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.helloForm.invalid) {
      return;
    }

    try {
      const data = store.get('accountingData');
      const key = this.cryptoService.keyEncode(this.helloForm.value.passKey);
      const msg = this.cryptoService.tryToDecrypt(data, key);
    } catch (error) {
      this.correctKey = false;
      return;
    }

    this.authService.setKey(this.helloForm.value.passKey);

    this.router.navigate(['/']);
  }

  removeNotification() {
    this.correctKey = true;
  }
}
