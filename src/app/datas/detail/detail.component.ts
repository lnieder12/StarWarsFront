import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

import { Soldier } from '../../interfaces/soldier';
import { SoldierService } from '../../services/soldiers.service';

import { ActivatedRoute } from '@angular/router';
import { AttValidator, HpValidator, NbValidator } from 'src/app/numberValidator';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css', "../../../styles.css"]
})
export class DetailComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === "Escape")
      this.closeForms();
  }

  editName: boolean = false;

  editHp: boolean = false;

  editAtt: boolean = false;

  @Input() newName: string = "";

  @Input() newAtt: number = 0;

  @Input() newHp: number = 0;

  errorHp: boolean = false;

  errorAtt: boolean = false;

  soldier?: Soldier;

  @ViewChild('inputAtt') inputAtt!: ElementRef;

  @ViewChild('inputHp') inputHp!: ElementRef;

  @ViewChild('inputName') inputName!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldierService,
  ) { }

  openForm(stat: string): void {
    if (stat === "name") {
      this.editName = true;
      setTimeout(() => {
        this.inputName.nativeElement.focus();
        this.inputName.nativeElement.select();
      }, 0);
    }
    if (stat === "hp") {
      this.editHp = true;
      setTimeout(() => {
        this.inputHp.nativeElement.focus();
        this.inputHp.nativeElement.select();
      }, 0);
    }
    if (stat === "att") {
      this.editAtt = true;
      setTimeout(() => {
        this.inputAtt.nativeElement.focus();
        this.inputAtt.nativeElement.select();
      }, 0);
    }
  }

  closeForms(): void {
    this.editAtt = false;
    this.editHp = false;
    this.editName = false;
  }

  getSoldier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getSoldier(id)
      .subscribe(sld => {
        this.soldier = sld;
        this.newName = sld.name;
        this.newAtt = sld.attack;
        this.newHp = sld.maxHealth;
      });
  }

  patchName(): void {
    if (this.soldier)
      this.soldierService.patchSoldierName(this.soldier.id, this.newName ?? "")
        .subscribe(sld => {
          this.soldier = sld;
          this.newName = sld.name;
          this.editName = false;

        });
  }

  patchAttack(): void {
    if (this.soldier)
      this.soldierService.patchSoldierAtt(this.soldier.id, this.newAtt ?? 0)
        .subscribe(sld => {
          this.soldier = sld;
          this.newAtt = sld.attack;
          this.editAtt = false;

        });
  }

  patchHp(): void {
    if (this.soldier)
      this.soldierService.patchSoldierHp(this.soldier.id, this.newHp ?? 0)
        .subscribe(sld => {
          this.soldier = sld;
          this.newHp = sld.maxHealth;
          this.editHp = false;

        });
  }

  validateHp(x: any): void {
    const hp = x.target.value;
    console.log(Number(hp));
    this.errorHp = !HpValidator(hp);
  }

  validateAtt(x: any): void {
    const att = x.target.value;
    this.errorAtt = !AttValidator(att);
  }

  ngOnInit(): void {
    this.getSoldier();
  }

}
