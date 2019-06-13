import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ShowComponent } from './components/show/show.component';
import { ModalComponent } from './services/modal/modal.component';
import { ConfirmComponent } from './services/modal/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    ShowComponent,
    ModalComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [ ConfirmComponent, ModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
