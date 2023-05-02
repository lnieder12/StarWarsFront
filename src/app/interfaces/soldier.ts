export interface Soldier {
    id: number,
    // health: number,
    maxHealth: number,
    attack: number,
    name: string,
    soldierType: string
}

export function equals(sld1: Soldier, sld2: Soldier)
{
  return sld1.id === sld2.id;
}
