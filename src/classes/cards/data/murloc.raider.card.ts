import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class MurlocRaider extends MonsterCard {
    constructor() {
        super('Murloc Raider', 1, 1, 2, CardType.Murloc);
    }
}