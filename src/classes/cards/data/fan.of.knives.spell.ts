import { globalEvent } from "@billjs/event-emitter";
import { Player } from "../../../classes/player";
import { CardDrawer } from "../attributes/card.drawer.attribute";
import { DoesDamage } from "../attributes/does.damage";
import { OpponentModifier } from "../modifiers/opponenet.modifier";
import { PlayerModifier } from "../modifiers/player.modifier";
import { SpellCard } from "../spellcard"

export class FanOfKnives extends SpellCard implements OpponentModifier, PlayerModifier, DoesDamage, CardDrawer {
    opponent: Player;
    player: Player;
    DAMAGE_AMOUNT: number = 1;
    DRAW_AMOUNT: number = 1;

    constructor() {
        super('Fan of Knives', 2)
    }
    

    canPlay() : boolean {
        //Can always play to draw a card
        return true;
    }

    setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    public play() {
        let logString = this.name + " has done " + this.DAMAGE_AMOUNT + " damage to the following monsters: ";

        //Remove cards from board
        const numCardsOnBoard = this.opponent.getBoard().getCards().length;
        this.opponent.getBoard().getCards().forEach(card => {
            logString += card.name + ', ';
            card.takeDamage(this.DAMAGE_AMOUNT);
        }) 
        globalEvent.fire("return_to_hand", {player : this.opponent, cardsReturned: numCardsOnBoard});

        console.log(logString);
        this.player.drawCards(this.DRAW_AMOUNT)
        console.log(this.name + " has caused " + this.player + " to draw " + this.DRAW_AMOUNT + " cards.");
        globalEvent.fire("cards_force_drawn", {player : this.player, affecter: this})
    }
} 