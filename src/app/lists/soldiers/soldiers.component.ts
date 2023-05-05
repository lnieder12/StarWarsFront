import { Component, Input } from '@angular/core';

import { Rebel_Empire } from '../../interfaces/rebel-empire';
import { SoldierService } from '../../services/soldiers.service';

import { ActivatedRoute } from '@angular/router';
import { forkJoin, max, of } from 'rxjs';
import { SoldierNameComparator } from 'src/app/soldierFilter';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.css']
})
export class SoldiersComponent {

  @Input() soldiers: Rebel_Empire[] = [];

  soldierComparator = new SoldierNameComparator();

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldierService
  ) { }

  getAll(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      forkJoin({
        rebels: this.soldierService.getRebels(id),
        empires: this.soldierService.getEmpires(id)
      }).subscribe(results => {

        of(results.rebels.length, results.empires.length)
          .pipe(max())
          .subscribe(x => {
            for (let i = 0; i < x; i++) {
              var reb_emp = {} as Rebel_Empire;
              if (i < results.rebels.length)
                reb_emp.rebel = results.rebels[i];
              if (i < results.empires.length)
                reb_emp.empire = results.empires[i];
              this.soldiers.push(reb_emp);
            }
          });
      });
    }

  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;

    var filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let {property, value} = <{property: string, value: string}>filter;
        filters[property] = [value];
      }
    }

    this.loading = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
