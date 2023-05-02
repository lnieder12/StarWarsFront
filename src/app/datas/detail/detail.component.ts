import { Component, Input } from '@angular/core';

import { Soldier } from '../../interfaces/soldier';
import { SoldiersService } from '../../services/soldiers.service';

import { ActivatedRoute } from '@angular/router';
import { NbValidator } from 'src/app/numberValidator';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css', "../../../styles.css"]
})
export class DetailComponent {

  editName: boolean = false;

  editHp: boolean = false;

  editAtt: boolean = false;

  @Input() newName: string = "";

  @Input() newAtt: number = 0;

  @Input() newHp: number = 0;

  errorHp: boolean = false;

  errorAtt: boolean = false;

  soldier?: Soldier;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldiersService
  ) {}

  getSoldier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getSoldier(id)
      .subscribe(soldier => {
        this.soldier = soldier
      });
  }

  patchName(): void {
    if(this.soldier)
      this.soldierService.patchSoldierName(this.soldier.id, this.newName)
        .subscribe(sld => {
          this.soldier = sld;
          this.newName = "";
          this.editName = false;
        });
  }

  patchAttack(): void {
    if(this.soldier)
      this.soldierService.patchSoldierAtt(this.soldier.id, this.newAtt)
        .subscribe(sld => {
          this.soldier = sld;
          this.newAtt = 0;
          this.editAtt = false;
        });
  }

  patchHp(): void {
    if(this.soldier)
      this.soldierService.patchSoldierHp(this.soldier.id, this.newHp)
        .subscribe(sld => {
          this.soldier = sld;
          this.newHp = 0;
          this.editHp = false;
        });
  }

  validateHp(x: any): void {
    const hp = x.target.value;
    console.log(Number(hp));
    this.errorHp = !NbValidator(hp) || 1000 > Number(hp) || Number(hp) > 2000;
  }

  validateAtt(x: any): void {
    const att = x.target.value;
    this.errorAtt = !NbValidator(att) || 100 > Number(att) || Number(att) > 500;
  }

  ngOnInit(): void {
    this.getSoldier();
  }

}
