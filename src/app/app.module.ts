import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './datas/detail/detail.component';
import { FightComponent } from './datas/fight/fight.component';
import { FormComponent } from './form/form.component';
import { SoldiersComponent } from './lists/soldiers/soldiers.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from '@clr/angular';
import { RoundsComponent } from './lists/rounds/rounds.component';
import { ScoreTableComponent } from './lists/score-table/score-table.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { BattlefieldComponent } from './datas/fight/battlefield/battlefield.component';
import { CreateSelectedSoldiersComponent } from './form/create-selected-soldiers/create-selected-soldiers.component';
import { CreateSoldierComponent } from './form/create-soldier/create-soldier.component';
import { GameOutletComponent } from './game-outlet/game-outlet.component';
import { NumberFilterComponent } from './number-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SoldiersComponent,
    DetailComponent,
    FightComponent,
    RoundsComponent,
    ScoreTableComponent,
    GameOutletComponent,
    BattlefieldComponent,
    CreateSelectedSoldiersComponent,
    CreateSoldierComponent,
    NumberFilterComponent,
    NumberFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
