import { Component, Input } from '@angular/core';

import { Round } from '../round';
import { Soldier } from '../soldier';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { HttpParams } from '@angular/common/http';
import { SoldiersService } from '../soldiers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  @Input() round?: Round;

  @Input() nbRound: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) {}
  
  getNbRound(): void {
    
    this.route.queryParamMap
      .subscribe(params => {
        if (params.has("nb")) {
          this.nbRound = Number(params.get("nb"));
          this.getFight();
        }
        else {
          this.nextFight();
        }});
  }

  getFight(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getSoldiers(id)
      .subscribe(soldiers => { 
        const valide = soldiers.filter(s => s.health > 0);
        const rd = Math.floor(Math.random() * valide.length);
        const rdSoldier = valide[rd];
        this.gameService.getFight(id, rdSoldier.id)
          .subscribe(rnd => {
              this.round = rnd
          },
          () => this.router.navigateByUrl(`game/${id}`));
      });
  }

  getSoldiers(id: number): Observable<Soldier[]>{
    return this.soldierService.getSoldiers(id);
  }

  nextFight(): void {
    const options = { params: new HttpParams().set('nb', Number(this.nbRound) + 1) };
    const url = this.cleanUrl(this.router.url) + "?" + options.params;
    this.router.navigateByUrl(url);
  }

  cleanUrl(url: string): string {
    const index = url.indexOf("?");
    if(index >= 0)
    {
      return url.substring(0, index);
    }
    return url;
  }

  ngOnInit(): void {
    this.getNbRound();
  }

}
