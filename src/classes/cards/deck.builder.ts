import { Deck } from "../deck";
import { Player } from "../player";
import { Card } from "./card";
import { CardMapper } from "./data/card.mapper";

export class DeckBuilder {
    cardNames : string[];
    player : Player;
    enemy : Player;
    cardMapper : CardMapper;

    constructor(cardNames : string[], player : Player, enemy : Player) {
        this.cardNames = cardNames;
        this.player = player;
        this.enemy = enemy;
        this.cardMapper = new CardMapper();
    }

    //This will get us an array of cards for testing
    public getAsDeck() : Deck{
        const createdCards  = new Array<Card>();

        this.cardNames.forEach((name: string) => {
            let currentCard : Card = this.cardMapper.getCardFromClass(name);

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

        if ( card['setOpponent']) {
            card.setOpponent(this.enemy);
        }
    }

    public createDeckFromString() : Array<Card> {
        //TODO this is a future method
        return [];
    }
}