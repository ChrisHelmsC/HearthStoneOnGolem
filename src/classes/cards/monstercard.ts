import { Fighter } from "../fighter";
import { Card } from "./card";
import { CardType } from "./cardtype";

export class MonsterCard extends Card implements Fighter {
    hitpoints : number;
    baseDamage : number;
    bonusDamage: number;
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

        this.bonusDamage = 0;
    }

    public attack(defender : Fighter) {
        console.log(this.name + ' is attacking ' + defender.name + ' for ' + this.totalDamage() + ' damage.');
        defender.defend(this);

        //Take damage from defender
        this.takeDamage(defender.totalDamage())
        console.log(this.name + ' has taken ' + defender.totalDamage() + ' damage and has ' + this.hitpoints + ' hitpoints remaining')
        

        //TODO Monster is now fatigued;
        
    }

    public defend(attacker : Fighter) {
        console.log(this.name + ' is defending.')
        //Remove hitpoints
        this.takeDamage(attacker.totalDamage());
        console.log(this.name + ' has taken ' + attacker.totalDamage() + ' damage and has ' + this.hitpoints + ' hitpoints remaining');
    }

    public takeDamage(damage : number) {
        this.hitpoints -= damage;

        //Handle any death effects
        if(this.isDead()) this.die();
    }

    //Triggers when card is played from hand
    public play() {}

    //Returns true if this monster is dead
    public isDead() {
        return this.hitpoints <= 0;
    }

    //Should be called when this card dies
    public die() {}

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

    totalDamage(): number {
        return this.baseDamage + this.bonusDamage;
    }
}