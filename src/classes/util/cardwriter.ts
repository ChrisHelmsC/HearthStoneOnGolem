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
                cardString += '\t' + 'Name: ' + card.name + ' Cost: ' + card.cost + 
                ' Hitpoints: ' + card.hitpoints + 
                ' Base Damage: ' + card.baseDamage +
                ' Total Damage: ' + card.totalDamage() +
                ' Sick: ' + card.summonSick + '\n';
            }
        });
        cardString += ']\n';

        return cardString;
    }
}