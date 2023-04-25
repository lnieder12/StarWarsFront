import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../services/game.service';

import { Game } from '../interfaces/game';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators, NumberValueAccessor, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../../styles.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {

  form = new FormGroup({
    inputRebel: new FormControl("", [
      Validators.required,
      NumberValidator()
    ]),
    inputEmpire: new FormControl("", [
      Validators.required,
      NumberValidator()
    ]),
    inputNbRounds: new FormControl("", [
      NumberValidator()
    ])
  });

  public game?: Game;

  show: boolean = true;

  error: boolean = false;

  games?: Game[];

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  createGame(): void {
    this.show = false;
    // console.log("submit");
    // console.log(this.form.controls.inputNbRounds.value);
    this.gameService.createGame(Number(this.form.controls.inputRebel.value), Number(this.form.controls.inputEmpire.value), Number(this.form.controls.inputNbRounds.value))
      .subscribe(game => {
        this.game = game;
        this.router.navigateByUrl(`/game/${game.id}/fight`);
      },
      error => this.error = true);
  }

  getGames() {
    this.gameService.getAll()
      .subscribe(games => {
        this.games = games;
      },
      error => this.error = true);
  }

  ngOnInit(): void {
    this.getGames();
  }

}

export function NumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const numberRegExp = /^[0-9]+$/im;
    const validNumber = control.value ? numberRegExp.test(control.value) : true;
    return validNumber ? null : { invalidnumber: {value: control.value} };
  }
}
