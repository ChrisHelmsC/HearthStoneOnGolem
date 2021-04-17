import { Deck } from "../deck";
import { Player } from "../player";
import { Card } from "./card";
import { CardMapper } from "./data/card.mapper";
import { CardModifierHelper } from "./modifiers/modifier.helper";

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
            new CardModifierHelper(this.player, this.enemy, currentCard).prepareCardModifiers();
        });

        return new Deck(createdCards);
    }

    public createDeckFromString() : Array<Card> {
        //TODO this is a future method
        return [];
    }
}