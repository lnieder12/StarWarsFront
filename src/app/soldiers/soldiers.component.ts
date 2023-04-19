import { Component, Input } from '@angular/core';

import { Soldier } from '../soldier';
import { SoldiersService } from '../soldiers.service';

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

  @Input() rebels: Soldier[] = [];
  @Input() empires: Soldier[] = [];

  @Input() list: number[] = [];

  @Input() team: string = "soldier";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private soldierService: SoldiersService
  ) { }

  getAll(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      rebels: this.soldierService.getRebels(id),
      empires: this.soldierService.getEmpires(id)
    }).subscribe(results => {
      this.rebels = results.rebels;
      this.empires = results.empires
      of(this.rebels.length, this.empires.length)
        .pipe(max())
        .subscribe(x => {
          // this.list = [...new Array(x).map((v:number, i:number) => i)];

          this.list.length = x;
          this.list.fill(1, 0)
          this.list = this.list.map((v, i) => v = i);
          // this.list.forEach((v:number) => console.log(v));
        });
    });




  }

  searchTeam(): void {
    this.route.queryParamMap
      .subscribe(params => {
        if (params.has("team")) {
          const tm = params.get("team");
          if (tm == "rebel" || tm == "empire") {
            this.team = tm?.toString();

          }

        }
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

}
