import { Fighter } from "./fighter";

export class Hero implements Fighter {
    name : string;
    hitpoints: number;
    armor : number;
    baseDamage: number;

    //TODO create hero powers

    constructor(name : string, hitpoints : number, armor : number, baseDamage : number) {
        this.name = name;
        this.hitpoints = hitpoints;
        this.armor = armor;
        this.baseDamage = baseDamage;
    }
    
    public attack(defender: Fighter): void {
        defender.defend(this);

        //Take damage from defender
        this.hitpoints -= defender.baseDamage;
    }

    public defend(attacker: Fighter): void {
        //Take damage from attacker
        this.takeDamage(attacker.baseDamage)
    }

    public takeDamage(damage : number) {
        //Calculate damage that armor can block
        const remainingDamage = damage - this.armor;

        //Remove damage from armor
        this.armor = Math.max(0, this.armor - damage);
        
        //Any remaining damage should be subtracted from health
        this.loseHealth(Math.max(0, remainingDamage));
    }

    //Removes health from hero
    public loseHealth(healthLost : number) {
        this.hitpoints -= healthLost;
    }

    //Adds health to hero
    public gainHealth(healthGained : number) {
        this.hitpoints += healthGained;
    }

    //Returns true is the hero is dead, and false otherwise
    public isDead() {
        return this.hitpoints <= 0;
    }
}