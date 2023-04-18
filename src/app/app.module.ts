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

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SoldiersComponent,
    DetailComponent,
    RoundDetailComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
