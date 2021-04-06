import { Fighter } from "../fighter";
import { Card } from "./card";
import { CardType } from "./cardtype";

export class MonsterCard extends Card implements Fighter {
    hitpoints : number;
    baseDamage : number;
    type : CardType;
    fatigue : boolean;
    summonSick : boolean;

    constructor(name : string, cost : number, hitpoints : number, baseDamage : number, type : CardType) {
        super(name, cost);
        this.hitpoints = hitpoints;
        this.baseDamage = baseDamage;
        this.type = type;
        this.fatigue = false;
        this.summonSick = true;
    }

    public attack(defender : Fighter) {
        console.log(this.name + ' is attacking ' + defender.name + ' for ' + this.baseDamage + ' damage.');
        defender.defend(this);

        //Take damage from defender
        this.takeDamage(defender.baseDamage)
        console.log(this.name + ' has taken ' + defender.baseDamage + ' damage and has ' + this.hitpoints + ' hitpoints remaining')
        

        //Monster is now fatigued;
        
    }

    public defend(attacker : Fighter) {
        console.log(this.name + ' is defending.')
        //Remove hitpoints
        this.takeDamage(attacker.baseDamage);
        console.log(this.name + ' has taken ' + attacker.baseDamage + ' damage and has ' + this.hitpoints + ' hitpoints remaining');
    }

    public takeDamage(damage : number) {
        this.hitpoints -= damage;
    }

    //Triggers when card is played from hand
    public play() {}

    //Returns true if this monster is dead
    public isDead() {
        return this.hitpoints <= 0;
    }

    isFatigued() {
        return this.fatigue;
    }

    fatigueThis() {
        this.fatigue = true;
    }

    resetFatigue() {
        this.fatigue = false;
    }

    removeSummonSickness() {
        this.summonSick = false;
    }

    isSummonSick() {
        return this.summonSick;
    }

    canAttack() {
        return !this.summonSick && !this.fatigue;
    }
}