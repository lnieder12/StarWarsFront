import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoldiersComponent } from './lists/soldiers/soldiers.component';
import { DetailComponent } from './datas/detail/detail.component';
import { FightComponent } from './datas/fight/fight.component';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoundsComponent } from './lists/rounds/rounds.component';
import { ScoreTableComponent } from './lists/score-table/score-table.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { GameOutletComponent } from './game-outlet/game-outlet.component';
import { BattlefieldComponent } from './datas/battlefield/battlefield.component';
import { CreateSelectedSoldiersComponent } from './create-selected-soldiers/create-selected-soldiers.component';



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
