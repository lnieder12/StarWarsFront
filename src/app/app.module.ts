import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { SoldiersComponent } from './soldiers/soldiers.component';
import { DetailComponent } from './detail/detail.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { GameComponent } from './game/game.component';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoundsComponent } from './rounds/rounds.component';
import { FightComponent } from './fight/fight.component';
import { ScoreTableComponent } from './score-table/score-table.component'

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SoldiersComponent,
    DetailComponent,
    RoundDetailComponent,
    GameComponent,
    RoundsComponent,
    FightComponent,
    ScoreTableComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
