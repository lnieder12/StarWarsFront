import { Soldier } from './soldier'

export interface Round {
    id: number,
    attacker: Soldier,
    defender: Soldier,
    damage: number,
    isDead: boolean,
    hpLeft: number
}