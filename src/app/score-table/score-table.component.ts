import { Component, Input } from '@angular/core';

import { Score } from '../scores';
import { Soldier } from '../soldier';
import { SoldiersService } from '../soldiers.service';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridComparatorInterface, ClrDatagridSortOrder } from '@clr/angular';

  
@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {  

  @Input() scores: Score[] = [];
  descSort = ClrDatagridSortOrder.DESC;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private soldierService: SoldiersService
  ) { }

  getAll(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getSoldiers(id)
      .subscribe(soldiers => {
        soldiers.map(sld => {
          this.gameService.getSoldierDamage(id, sld.id)
            .subscribe(nb => {
              var score = {} as Score;
              score.soldier = sld;
              score.score = (Number(nb) + sld.health) * 10;
              // this.soldiers.set(sld, (Number(nb) + sld.health) * 10);
              this.scores.push(score);
            });

        });
      });

  }

  ngOnInit(): void {
    this.getAll();
  }

}
