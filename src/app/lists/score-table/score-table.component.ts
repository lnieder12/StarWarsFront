import { Component } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { setAllHttpParams } from 'src/httpParamsFunctions';
import { Score } from '../../interfaces/scores';
import { GameService } from '../../services/game.service';
import { delay } from 'src/app/delay';

@Component({
  selector: 'app-scores',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

  scores: Score[] = [];
  descSort = ClrDatagridSortOrder.DESC;

  gameId: number = 0;

  total: number = 0;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  getPage(params: HttpParams): void {
    if (this.gameId) {
      this.gameService.getScoresPage(this.gameId, params)
        .subscribe(score => {
          this.scores = score;
          this.loading = false;
        });
      this.gameService.getScoreCount(this.gameId, params)
        .subscribe(count => {
          this.total = count;
        });

    }
  }

  refresh(state: ClrDatagridStateInterface) {

    this.loading = true;

    var params = setAllHttpParams(state, this.scores?.length ?? 0);

    this.getPage(params);
  }


  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

}
