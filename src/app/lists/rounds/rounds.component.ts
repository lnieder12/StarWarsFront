import { Component, Input, QueryList, ViewChildren } from '@angular/core';

import { Round } from '../../interfaces/round';
import { ActivatedRoute } from '@angular/router';
import { RoundService } from 'src/app/services/round.service';
import { ClrDatagridColumn, ClrDatagridSortOrder } from '@clr/angular';
import { AttackerComparator, DamageFilter, DefenderComparator } from 'src/app/roundFilter';


@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {

  @Input() rounds?: Round[];

  defenderComparator = new DefenderComparator();

  attackerComparator = new AttackerComparator();

  damageFilter = new DamageFilter();

  @ViewChildren(ClrDatagridColumn) columns?: QueryList<ClrDatagridColumn>;

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService,
  ) {}

  getRounds(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
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

  clearFilter(): void {
    this.columns?.forEach(col => {
      col.filterValue = "";
    })
  }

  ngOnInit():void {
    this.getRounds();
  }

}
