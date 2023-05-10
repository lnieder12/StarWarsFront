import { Component, Input } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';


@Component({
  selector: 'number-filter',
  template: `
    <clr-input-container>
          <label>Min</label>
          <input (change)="apply()" type="number" clrInput [(ngModel)]="min" />
        </clr-input-container>
        <clr-input-container>
          <label>Max</label>
          <input (change)="apply()" type="number" clrInput [(ngModel)]="max" />
        </clr-input-container>
  `,
  styles: [
  ]
})
export class NumberFilterComponent<T> implements ClrDatagridFilterInterface<T> {

  @Input() field!: string;

  min?: number;
  max?: number;
  changes = new Subject<any>();


  constructor () {}

  accepts(item: any): boolean {
    var overMin = this.min ? this.min <= item[this.field] : true;
    var underMax = this.max ? item[this.field] <= this.max : true;
    return overMin && underMax;
  }

  isActive(): boolean {
    if (this.min || this.max) {
      return true;
    }
    return false;
  }

  apply(): void {
    this.changes.next({ min: this.min, max: this.max });
  }

  clear(): void {
    this.min = undefined;
    this.max = undefined;
  }

}
