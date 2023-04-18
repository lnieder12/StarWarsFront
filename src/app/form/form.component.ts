import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

import { Game } from '../game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public game?: Game;

  @Input() soldiers: number = 0;

  @Input() empires: number = 0;

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  createGame(): void {
    if (this.soldiers && this.empires) {
      this.gameService.createGame(this.soldiers, this.empires)
        .subscribe(game => {
          this.game = game;
          this.router.navigateByUrl(`/game/${game.id}/soldiers`);
        });
    }
  }

}
