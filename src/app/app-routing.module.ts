import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './datas/detail/detail.component';
import { SoldiersComponent } from './lists/soldiers/soldiers.component';
import { FormComponent } from './form/form.component';
import { RoundDetailComponent } from './datas/round-detail/round-detail.component';
import { GameComponent } from './datas/game/game.component';
import { RoundsComponent } from './lists/rounds/rounds.component';
import { ScoreTableComponent } from './lists/score-table/score-table.component';

const routes: Routes = [
  { path: "game/:id", component: GameComponent },
  { path: "game/:id/soldiers", component: SoldiersComponent },
  { path: "soldier/:id", component: DetailComponent },
  { path: "round/:id", component: RoundDetailComponent },
  { path: "game/:id/rounds", component: RoundsComponent },
  { path: "game/:id/scores", component: ScoreTableComponent },
  { path: '', component: FormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
