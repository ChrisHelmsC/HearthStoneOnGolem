import { Player } from "../../../classes/player";
import { Board } from "../../../classes/board";
import { MonsterCard } from "../monstercard";
import { SpellCard } from "../spellcard"
import { Targeter } from "../targeters/undamaged.targeter";
import { OpponentModifier } from "../modifiers/opponenet.modifier";
import { globalEvent } from "@billjs/event-emitter";

export class Sap extends SpellCard implements Targeter<MonsterCard, Board>, OpponentModifier {
    target: MonsterCard;
    opponent: Player;

    constructor() {
        super('Sap', 2);
    }
    
    setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    setTarget(target: MonsterCard): void {
        this.target = target;
    }

    canPlay() : boolean {
        return this.getTargetables().length > 0;
    }

    getTargetables(): MonsterCard[] {
        return this.opponent.getBoard().getCards();
    }

    public play() {
        this.opponent.getBoard().removeCard(this.target);

        //Add card back to opponent hand
        this.opponent.addCardToHand(this.target);

        //Fire event to track returning to hand
        globalEvent.fire("return_to_hand", {player : this.opponent, numCards : 1})

        console.log(this.name + ' moved ' + this.target.name + " from board to hand.");
    }
}