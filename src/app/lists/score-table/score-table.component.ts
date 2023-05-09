import { Component, Input } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Score } from '../../interfaces/scores';
import { ScoreFilter, SoldierNameComparator } from '../../scoreFilter';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-scores',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

  @Input() scores?: Score[];
  descSort = ClrDatagridSortOrder.DESC;

  scoreFilter = new ScoreFilter;

  nameComparator = new SoldierNameComparator();

  gameId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  getAll(): void {

    if (this.gameId) {
      this.gameService.getScores(this.gameId)
        .subscribe(score => {
          this.scores = score;
          console.log(score);
        });
    }
  }

  getPage(params: HttpParams): void {
    if (this.gameId) {
      this.gameService.getScoresPage(this.gameId, params)
        .subscribe(score => {
          this.scores = score;
          console.log(score);
        });

    }
  }

  refresh(state: ClrDatagridStateInterface) {

    var params = new HttpParams();

    // Filters
    if (state.filters) {
      for (let filter of state.filters) {
        if (filter.min || filter.max) {
          const gt = filter.min ? `gt:${filter.min}` : '';
          const lt = filter.max ? `lt:${filter.max}` : '';
          var between = gt;
          if (gt && lt) {
            between += ',';
          }
          between += lt;
          params = params.set('score', between);
          // filters['score'] = [{ min: filter.min, max: filter.max }];
        }
        else {
          let { property, value } = <{ property: string, value: string }>filter;
          if ([property] && [value]) {
            params = params.set(property, value);
          }
        }
      }
    }
    /*
    // Sort
    if (state.sort) {
      const field = Object(state.sort.by)['field'];
      var col;
      if (field) {
        col = field;
      }
      else {
        col = state.sort?.by;
      }
      var sort = state.sort.reverse ? ':asc' : ':desc';
      params = params.set('sort', col + sort);
    }*/

    // Page
    const limit = state.page?.size ?? 0;
    params = params.set('limit', limit);
    if (this.scores) {
      const lastId = this.scores[this.scores.length - 1].gsId;
      params = params.set('marker', lastId);
    }

    // console.log(Object(params)['updates']);
    this.getPage(params);
  }


  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    //this.getAll();
    this.getPage({} as HttpParams);
  }

  onFilterChange(evt: any) {
    this.scoreFilter.apply()
  }

}
