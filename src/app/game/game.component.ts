import { Component, Input } from '@angular/core';

import { Game } from '../game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { SoldiersService } from '../soldiers.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  @Input() game?: Game;

  @Input() nbRounds?: number = 0;

  @Input() nbRebels?: number = 0;

  @Input() nbEmpires?: number;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) {}

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => {
        this.game = game;
        this.gameService.getRounds(id)
          .subscribe(rds => this.nbRounds = rds.length);
        this.soldierService.getEmpires(id)
          .subscribe(empires => this.nbEmpires = empires.length);
        this.soldierService.getRebels(id)
          .subscribe(rebels => this.nbRebels = rebels.length);
      });
  }

  ngOnInit(): void {
    this.getGame();
  }

}
