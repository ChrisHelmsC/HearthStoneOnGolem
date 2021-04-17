import { Card } from "../cards/card";
import { MonsterCard } from "../cards/monstercard";
import { SpellCard } from "../cards/spellcard";
import { Player } from "../player";

export class Move {
    make: (() => void);

    constructor(make : (() => void)) {
        this.make = make;
    }
}

//TODO should a targerter or moves in general include a friendly fire indicator
export class TargetMove extends Move{
    card : Card;
    target : any;

    constructor(card : Card, target : any, make : (() => void)) {
        super(make);

        //Track card for strategy to reference
        this.card = card;
        this.target = target;
        
    }
}

export class PlayFromHandMove extends Move {
    card : Card;
    targetMove : TargetMove;

    constructor(currentPlayer : Player,  card : Card, targetMove : TargetMove) {
        //Build combo move
        const comboMove = () => {
            //If targeter, set target
            if(targetMove != null) targetMove.make();

            //Play card / move monster to board
            if(card instanceof MonsterCard) {
                currentPlayer.playMonsterCard(card);
            } else if (card instanceof SpellCard) {
                currentPlayer.playSpellCard(card);
            }
        };
        super(comboMove);

        //TODO handle cards that target on being played, vs on attacking !!IMPORTANT
        this.targetMove = this.targetMove;
        this.card = card;
    }
}

//When attacking, some monsters trigger effects. Track with targeterMove
//TODO need to handle for heroes
export class AttackingMove extends Move {
    card : MonsterCard;
    opponentCard : MonsterCard;
    targeterMove : TargetMove;

    constructor(card : MonsterCard, opponentCard : any, make : (() => void), targeterMove : TargetMove) {
        //Build combinned targerter and make (aka attack) function
        const comboMove = () => {
            make();

            //If targeting move is set, activate it
            if(targeterMove != null) targeterMove.make();
        };
        super(comboMove);

        //Track card for strategy to reference
        this.card = card;
        this.opponentCard = opponentCard;

        //Set targeter if able
        this.targeterMove = targeterMove;
    }


}