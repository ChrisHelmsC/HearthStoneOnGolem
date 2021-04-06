import { Player } from "../../player";

export interface PlayerModifier {
    player : Player;
    setPlayer(player : Player) : void;
}