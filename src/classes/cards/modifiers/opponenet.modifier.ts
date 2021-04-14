import { Player } from "../../../classes/player";

export interface OpponentModifier {
    opponent : Player;
    
    setOpponent(opponent : Player) : any ;
}