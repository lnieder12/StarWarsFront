import { ClrDatagridComparatorInterface, ClrDatagridFilterInterface } from "@clr/angular";
import { Subject } from "rxjs";
import { Score } from "./interfaces/scores";

export class ScoreFilter implements ClrDatagridFilterInterface<Score> {

  min?: number;
  max?: number;
  changes = new Subject<any>();

  accepts(item: Score): boolean {
    var overMin = this.min ? this.min <= item.score : true;
    var underMax = this.max ? item.score <= this.max : true;
    return overMin && underMax;
  }

  isActive(): boolean {
    return this.min !== undefined && this.max !== undefined;
  }

  get state() {
    return {field: 'score', value: {min: this.min, max: this.max}};
  }

  apply(): void {
    this.changes.next({min: this.min, max: this.max});
  }

  clear(): void {
    this.min = undefined;
    this.max = undefined;
  }

}

export class SoldierNameComparator implements ClrDatagridComparatorInterface<Score> {
  compare(a: Score, b: Score): number {
    return a.soldier.id - b.soldier.id;
  }

}
