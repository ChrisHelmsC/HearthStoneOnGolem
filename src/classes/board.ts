import { Card } from "./cards/card";
import cardCollection from "./cards/data/cardexamples";
import { MonsterCard } from "./cards/monstercard";

export class Board {
    private cards : Array<MonsterCard>;

    constructor() {
        this.cards = new Array();
    }

    playCard(card : MonsterCard) {
        this.cards.push(card);
    }

    removeCard(card : MonsterCard) {
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    removeDeadCards() {
        const deadCards = this.cards.filter((card) => {
            if(card.isDead()) {
                console.log(card.name + ' is dead and is being removed from the board.');
                return true;
            }
            return false;
        });

        //Remove all dead cards
        deadCards.forEach((deadCard) => {
            this.cards.splice(this.cards.indexOf(deadCard, 1));
        });
    }

    unFatigueAllMonsters() {
        this.cards.forEach((card) => {
            card.resetFatigue();
        })
    }

    getUnFatiguedMonsters() {
        return this.cards.filter((card) => {
            return card.isFatigued();
        });
    }

    getCards() {
        return this.cards;
    }


}