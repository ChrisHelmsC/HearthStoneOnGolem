import { Player } from "../../../classes/player";
import { Board } from "../../../classes/board";
import { MonsterCard } from "../monstercard";
import { SpellCard } from "../spellcard";
import { Targeter } from "../targeters/undamaged.targeter";
import { PlayerModifier } from "../modifiers/player.modifier";
import { ChangesMana } from "../attributes/changes.mana.attribute";
import { globalEvent } from "@billjs/event-emitter";

export class Shadowstep extends SpellCard implements Targeter<MonsterCard, Board>, PlayerModifier, ChangesMana{
    MANA_CHANGE_AMOUNT: number = -2;
    player: Player;
    target: MonsterCard;

    constructor() {
        super('Shadowstep', 0);
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    setTarget(target: MonsterCard): void {
        this.target = target;
    }

    canPlay() : boolean {
        return this.getTargetables().length > 0;
    }

    getTargetables(): MonsterCard[] {
        return this.player.getBoard().getCards();
    }

    public play() {
        this.player.getBoard().removeCard(this.target);
        
        //Modify card to cost less
        this.target.modifyCost(this.MANA_CHANGE_AMOUNT);

        //Add card back to hand
        this.player.addCardToHand(this.target);

        //Fire event
        globalEvent.fire("return_to_hand", {player : this.player, numCards : 1})

        console.log(this.name + ' moved ' + this.target.name + " from board to hand, and decreased cost to " + this.target.cost);
    }
    
}