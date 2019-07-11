import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ListComponent } from './components/list/list.component';
import { UploadComponent } from './components/upload/upload.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';
import { HelloComponent } from './components/hello/hello.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'hello', component: HelloComponent },
  { path: 'entry/new', component: EntryFormComponent, canActivate: [AuthGuard] },
  { path: 'entry/:id', component: EntryFormComponent, canActivate: [AuthGuard] },
  { path: 'expense/new', component: ExpensesFormComponent, canActivate: [AuthGuard] },
  { path: 'expense/:id', component: ExpensesFormComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
