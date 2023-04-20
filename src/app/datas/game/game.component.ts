import { Component, Input } from '@angular/core';

import { Game } from '../../interfaces/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { SoldiersService } from '../../services/soldiers.service';
import { Round } from 'src/app/interfaces/round';
import { NbRounds } from 'src/app/nbRounds';

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


  @Input() round?: Round;

  @Input() show: boolean = false;

  id: number = 0;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) { }

  getNbRound(): void {
    this.gameService.getNbRounds(this.id)
      .subscribe(nb => this.nbRounds = nb);
  }

  showFight(): void {
    var bool = false;
    if (this.game?.maxRound && this.nbRounds)
      bool = this.game.maxRound <= this.nbRounds;
    if (!bool) {
      this.show = false;
      this.gameService.getFight(this.id)
        .subscribe(rnd => {
          if (rnd == null)
            this.show = false;
          else {
            this.round = rnd;
            if(this.nbRounds)
              this.nbRounds++;
            else
              this.getNbRound();
            this.show = true;
          }
        });
    }
    else {
      this.round = undefined;
      this.show = false;
    }
  }

  skip(): void {
    this.show = false;
    var bool = false;
    if (this.game?.maxRound && this.nbRounds)
      bool = this.game.maxRound <= this.nbRounds;
    if (!bool) {
      this.gameService.doAllFight(this.id)
        .subscribe(() => {
          this.getNbRound();
          this.round = undefined;
        });
    }
    else {
      this.round = undefined;
      this.show = false;
    }
  }


  getGame(): void {
    this.gameService.getGame(this.id)
      .subscribe(game => {
        this.game = game;
        this.getNbRound();
        this.soldierService.getEmpires(this.id)
          .subscribe(empires => this.nbEmpires = empires.length);
        this.soldierService.getRebels(this.id)
          .subscribe(rebels => this.nbRebels = rebels.length);
      });
  }

  getId(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  goToScore(): void {
    this.router.navigateByUrl(`game/${this.game?.id}/scores`);
  }

  ngOnInit(): void {
    this.getId();
    this.getGame();
    this.show = true;
  }

}
