import { Move } from "../moves/move";
import { Player } from "../player";

export interface Strategy {
    moves : Move[];
    name : string;
    setPossibleMovies(player : Player, opponent : Player, moves : Move[]) : void;
    getNextMove() : Move ;
}