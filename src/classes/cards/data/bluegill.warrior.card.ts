import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class BluegillWarrior extends MonsterCard {
    constructor() {
        super('Bluegill Warrior', 2, 1, 2, CardType.Murloc);
    }
}