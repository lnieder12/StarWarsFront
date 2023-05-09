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

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  getAll(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.gameService.getScores(id)
        .subscribe(score => this.scores = score);
    }
  }

  refresh(state: ClrDatagridStateInterface) {

    var params = new HttpParams();

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
          if([property] && [value]) {
            params = params.set(property, value);
          }
        }
      }
    }
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
    }


    var sorting = params ?
      { params : params } : {};

    console.log(Object(params)['updates']);
  }


  ngOnInit(): void {
    this.getAll();
  }

  onFilterChange(evt: any) {
    //console.log(evt);
    this.scoreFilter.apply()
  }

}
