import { Component, Input } from '@angular/core';

import { Soldier } from '../soldier';
import { SoldiersService } from '../soldiers.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.css']
})
export class SoldiersComponent {

  @Input() soldiers: Soldier[] = [];

  @Input() team: string = "soldier";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private soldierService: SoldiersService
  ) { }

  getAll(team: string): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (team == "rebel") {
      this.soldierService.getRebels(id)
        .subscribe(soldiers => this.soldiers = soldiers);
    }
    else if (team == "empire") {
      this.soldierService.getEmpires(id)
        .subscribe(soldiers => this.soldiers = soldiers);
    }
    else {
      this.soldierService.getSoldiers(id)
        .subscribe(soldiers => this.soldiers = soldiers);
    }

  }

  getRebels(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getRebels
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
        this.getAll(this.team);
      });
  }

  changeTeam(team: string): void {
    const options = team ?
      {params: new HttpParams().set('team', team) } : {};
    const url = this.urlWithoutOptions(this.router.url) + "?" + options.params;
    console.log(url);
    this.router.navigateByUrl(url);
  }

  backToAll(): void {
    this.router.navigateByUrl(this.urlWithoutOptions(this.router.url));
  }

  urlWithoutOptions(url: string): string {
    if(url.indexOf("?") >= 0)
      return url.substring(0, url.indexOf("?"));
    else
      return url;
  }

  ngOnInit(): void {
    this.searchTeam();
    console.log("init")
  }

}
