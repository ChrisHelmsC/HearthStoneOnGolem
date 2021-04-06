import { Player } from "../../player";
import { CardType } from "../cardtype";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";

export class LootHoarder extends MonsterCard implements PlayerModifier {
    player: Player;

    constructor() {
        super('Loot Hoarder', 2, 1, 2, CardType.None);
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    //Draws a card on death
    public die() {
        const CARD_DRAW_AMOUNT = 1;
        console.log(this.name + ' has died, which causes the player to draw ' + CARD_DRAW_AMOUNT +  ' cards.')
        this.player.drawCards(CARD_DRAW_AMOUNT);
    }
}