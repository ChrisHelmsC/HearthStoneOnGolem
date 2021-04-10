import { Player } from "../../player";
import { CardDrawer } from "../attributes/card.drawer.attribute";
import { CardType } from "../cardtype";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";
import { globalEvent } from '@billjs/event-emitter';

export class LootHoarder extends MonsterCard implements PlayerModifier, CardDrawer {
    player: Player;
    readonly DRAW_AMOUNT = 1;

    constructor() {
        super('Loot Hoarder', 2, 1, 2, CardType.None);
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    //Draws a card on death
    public die() {
        console.log(this.name + ' has died, triggering a card draw effect for its owner.');
        this.player.drawCards(this.DRAW_AMOUNT);
        globalEvent.fire("cards_force_drawn", {player : this.player, affecter : this})
    }
}