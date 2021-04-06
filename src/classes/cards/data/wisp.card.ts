import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class Wisp extends MonsterCard{
    constructor() {
        super('Wisp', 0, 1, 1, CardType.None);
    }
}