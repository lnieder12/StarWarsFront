import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const numberRegExp = /^[0-9]+$/im;
    const validNumber = control.value ? numberRegExp.test(control.value) : true;
    return validNumber ? null : { invalidnumber: {value: control.value} };
  }
}

export function NbValidator(input: string): boolean {
  const numberRegExp = /^[0-9]+$/im;
  return input ? numberRegExp.test(input) : true;
}
