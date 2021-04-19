import { Move } from "../moves/move";

export interface Strategy {
    moves : Move[];
    name : string;
    setPossibleMovies(moves : Move[]) : void;
    getNextMove() : Move ;
}