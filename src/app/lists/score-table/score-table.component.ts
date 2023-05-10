import { Component, Input } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Score } from '../../interfaces/scores';
import { GameService } from '../../services/game.service';
import { getFilters, setSorting } from 'src/httpParamsFunctions';

@Component({
  selector: 'app-scores',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

  scores?: Score[];
  descSort = ClrDatagridSortOrder.DESC;

  gameId: number = 0;

  total: number = 0;

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  getAll(): void {

    if (this.gameId) {
      this.gameService.getScores(this.gameId)
        .subscribe(score => {
          this.scores = score;
        });
    }
  }

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

    var params = new HttpParams();

    // Filters
    params = getFilters(state, params);

    // Sort
    params = setSorting(state, params);

    // Page
    if (this.scores && this.scores.length > 0) {
      const skip = state.page?.from ?? 0;
      params = params.set('skip', skip);
    }
    const limit = state.page?.size ?? 0;
    params = params.set('limit', limit);

    // console.log(Object(params)['updates']);
    this.getPage(params);
  }


  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    //this.getAll();
    this.getPage({} as HttpParams);
  }

}
