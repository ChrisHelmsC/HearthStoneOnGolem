import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class EmeraldSkytalon extends MonsterCard {
    constructor() {
        super("Emerald Skytalon", 1, 1, 2, CardType.Beast);
    }

    public play() {
        this.summonSick = false;
        console.log(this.name + ' has rush and has no summoning sickness.')
    }
}