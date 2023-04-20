import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';

import { Game } from '../interfaces/game';
import { Router } from '@angular/router';
import { NbRounds } from '../nbRounds';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public game?: Game;

  @Input() soldiers?: number;

  @Input() empires?: number;

  @Input() nbRound?: number;

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  createGame(): void {
    if (this.soldiers && this.empires) {
      this.gameService.createGame(this.soldiers, this.empires, this.nbRound ?? 0)
        .subscribe(game => {
          this.game = game;
          this.router.navigateByUrl(`/game/${game.id}`);
        });
    }
  }

  ngOnDestroy(): void {
    NbRounds.nb = this.nbRound;
  }

}
