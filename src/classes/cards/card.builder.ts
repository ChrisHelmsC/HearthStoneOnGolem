import { Deck } from "../deck";
import { Player } from "../player";
import { Card } from "./card";
import { CardMapper } from "./data/card.mapper";
import { MonsterCard } from "./monstercard";

export class DeckBuilder {
    cardTypes : any;
    player : Player;
    enemy : Player;
    cardMapper : CardMapper;

    constructor(cardTypes : any, player : Player, enemy : Player) {
        this.cardTypes = cardTypes;
        this.player = player;
        this.enemy = enemy;
        this.cardMapper = new CardMapper();
    }

    //This will get us an array of cards for testing
    public getAsDeck() : Deck{
        const createdCards  = new Array<Card>();

        this.cardTypes.forEach((cardClass: any) => {
            let currentCard : Card = this.cardMapper.getCardFromClass(cardClass.name);

            createdCards.push(currentCard);

            //Handle any card preperations for effects
            this.prepareCardModifiers(currentCard);
        });

        return new Deck(createdCards);
    }

    private prepareCardModifiers(card : any) {
        //Better way to implement all of this?

        //Check for player modifier
        if( card['setPlayer'] ) {
            card.setPlayer(this.player);
        }
    }

    public createDeckFromString() : Array<Card> {
        //TODO this is a future method
        return [];
    }
}