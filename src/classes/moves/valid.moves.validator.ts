import { Card } from "../cards/card";
import { MonsterCard } from "../cards/monstercard";
import { SpellCard } from "../cards/spellcard";
import { Player } from "../player";
import { AttackingMove, Move, PlayFromHandMove, TargetMove } from "./move";

export class ValidMovesValidator {
    currentPlayer : Player;
    opponentPlayer : Player;

    constructor(currentPlayer : Player, opponentPlayer : Player) {
        this.currentPlayer = currentPlayer;
        this.opponentPlayer = opponentPlayer;
    }

    public getValidMoves() : Move[] {
        let validMoves : Move[] = [];

        // Get all valid moves in players hand
        validMoves = validMoves.concat(this.getValidMovesInHand());

        // Get all valid moves on players board
        validMoves = validMoves.concat(this.getValidMovesOnBoard());

        return validMoves;
    }

    //Should determine cards that can be played
    private getValidMovesInHand() : Move[] {

        //Get list of playable cards
        const playableCards : Card[] = this.currentPlayer.getHand().filter(card => {
            //Check if instance of canPlay
            const currentCard = card as any;
            if(currentCard['canPlay']) {
                //If cant be played, dont allow it through filter
                if(!currentCard.canPlay()) {
                    //console.log(card.name + " is not playable from hand because it failed a canPlay check");
                    return false;
                }
            }

            //Check cards mana is okay compared to players remaining mana
            if(card.cost > this.currentPlayer.getAvailableMana()) {
                //console.log(card.name + " is not playable from hand because it costs too much.");
                return false;
            }

            //Card is playable
            //console.log(card.name + " is playable from hand");
            return true;
        });

        //Take playable cards from hands and turn them into moves
        const playableMoves : Move[] = [];
        playableCards.forEach(card => {

            //If card is a targeter, create a move for each possible target
            const anyCard = card as any;
            const targetMoveCount = 0;
            if(anyCard['setTarget']) { 
                //Get possible targets, create a move for each
                anyCard.getTargetables().forEach((targetable : any) => {
                    //Create move with card and target references
                    playableMoves.push(new PlayFromHandMove(this.currentPlayer, card, new TargetMove(card, targetable,
                        () => {
                            //Set card's target
                            anyCard.setTarget(targetable) 
                        }
                    )));
                });
            } else {
                //If card is not targeter, then just play it
                playableMoves.push(new PlayFromHandMove(this.currentPlayer, card, null));
            }
        })

        console.log("Number of playable moves in hand is: " + playableMoves.length);
        return playableMoves;
    }

    private getValidMovesOnBoard() : Move[] {
        //Get list of playable cards on board
        const playableCards : MonsterCard[] = this.currentPlayer.getBoard().getCards().filter(card => {
            //Ensure monster is not fatigued or summoning sick
            if(!card.canAttack()) {
                return false;
            }
            console.log(card.name + " is playable on the board");
            return true;
        });

        //Get all playable moves from cards on board
        const playableMoves : Move[] = [];
        playableCards.forEach(card => {
            const anyCard = card as any;

            //Create a move to represent an attack on each enemy
            //TODO: handle taunts
            this.opponentPlayer.getAttackables().forEach(attackables => {

                //Start by creating possible targeting movelist  if the monster is a targeter
                let targetCount = 0;
                if(anyCard['setTarget']) { 
                    console.log(card.name + " is a targeter.");
                    //Get possible targets, create a move for each
                    anyCard.getTargetables().forEach((targetable : any) => {
                        console.log("Setting " + card.name + "'s possible target as: " + targetable.name)

                        //Create targeting move
                        const targetMove = new TargetMove(anyCard, attackables, (
                            //Set card's target
                            anyCard.setTarget(targetable)
                        ));

                        //Create attacking move with this targeting move
                        playableMoves.push(new AttackingMove(anyCard, attackables, () => {
                            card.attack(attackables);
                        }, targetMove))

                        //Increase related counter
                        targetCount++;
                    });
                }

                //If card is not a targeter, just create a normal attacking move
                if(targetCount <= 0) {
                    playableMoves.push(new AttackingMove(card, attackables, () => {
                        card.attack(attackables);
                    }, null))
                }
            })
        }) 

        console.log("Number of playable moves on the board is: " + playableMoves.length);
        return playableMoves;
    }
}