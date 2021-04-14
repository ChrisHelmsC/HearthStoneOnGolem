import { globalEvent } from "@billjs/event-emitter";
import { Board } from "../../../classes/board";
import { Player } from "../../../classes/player";
import { Copier } from "../attributes/copier.attribute";
import { OpponentModifier } from "../modifiers/opponenet.modifier";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";
import { SpellCard } from "../spellcard";
import { Targeter } from "../targeters/undamaged.targeter";

//TODO add upgrades each turn here
export class TowagglesScheme extends SpellCard implements Targeter<MonsterCard, Board>, PlayerModifier, OpponentModifier ,
            Copier{

    COPIES_CREATED: number = 1;
    target: MonsterCard;
    player: Player;
    opponent: Player;

    constructor() {
        super('Towaggles Scheme', 1)
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

        console.log(this.name + " has added " + this.COPIES_CREATED + " of " + this.target.name + " to deck. ");

        globalEvent.fire("cards_added_to_deck", {player : this.player, cardsAdded : this.COPIES_CREATED});
    }
}