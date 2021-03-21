import { Fighter } from "../fighter";
import { Card } from "./card";
import { CardType } from "./cardtype";

export class MonsterCard extends Card implements Fighter {
    hitpoints : number;
    baseDamage : number;
    type: CardType;

    constructor(name : string, cost : number, hitpoints : number, baseDamage : number, type : CardType) {
        super(name, cost);
        this.hitpoints = hitpoints;
        this.baseDamage = baseDamage;
        this.type = type;
    }

    public attack(defender : Fighter) {
        defender.defend(this);

        //Take damage from defender
        this.takeDamage(defender.baseDamage)
    }

    public defend(attacker : Fighter) {
        //Remove hitpoints
        this.takeDamage(attacker.baseDamage);
    }

    public takeDamage(damage : number) {
        this.hitpoints -= damage;
    }

    //Returns true if this monster is dead
    public isDead() {
        return this.hitpoints <= 0;
    }
}