import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { Round } from '../../interfaces/round';
import { ActivatedRoute } from '@angular/router';
import { RoundService } from 'src/app/services/round.service';
import { ClrDatagridColumn, ClrDatagridSortOrder } from '@clr/angular';
import { AttackerComparator, DamageFilter, DefenderComparator, HpLeftFilter } from 'src/app/roundFilter';
import { NumberFilterComponent } from 'src/app/number-filter.component';
import { GameService } from 'src/app/services/game.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {

  rounds?: Round[];

  gameId: number = 0;

  loading: boolean = false;

  total: number = 0;

  defenderComparator = new DefenderComparator();

  attackerComparator = new AttackerComparator();

  @ViewChildren(ClrDatagridColumn) columns?: QueryList<ClrDatagridColumn>;

  @ViewChild('damageFilter') damageFilter!: NumberFilterComponent<Round>;

  @ViewChild('hpFilter') hpFilter!: NumberFilterComponent<Round>;

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService,
    private gameService: GameService
  ) {}

  getRounds(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.roundService.getRounds(id)
        .subscribe(rounds => this.rounds = rounds);

    }
  }

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

  clearFilter(): void {
    this.damageFilter.clear();
    this.hpFilter.clear();
    this.columns?.forEach(col => {
      console.log(col.filterValue);
      col.filterValue = null;
      if(col.field == "damage") {}
        // col.setFilter(this.damageFilter);
    })
  }

  ngOnInit():void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.getRounds();
  }

}
