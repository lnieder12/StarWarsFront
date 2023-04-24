import { ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from "@clr/angular";
import { Score } from "./interfaces/scores";


export class ScoreFilter implements ClrDatagridNumericFilterInterface<Score> {
  accepts(item: Score, low: number, high: number): boolean {
    if (low == null)
      return item.score <= high;
    if (high == null)
      return low <= item.score;
    return low <= item.score && item.score <= high;
  }

}

export class SoldierNameComparator implements ClrDatagridComparatorInterface<Score> {
  compare(a: Score, b: Score): number {
    return a.soldier.id - b.soldier.id;
  }

}