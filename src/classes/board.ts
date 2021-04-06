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
        this.cards.forEach((card) => {
            if(card.isDead()) {
                console.log(card.name + ' is dead and is being removed from the board.');
                this.cards.splice(this.cards.indexOf(card), 1);
            }
        })
    }

    unFatigueAllMonsters() {
        this.cards.forEach((card) => {
            card.resetFatigue();
        })
    }

    getAttackReadyMonsters() {
        return this.cards.filter((card) => {
            return card.canAttack();
        });
    }

    getCards() {
        return this.cards;
    }

    removeAllSummonSick() {
        this.cards.forEach((card) => {
            card.removeSummonSickness();
        });
    }
}