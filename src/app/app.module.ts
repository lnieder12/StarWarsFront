import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { SoldiersComponent } from './lists/soldiers/soldiers.component';
import { DetailComponent } from './datas/detail/detail.component';
import { RoundDetailComponent } from './datas/round-detail/round-detail.component';
import { GameComponent } from './datas/game/game.component';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoundsComponent } from './lists/rounds/rounds.component';
import { ScoreTableComponent } from './lists/score-table/score-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SoldiersComponent,
    DetailComponent,
    RoundDetailComponent,
    GameComponent,
    RoundsComponent,
    ScoreTableComponent,
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
