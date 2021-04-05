import { Player } from "../../player";
import { CardType } from "../cardtype";
import { PlayerModifier } from "../modifiers/player.modifier";
import { MonsterCard } from "../monstercard";

export class KoboldGeomancer extends MonsterCard implements PlayerModifier {

    private player : Player;
    private readonly SPELL_DAMAGE_INCREASE = 1;

    constructor() {
        super('Kobold Geomancer', 2, 2, 2, CardType.None);
    }

    setPlayer(player : Player): void {
        this.player = player;
    }

    public play() {
        if(this.player !== null) {
            console.log(this.name + ' is increasing spell damage by: ' + this.SPELL_DAMAGE_INCREASE);
            this.player.increaseSpellDamage(this.SPELL_DAMAGE_INCREASE);
            console.log(this.player.name + ' now has spell damage of: ' + this.player.getSpellDamage());
        }
    }
}