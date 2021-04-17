import { Move } from "../moves/move";

export interface Strategy {
    moves : Move[];
    setPossibleMovies(moves : Move[]) : void;
    getNextMove() : Move ;
}