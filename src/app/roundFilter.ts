import { ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from "@clr/angular";
import { Round } from "./interfaces/round";

export class AttackerComparator implements ClrDatagridComparatorInterface<Round> {
    compare(a: Round, b: Round): number {
        return a.attacker.id - b.attacker.id;
    }
}

export class DefenderComparator implements ClrDatagridComparatorInterface<Round> {
    compare(a: Round, b: Round): number {
        return a.defender.id - b.defender.id;
    }
}

export class DamageFilter implements ClrDatagridNumericFilterInterface<Round> {
    accepts(item: Round, low: number, high: number): boolean {
      if (low == null)
        return item.damage <= high;
      if (high == null)
        return low <= item.damage;
      return low <= item.damage && item.damage <= high;
    }
  
  }