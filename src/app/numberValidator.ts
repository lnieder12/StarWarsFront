import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validNumber = control.value ? NbValidator(control.value) : true;
    return validNumber ? null : { invalidnumber: {value: control.value} };
  }
}

export function HealthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valideHp = control.value ? HpValidator(control.value): true;
    return valideHp ? null : { invalidHp: {value: control.value} };
  }
}

export function AttackValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valideAtt = control.value ? AttValidator(control.value): true;
    return valideAtt ? null : { invalidAtt: {value: control.value} };
  }
}

export function NbValidator(input: string): boolean {
  const numberRegExp = /^[0-9]+$/im;
  return input ? numberRegExp.test(input) : true;
}

export function HpValidator(input: string): boolean {
  return NbValidator(input) && 1000 <= Number(input) && Number(input) <= 2000;
}

export function AttValidator(input: string): boolean {
  return NbValidator(input) && 100 <= Number(input) && Number(input) <= 500;
}
