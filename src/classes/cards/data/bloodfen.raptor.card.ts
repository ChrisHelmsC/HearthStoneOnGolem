import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class BloodfenRaptor extends MonsterCard {
    constructor() {
        super('Bloodfen Raptor', 2, 2, 3, CardType.Beast);
    }
}