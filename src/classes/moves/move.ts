import { Card } from "../cards/card";
import { MonsterCard } from "../cards/monstercard";

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

//When attacking, some monsters trigger effects. Track with targeterMove
export class AttackingMove extends Move {
    card : Card;
    opponentCard : any;
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