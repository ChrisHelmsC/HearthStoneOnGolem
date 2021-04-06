import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

//Will have charge
export class StoneTuskBoar extends MonsterCard {
    constructor() {
        super('Stonetusk Boar', 1, 1, 1, CardType.Beast);
    }

    public play() {
        this.summonSick = false;
        console.log(this.name + ' has rush and has no summoning sickness.')
    }
}