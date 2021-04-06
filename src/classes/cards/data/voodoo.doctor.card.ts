import { Player } from "../../player";
import { CardType } from "../cardtype";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";

export class VoodooDoctor extends MonsterCard implements PlayerModifier{
    player: Player;

    constructor() {
        super("Voodoo Doctor", 1, 1, 2, CardType.None);
    }
    setPlayer(player: Player): void {
        this.player = player;
    }

    //Triggers when card is played from hand
    public play() {
        console.log(this.name + " is giving 2 health to " + this.player.name);
    }
}