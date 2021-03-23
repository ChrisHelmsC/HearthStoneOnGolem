import { Card } from "../cards/card";
import { MonsterCard } from "../cards/monstercard";

export class CardWriter {
    private cards : Array<Card>;

    constructor(cards : Array<Card>) {
        this.cards = cards;
    }

    createCardString() : string {
        let cardString = '[\n';
        this.cards.forEach((card) => {
            if(card instanceof MonsterCard) {
                cardString += '\t' + 'Name: ' + card.name + ' Cost: ' + card.cost + ' Hitpoints: ' + card.hitpoints + '\n';
            }
        });
        cardString += ']\n';

        return cardString;
    }
}