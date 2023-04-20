import { Component, Input } from '@angular/core';

import { Soldier } from '../soldier';
import { SoldiersService } from '../soldiers.service';
import { Rebel_Empire } from '../rebel-empire';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { forkJoin, max, of } from 'rxjs';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.css']
})
export class SoldiersComponent {

  @Input() soldiers: Rebel_Empire[] = [];


  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldiersService
  ) { }

  getAll(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      rebels: this.soldierService.getRebels(id),
      empires: this.soldierService.getEmpires(id)
    }).subscribe(results => {

      of(results.rebels.length, results.empires.length)
        .pipe(max())
        .subscribe(x => {
          for(let i = 0; i < x; i++) {
            var reb_emp = {} as Rebel_Empire;
            if(i < results.rebels.length)
              reb_emp.rebel = results.rebels[i];
            if(i < results.empires.length)
              reb_emp.empire = results.empires[i];
            this.soldiers.push(reb_emp);
          }
        });
    });

  }

  ngOnInit(): void {
    this.getAll();
  }

}
