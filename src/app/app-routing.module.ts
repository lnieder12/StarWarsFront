import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { SoldiersComponent } from './soldiers/soldiers.component';
import { FormComponent } from './form/form.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: "game/:id", component: GameComponent },
  { path: "game/:id/soldiers", component: SoldiersComponent },
  { path: "soldier/:id", component: DetailComponent },
  { path: "round/:id", component: RoundDetailComponent },
  { path: '', component: FormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
