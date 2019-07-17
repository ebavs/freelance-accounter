import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'freelance-accounter';
  validated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.validated.subscribe(x => this.validated = x);

  }
}
