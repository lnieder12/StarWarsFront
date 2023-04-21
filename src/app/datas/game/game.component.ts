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

  @Input() nbRounds: number = 0;

  @Input() nbRebels?: number = 0;

  @Input() nbEmpires?: number;

  @Input() winner?: string;

  @Input() round?: Round;

  @Input() show: boolean = false;

  @Input() moreFights: boolean = true;

  id: number = 0;

  @Input() nbFights = 0;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) { }

  getNbRound(): void {
    this.gameService.getNbRounds(this.id)
      .subscribe(nb => {
        this.nbRounds = nb;
        this.gameEnded();
      });
  }

  nextFight(): void {
    if (!this.atMaxRound()) {
      this.show = false;
      this.gameService.getFight(this.id)
        .subscribe(rnd => {
          if (rnd == null) {
            this.show = false;
            this.moreFights = false;
          }
          else {
            this.round = rnd;
            if (this.nbRounds)
              this.nbRounds++;
            else
              this.getNbRound();
            this.show = true;
          }
        });
    }
    else {
      this.moreFights = false;
      this.show = false;
    }
  }

  skip(): void {
    if (!this.atMaxRound()) {
      this.show = false;
      var nbFights;
      if (this.game?.maxRound) {
        if (this.nbFights < this.game.maxRound - this.nbRounds)
          nbFights = this.game.maxRound - this.nbRounds;
        else
          nbFights = this.nbFights;
      }
      else
        nbFights = this.nbFights;
      this.gameService.doMultipleFights(this.id, nbFights)
        .subscribe(() => {
          this.getNbRound();
          this.moreFights = false;
        });
    }
    else {
      this.moreFights = false;
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

  atMaxRound(): boolean {
    var bool = false;
    if (this.game?.maxRound) {
      if (this.nbRounds >= this.game.maxRound)
        bool = true;
    }
    return bool;
  }

  gameEnded(): void {
    if (this.atMaxRound()) {
      this.show = false;
      this.moreFights = false;
      this.setWinner();
    }
    else {
      this.gameService.enoughSoldiers(this.id)
        .subscribe(bool => {
          this.show = bool;
          this.moreFights = bool;
          if(!bool)
            this.setWinner();
        });
    }
  }

  setWinner(): void {
    this.gameService.getWinnerTeam(this.id)
      .subscribe(team => {
        if (team !== "")
          this.winner = team;
      });
  }

  ngOnInit(): void {
    this.getId();
    this.getGame();
  }

}
