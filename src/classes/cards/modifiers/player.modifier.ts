import { Player } from "../../player";

export interface PlayerModifier {
    setPlayer(player : Player) : void;
}