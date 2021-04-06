import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

//has destroy opponent weapon
export class AcidicSwampOoze extends MonsterCard {
    constructor() {
        super('Acidic Swamp Ooze', 2, 2, 3, CardType.None);
    }
}