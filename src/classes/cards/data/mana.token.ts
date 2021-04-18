import { Player } from "../../../classes/player";
import { ChangesMana } from "../attributes/changes.mana.attribute";
import { PlayerModifier } from "../modifiers/player.modifier";
import { SpellCard } from "../spellcard";
import { Targeter } from "../targeters/undamaged.targeter";
import { CanPlay } from "../utils/can.play";

export class ManaToken extends SpellCard implements ChangesMana, PlayerModifier, Targeter<Player, Player[]>, CanPlay{
    target: any;
    MANA_CHANGE_AMOUNT: number = 1;
    player: Player;
    
    constructor() {
        super('Mana Token', 0);
    }
    
    setTarget(target: any): void {
        this.target = target;
    }

    getTargetables(): Player[] {
        return [this.player];
    }
    
    setPlayer(player: Player): void {
        this.player = player;
    }

    //Mana token can always be played
    canPlay() {
        return true;
    }

    public play() {
        this.player.increaseTotalMana(this.MANA_CHANGE_AMOUNT);

        //TODO Fire event to track mana increase
        //globalEvent.fire("return_to_hand", {player : this.player, mana_change : 1});

        console.log(this.name + " has increased " + this.player.name + " by " + this.MANA_CHANGE_AMOUNT);
    }
}