export interface Fighter {
    name: string;
    hitpoints : number;
    baseDamage : number;

    attack(defender : Fighter) : void;
    defend(attacker : Fighter) : void;
    isDead() : void;
}