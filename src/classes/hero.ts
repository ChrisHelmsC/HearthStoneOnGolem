import { Fighter } from "./fighter";

export class Hero implements Fighter {
    name : string;
    hitpoints: number;
    armor : number;
    baseDamage: number;
    bonusDamage: number;

    //TODO create hero powers

    constructor(name : string, hitpoints : number, armor : number, baseDamage : number) {
        this.name = name;
        this.hitpoints = hitpoints;
        this.armor = armor;
        this.baseDamage = baseDamage;
        
        this.bonusDamage = 0;
    }
    
    public attack(defender: Fighter): void {
        defender.defend(this);

        //Take damage from defender
        this.hitpoints -= defender.totalDamage();
    }

    public defend(attacker: Fighter): void {
        //Take damage from attacker
        this.takeDamage(attacker.totalDamage())
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

    totalDamage(): number {
        return this.baseDamage + this.bonusDamage;
    }
}