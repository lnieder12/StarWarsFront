import { Component, Input } from '@angular/core';

import { Soldier } from '../soldier';
import { SoldiersService } from '../soldiers.service';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.css']
})
export class SoldiersComponent {

  @Input() soldiers: Soldier[] = [];

  constructor(
    private soldierService: SoldiersService
  ) {}

  getAll(): void {
    this.soldierService.getSoldiers()
      .subscribe(soldiers => this.soldiers = soldiers);
  }

  ngOnInit(): void {
    this.getAll();
  }

}
