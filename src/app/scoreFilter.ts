import { ClrDatagridComparatorInterface, ClrDatagridFilterInterface } from "@clr/angular";
import { Subject } from "rxjs";
import { Score } from "./interfaces/scores";



type FilterScoreObject = {
  field: string;
  value: {
    min: number | undefined;
    max: number | undefined;
  };
};

export class ScoreFilter implements ClrDatagridFilterInterface<Score, FilterScoreObject> {

  min?: number;
  max?: number;
  changes = new Subject<any>();

  accepts(item: Score): boolean {
    var overMin = this.min ? this.min <= item.score : true;
    var underMax = this.max ? item.score <= this.max : true;
    return overMin && underMax;
  }

  isActive(): boolean {
    if (this.min || this.max) {
      return true;
    }
    return false;
  }

  /*
  state(): FilterScoreObject {
    let obj = {} as FilterScoreObject;
    obj.field = 'score';
    obj.value = {min: this.min, max: this.max};
    return obj;
  }
  */

  apply(): void {
    this.changes.next({ min: this.min, max: this.max });
  }

  clear(): void {
    this.min = undefined;
    this.max = undefined;
  }

}

export class SoldierNameComparator implements ClrDatagridComparatorInterface<Score> {

  field: string = 'soldier.name';

  compare(a: Score, b: Score): number {
    return a.soldier.id - b.soldier.id;
  }

}
