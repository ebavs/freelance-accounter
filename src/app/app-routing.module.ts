import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  { path: '', component: ShowComponent },
  { path: 'entry/new', component: EntryFormComponent },
  { path: 'entry/:id', component: EntryFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
