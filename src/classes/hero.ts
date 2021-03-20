export class Hero {
    name: string;
    health: number;

    constructor(name: string, health: number) {
        this.name = name;
        this.health = health;
    }

    //Removes health from hero
    public loseHealth(healthLost : number) {
        this.health -= healthLost;
    }

    //Adds health to hero
    public gainHealth(healthGained: number) {
        this.health += healthGained;
    }

    //Returns true is the hero is dead, and false otherwise
    public isDead() {
        return this.health <= 0;
    }
}