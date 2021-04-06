import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class ChillwindYeti extends MonsterCard {
    constructor() {
        super('Chillwind Yeti', 4, 5, 4, CardType.None);
    }
}