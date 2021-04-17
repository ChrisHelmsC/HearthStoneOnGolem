import { AttackingMove, Move } from "../moves/move";
import { Strategy } from "./strategy";

export class SimpleStrategy implements Strategy{
    moves: Move[];

    setPossibleMovies(moves: Move[]): void {
        this.moves = moves;
    }

    //TODO need to create  CardPlayingMove
    //TODO add lines to prioritize playing new cards first
    getNextMove(): Move {
        this.moves.forEach(move => {
            //If any move on board kills another monster without dying, prioritize
            if(move instanceof AttackingMove) {
                if(move.card.hitpoints > move.opponentCard.totalDamage()
                    && move.card.totalDamage() > move.opponentCard.hitpoints) {
                        console.log('A monster can be killed by ' + move.card.name + ' without loss: ' + move.opponentCard.name);
                        return move;
                    }
            }
        })

        //Otherwise, return first more
        return this.moves[0];
    }
    
}