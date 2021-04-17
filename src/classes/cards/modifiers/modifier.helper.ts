import { Player } from "../../../classes/player";
import { Card } from "../card";

export class CardModifierHelper  {
    player : Player;
    opponent : Player;
    card : Card;

    constructor(player : Player, opponent : Player, card : Card) {
        this.player = player;
        this.opponent = opponent;
        this.card = card;
    }

    public prepareCardModifiers() {
        //Better way to implement all of this?
        const card = this.card as any;

        //Check for player modifier
        if( card['setPlayer'] ) {
            card.setPlayer(this.player);
        }

        if ( card['setOpponent']) {
            card.setOpponent(this.opponent);
        }
    }
}