export class Player {
    name: string;
    health: number;

    constructor(name : string, health : number) {
        this.name = name;
        this.health = health;
    }

    public loseHealth(healthLost : number) {
        this.health -= healthLost;
    }

    public gainHealth(healthGained: number) {
        this.health += healthGained;
    }
}