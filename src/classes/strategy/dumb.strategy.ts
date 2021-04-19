import { Move } from "../moves/move";
import { Strategy } from "./strategy";

export class DumbStrategy implements Strategy{
    name : string = "DumbStrategy";
    moves: Move[];

    setPossibleMovies(moves: Move[]): void {
        this.moves = moves;
    }

    //TODO need to create  CardPlayingMove
    //TODO add lines to prioritize playing new cards first
    getNextMove(): Move {
        //Otherwise, return first more
        return this.moves[0];
    }
    
}