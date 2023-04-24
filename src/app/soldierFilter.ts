import { ClrDatagridComparatorInterface } from "@clr/angular";
import { Rebel_Empire } from "./interfaces/rebel-empire";

export class SoldierNameComparator implements ClrDatagridComparatorInterface<Rebel_Empire> {
    compare(a: Rebel_Empire, b: Rebel_Empire): number {
        return a.rebel.id - b.rebel.id;
    }
}
