import { Component, Input } from '@angular/core';

import { Round } from '../round';
import { Soldier } from '../soldier';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { SoldiersService } from '../soldiers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  @Input() round?: Round;

  @Input() show: boolean = false;

  @Input() nbRound: number = 0;

  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) { }

  getNbRound(): void {
    this.gameService.getRounds(this.id)
      .subscribe(rounds => this.nbRound = rounds.length);
  }

  showFight(): void {
    this.show = false;
    this.getRandomSoldier(this.id)
      .subscribe(soldier => {
        this.getFight(this.id, soldier.id)
          .subscribe(rnd => {
            if(rnd == null)
              this.router.navigateByUrl(`/game/${this.id}`);
            else {
              this.round = rnd;
              this.getNbRound();
              this.show = true;
            }
          });
      });
  }

  getFight(id: number, soldierId: number): Observable<Round> {
    return this.gameService.getFight(id, soldierId);

}

  getId(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  getRandomSoldier(id: number): Observable<Soldier> {
    return this.soldierService.getRandomValidate(id);
  }

  nextFight(): void {
    this.showFight();
  }

  skip(): void {
    this.show = false;
    this.getRandomSoldier(this.id)
      .subscribe(soldier =>  {
        this.getFight(this.id, soldier.id)
          .subscribe(rnd => {
            if(rnd == null)
              this.router.navigateByUrl(`/game/${this.id}`);
            else
              this.skip();
          });
      });
  }

  ngOnInit(): void {
    this.getId();
    this.showFight();
  }

}
