import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ListComponent } from './components/list/list.component';
import { UploadComponent } from './components/upload/upload.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'entry/new', component: EntryFormComponent },
  { path: 'entry/:id', component: EntryFormComponent },
  { path: 'expense/new', component: ExpensesFormComponent },
  { path: 'expense/:id', component: ExpensesFormComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
