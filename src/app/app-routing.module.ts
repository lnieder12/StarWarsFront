import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './datas/detail/detail.component';
import { SoldiersComponent } from './lists/soldiers/soldiers.component';
import { FormComponent } from './form/form.component';
import { RoundDetailComponent } from './datas/round-detail/round-detail.component';
import { FightComponent } from './datas/fight/fight.component';
import { RoundsComponent } from './lists/rounds/rounds.component';
import { ScoreTableComponent } from './lists/score-table/score-table.component';
import { GameOutletComponent } from './game-outlet/game-outlet.component';

const routes: Routes = [
  { path: "game/:id", component: GameOutletComponent, children: [
    { path: "fight", component: FightComponent },
    { path: "rounds", component: RoundsComponent },
    { path: "soldiers", component: SoldiersComponent },
    { path: "scores", component: ScoreTableComponent },
  ] },
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
