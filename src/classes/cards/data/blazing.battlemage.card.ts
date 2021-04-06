import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class BlazingBattlemage extends MonsterCard{
    constructor() {
        super('Blazing Battlemage', 1, 2, 2, CardType.None);
    }
}