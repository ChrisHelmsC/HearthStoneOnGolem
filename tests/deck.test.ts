import { Card } from '../src/classes/card';
import { assert } from "chai"
import { Deck } from '../src/classes/deck';

let basicCards : Array<Card>;
let basicDeck : Deck;

beforeEach(() => {
    basicCards = [new Card('a'), new Card('b'), new Card('c'), new Card('d')];
    basicDeck = new Deck(basicCards);
});

describe('Deck Class Testing', () => {
    it('Should create from cards array', () => {
        const deck = new Deck(basicCards);

        assert.exists(deck);
        assert.equal(deck.size(), basicCards.length);
    });

    it('Should return the correct number of cards in the deck', () => {
        assert.equal(basicDeck.size(), basicCards.length);
    });

    it('Should allow us to peek at the top card without removing a card', () => {
        //Get top card
        const lastCard = basicCards[basicCards.length - 1];
        assert.equal(basicDeck.peek(), lastCard);
        assert.equal(basicDeck.size(), basicCards.length);
    });

    it('Should draw card off of the deck and return it', () => {
        const lastCard = basicCards[basicCards.length - 1];
        const drawnCard = basicDeck.drawCard();
        assert.equal(lastCard, drawnCard);
    });

    it('Should return null if trying to draw card from empty deck', () => {
        const emptyDeck = new Deck(new Array<Card>());
        assert.equal(emptyDeck.drawCard(), null);
    });

    it('Should draw multiple cards off of the deck and return them', () => {
        const originalSize = basicDeck.size();

        //Draw three cards
        const numberToDraw = 3;
        const drawnCards = basicDeck.drawCards(numberToDraw);


        assert.equal(basicDeck.size(), originalSize - numberToDraw);
        assert.equal(drawnCards.length, numberToDraw);

        //Drawn cards should no longer be in deck
        drawnCards.forEach((card : Card) => {
            assert.equal(basicDeck.getCards().indexOf(card), -1)
        });
    });

    it('Should only draw as many cards as are in the deck at maximum', () => {
        const numberOfCards = basicDeck.size();

        //Draw as many cards as possible
        const drawnCards = basicDeck.drawCards(numberOfCards + 1);
        assert.equal(numberOfCards, drawnCards.length);
        assert.equal(basicDeck.size(), 0);
    });

    it('should discard cards', () => {
        const numToDiscard = 2;
        const numCards = basicDeck.size();

        basicDeck.discardCards(numToDiscard)

        assert.equal(numCards - numToDiscard, basicDeck.size())
    });

    it('should return the number of cards discarded', () => {
        const numToDiscard = 2;
        const discarded = basicDeck.discardCards(numToDiscard);
        assert.equal(numToDiscard, discarded);
    });

    it('should add a card to the top of the deck', () => {
        const card = new Card(' a new card ');
        basicDeck.addToTop(card);

        assert.equal(card, basicDeck.peek());
    });

    it('should return a list of all the cards in the deck', () => {
        const cardList = basicDeck.getCards();
        assert.equal(cardList.length, basicDeck.size());
    }) 
})