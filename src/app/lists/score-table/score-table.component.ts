import { Component, Input } from '@angular/core';

import { Score } from '../../interfaces/scores';
import { SoldiersService } from '../../services/soldiers.service';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridSortOrder } from '@clr/angular';
import { ScoreFilter, SoldierNameComparator } from '../../scoreFilter';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

  @Input() scores?: Score[];
  descSort = ClrDatagridSortOrder.DESC;

  scoreFilter = new ScoreFilter;

  nameComparator = new SoldierNameComparator();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  getAll(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    if (id) {
      this.gameService.getScores(id)
        .subscribe(score => this.scores = score);
    }
  }


  ngOnInit(): void {
    this.getAll();
  }

}
