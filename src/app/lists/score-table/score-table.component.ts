import { Component, Input } from '@angular/core';

import { Score } from '../../interfaces/scores';
import { SoldiersService } from '../../services/soldiers.service';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridSortOrder } from '@clr/angular';
import { ScoreFilter } from '../../scoreFilter';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {  

  @Input() scores: Score[] = [];
  descSort = ClrDatagridSortOrder.DESC;

  scoreFilter =  new ScoreFilter;

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
          this.gameService.getSoldierScore(id, sld.id)
            .subscribe(nb => {
              var score = {} as Score;
              score.soldier = sld;
              score.score = (Number(nb));
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
