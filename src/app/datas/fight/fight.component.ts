import { Component, Input } from '@angular/core';

import { Game } from '../../interfaces/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { SoldiersService } from '../../services/soldiers.service';
import { Round } from 'src/app/interfaces/round';

@Component({
  selector: 'app-game',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css', '../../../styles.css']
})
export class FightComponent {

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
      this.gameService.doFight(this.id)
        .subscribe(rnd => {
          if (rnd == null) {
            this.show = false;
            this.moreFights = false;
            this.gameEnded();
          }
          else {
            this.round = rnd;
            if(rnd.isDead)
              this.getValidateSoldiers();
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
      this.gameEnded();
    }
  }

  skip(): void {
    if (!this.atMaxRound()) {
      this.show = false;
      var nbFights = this.nbFights;
      if (this.game?.maxRound) {
        if (this.nbFights < this.game.maxRound - this.nbRounds)
          nbFights = this.game.maxRound - this.nbRounds;
      }

      this.gameService.doMultipleFights(this.id, nbFights)
        .subscribe(() => {
          this.getNbRound();
          this.moreFights = false;
          this.getValidateSoldiers();
        });
    }
    else {
      this.moreFights = false;
      this.show = false;
      this.gameEnded();
    }
  }


  getGame(): void {
    if (this.id) {
      this.gameService.getGame(this.id)
        .subscribe(game => {
          this.game = game;
          this.getNbRound();
          this.getValidateSoldiers();
        });
    }
  }

  getValidateSoldiers(): void {
    this.soldierService.getNbValideEmpires(this.id)
      .subscribe(empires => this.nbEmpires = empires);
    this.soldierService.getNbValideRebels(this.id)
      .subscribe(rebels => this.nbRebels = rebels);
  }

  getId(): void {
    this.id = Number(this.route.parent?.snapshot.paramMap.get('id'));
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
          if (!bool)
            this.setWinner();
        });
    }
  }

  setWinner(): void {
    this.gameService.getWinningTeam(this.id)
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
