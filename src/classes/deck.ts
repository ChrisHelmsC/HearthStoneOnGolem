import _ from "lodash";
import { Card } from "../classes/card";

export class Deck {

    //0 is the bottom of the deck, length - 1 is the top
    private cards : Array<Card>;

    constructor(cards : Array<Card>) {
        this.cards = cards;
    }

    //Returns the number of remaining cards in the deck
    public size() {
        return this.cards.length;
    }

    public peek() {
        return this.cards[this.cards.length - 1];
    }

    //Returns top card on deck. If deck is empty, returns null.
    public drawCard() {
        if(this.cards.length == 0) return null;

        //Get top card, remove it
        return this.cards.pop();
    }

    /* Removes and returns numCards from the deck. Cards are returned
        with index 0 being the first card removed from the deck, and 
        the final card in the array being the last removed.

        If there are not enough cards in the deck, draws all remaining cards
    */
    public drawCards(numCards : number) : Array<Card> {
        //If not enough cards in deck, draw remaining cards
        const toRemove = Math.min(this.cards.length, numCards);

        //Remove number of cards and return them
        const drawnCards = new Array<Card>();
        _(toRemove).times(() => {drawnCards.push(this.cards.pop()!)});
        return drawnCards;
    }

    //Removes numToDiscard cards from the deck, returns number discarded
    public discardCards(numToDiscard : number) {
        //Max number to discard is length of deck
        const toDiscard = Math.min(numToDiscard, this.cards.length);

        _(numToDiscard).times(() => {this.cards.pop()})

        return toDiscard;
    }

    //Adds a card to the top of the deck
    public addToTop(card : Card) {
        this.cards.push(card);
    }

    //Returns a list representing all of the cards in the deck
    public getCards() {
        return this.cards.map(card => card);
    }
}