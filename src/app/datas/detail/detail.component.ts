import { Component, Input } from '@angular/core';

import { Soldier } from '../../interfaces/soldier';
import { SoldiersService } from '../../services/soldiers.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  @Input() soldier?: Soldier;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldiersService
  ) {}

  getSoldier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getSoldier(id)
      .subscribe(soldier => this.soldier = soldier);
  }

  ngOnInit(): void {
    this.getSoldier();
  }

}
