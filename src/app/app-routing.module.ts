import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroTableComponent } from './components/superhero-table/superhero-table.component';
import { SuperheroFormComponent } from './components/superhero-form/superhero-form.component';

const routes: Routes = [
  {
    path: '', component: SuperheroTableComponent
  },
  {
    path: 'form', component: SuperheroFormComponent
  },
  {
    path: 'form/:id', component: SuperheroFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
