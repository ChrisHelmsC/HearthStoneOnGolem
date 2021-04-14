import { Player } from "../../../classes/player";
import { Board } from "../../../classes/board";
import { OpponentModifier } from "../modifiers/opponenet.modifier";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";
import { SpellCard } from "../spellcard";
import { Targeter } from "../targeters/undamaged.targeter";
import { DoesDamage } from "../attributes/does.damage";

export class BackStab extends SpellCard implements Targeter<MonsterCard, Board>, OpponentModifier, PlayerModifier, DoesDamage {
    DAMAGE_AMOUNT : number = 2;

    //Handle on us and our opponents for board access
    player : Player;
    opponent : Player;
    target : MonsterCard;

    constructor() {
        super('Backstab', 0);
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    public canPlay() {
        return this.getTargetables().length > 0;
    }

    public getTargetables() : Array<MonsterCard> {
        //Get all cards on board
        const cards =  this.opponent.getBoard().getCards().concat(this.player.getBoard().getCards());

        //Filter for undamaged cards
        return cards.filter(card => {
            return card.isDamaged();
        });
    }

    public setTarget(target : MonsterCard) {
        console.log(this.name + " setting target to " + target.name);
        this.target = target;
    }

    public play() {
        this.target.takeDamage(this.DAMAGE_AMOUNT);
    }
}