import { Card } from "./card";
import { CanPlay } from "./utils/can.play";

export class SpellCard extends Card implements CanPlay {
    canPlay(): boolean {
        return true;
    }

    public play() {}
}