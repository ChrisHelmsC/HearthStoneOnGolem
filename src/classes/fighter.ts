export interface Fighter {
    name: string;
    hitpoints : number;
    baseDamage : number;
    bonusDamage : number;

    attack(defender : Fighter) : void;
    defend(attacker : Fighter) : void;
    isDead() : void;
    totalDamage() : number;
}