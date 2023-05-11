import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridColumn, ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { NumberFilterComponent } from 'src/app/number-filter.component';
import { AttackerComparator, DefenderComparator } from 'src/app/roundFilter';
import { GameService } from 'src/app/services/game.service';
import { setAllHttpParams } from 'src/httpParamsFunctions';
import { Round } from '../../interfaces/round';
import { delay } from 'src/app/delay';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {

  rounds: Round[] = [];

  gameId: number = 0;

  loading: boolean = true;

  total: number = 0;

  defenderComparator = new DefenderComparator();

  attackerComparator = new AttackerComparator();

  @ViewChildren(ClrDatagridColumn) columns?: QueryList<ClrDatagridColumn>;

  @ViewChild('damageFilter') damageFilter!: NumberFilterComponent<Round>;

  @ViewChild('hpFilter') hpFilter!: NumberFilterComponent<Round>;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  clearSort(): void {
    this.columns?.forEach(col => {
      col.sortOrder = ClrDatagridSortOrder.UNSORTED;
    });
  }

  getPage(params: HttpParams): void {
    if (this.gameId) {
      this.gameService.getRoundsPage(this.gameId, params)
        .subscribe(rnd => {
          this.rounds = rnd;
          this.loading = false;
        });
      this.gameService.getRoundsCount(this.gameId, params)
        .subscribe(count => {
          this.total = count;
        });

    }
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;

    var params = setAllHttpParams(state, this.rounds?.length ?? 0);

    this.getPage(params);
  }

  clearFilter(): void {
    this.damageFilter.clear();
    this.hpFilter.clear();
    this.columns?.forEach(col => {
      console.log(col.filterValue);
      col.filterValue = null;
    });
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.refresh({page: {size: 10}});
  }
}
