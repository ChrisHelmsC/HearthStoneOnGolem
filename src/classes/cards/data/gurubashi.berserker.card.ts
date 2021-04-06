import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

export class GurubashiBerserker extends MonsterCard {
    constructor() {
        super('Gurubashi Berserker', 5, 8, 2, CardType.None);
    }

    //Gain three attack when taking damage
    public takeDamage(damage : number) {
        this.hitpoints -= damage;

        const DAMAGE_INCREASE_AMOUNT = 3;
        this.bonusDamage += DAMAGE_INCREASE_AMOUNT;
        console.log(this.name + " took damage, and has had its damage increased by " + DAMAGE_INCREASE_AMOUNT + 
         " for total of " + this.totalDamage());
    }
}