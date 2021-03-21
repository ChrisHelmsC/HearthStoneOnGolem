export interface Fighter {
    hitpoints : number;
    baseDamage : number;

    attack(defender : Fighter) : void;
    defend(attacker : Fighter) : void;
    isDead() : void;
}