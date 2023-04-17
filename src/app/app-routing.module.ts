import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { SoldiersComponent } from './soldiers/soldiers.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: "soldiers", component: SoldiersComponent },
  { path: "soldier/:id", component: DetailComponent },
  { path: '', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
