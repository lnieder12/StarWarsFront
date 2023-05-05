import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Soldier } from 'src/app/interfaces/soldier';
import { AttValidator, AttackValidator, HealthValidator, NumberValidator } from 'src/app/numberValidator';
import { SoldierService } from 'src/app/services/soldiers.service';

@Component({
  selector: 'app-create-soldier',
  templateUrl: './create-soldier.component.html',
  styleUrls: ['./create-soldier.component.css']
})
export class CreateSoldierComponent {

  form = new FormGroup({
    inputName: new FormControl("", [
      Validators.required,
    ]),
    inputAtt: new FormControl("", [
      Validators.required,
      AttackValidator()
    ]),
    inputHp: new FormControl("", [
      Validators.required,
      HealthValidator()
    ]),
    inputType: new FormControl("", [
      Validators.required,
    ]),
  });

  constructor (
    private soldierService: SoldierService
  ) {}

  createSoldier(): void {
    var sld = {} as Soldier;
    sld.attack = Number(this.form.controls.inputAtt.value);
    sld.maxHealth = Number(this.form.controls.inputHp.value);
    sld.name = this.form.controls.inputName.value ?? "Soldier";
    const type =  this.form.controls.inputType.value ?? "";
    this.soldierService.add(sld, type)
      .subscribe(soldier => {
        this.form.reset();
        console.log(soldier);
      });
  }



}
