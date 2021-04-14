import { Player } from "../../player";
import { CardType } from "../cardtype";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";
import { globalEvent } from '@billjs/event-emitter';
import { HitpointsGain } from "../attributes/hitpoint.gain.attribute";

export class VoodooDoctor extends MonsterCard implements PlayerModifier, HitpointsGain{
    player: Player;
    readonly HITPOINTS_GAIN = 2;

    constructor() {
        super("Voodoo Doctor", 1, 1, 2, CardType.None);
    }
    
    setPlayer(player: Player): void {
        this.player = player;
    }

    //Triggers when card is played from hand
    public play() {
        this.player.getHero().hitpoints += this.HITPOINTS_GAIN;
        globalEvent.fire("hero_gain_health", {player: this.player, affecter: this});
    }

    
}