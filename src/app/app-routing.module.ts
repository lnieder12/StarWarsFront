import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './datas/detail/detail.component';
import { FormComponent } from './form/form.component';
import { GameOutletComponent } from './game-outlet/game-outlet.component';

const routes: Routes = [
  { path: "game/:id", component: GameOutletComponent},
  { path: "soldier/:id", component: DetailComponent },
  { path: '', component: FormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
