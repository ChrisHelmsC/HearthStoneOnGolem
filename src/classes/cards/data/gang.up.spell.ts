import { Player } from "../../../classes/player";
import { Board } from "../../../classes/board";
import { Copier } from "../attributes/copier.attribute";
import { OpponentModifier } from "../modifiers/opponenet.modifier";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";
import { SpellCard } from "../spellcard";
import { Targeter } from "../targeters/undamaged.targeter";
import { globalEvent } from "@billjs/event-emitter";

export class GangUp extends SpellCard implements Targeter<MonsterCard, Board>, PlayerModifier, OpponentModifier,
    Copier {

    COPIES_CREATED: number = 3;
    target: MonsterCard;
    player: Player;
    opponent: Player;

    constructor() {
        super('Gang Up', 2)
    }

    canPlay() : boolean {
        return this.getTargetables().length > 0;
    }

    setTarget(target: MonsterCard): void {
        this.target = target;
    }

    getTargetables(): MonsterCard[] {
        return this.opponent.getBoard().getCards().concat(this.player.getBoard().getCards());
    }
    
    setPlayer(player: Player): void {
        this.player = player;
    }
    
    setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    public play() {
        for(let i = 0; i < this.COPIES_CREATED; i++) {
            this.player.getDeck().shuffleInto(this.target);
        }

        globalEvent.fire("cards_added_to_deck", {player: this.player, cardsAdded: this.COPIES_CREATED});
    }
}