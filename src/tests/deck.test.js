"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("../classes/cards/card");
var chai_1 = require("chai");
var deck_1 = require("../classes/deck");
var basicCards;
var basicDeck;
beforeEach(function () {
    basicCards = [new card_1.Card('a', 1), new card_1.Card('b', 1), new card_1.Card('c', 1), new card_1.Card('d', 1)];
    basicDeck = new deck_1.Deck(basicCards);
});
describe('Deck Class Testing', function () {
    it('Should create from cards array', function () {
        var deck = new deck_1.Deck(basicCards);
        chai_1.assert.exists(deck);
        chai_1.assert.equal(deck.size(), basicCards.length);
    });
    it('Should return the correct number of cards in the deck', function () {
        chai_1.assert.equal(basicDeck.size(), basicCards.length);
    });
    it('Should allow us to peek at the top card without removing a card', function () {
        //Get top card
        var lastCard = basicCards[basicCards.length - 1];
        chai_1.assert.equal(basicDeck.peek(), lastCard);
        chai_1.assert.equal(basicDeck.size(), basicCards.length);
    });
    it('Should draw card off of the deck and return it', function () {
        var lastCard = basicCards[basicCards.length - 1];
        var drawnCard = basicDeck.drawCard();
        chai_1.assert.equal(lastCard, drawnCard);
    });
    it('Should return null if trying to draw card from empty deck', function () {
        var emptyDeck = new deck_1.Deck(new Array());
        chai_1.assert.equal(emptyDeck.drawCard(), null);
    });
    it('Should draw multiple cards off of the deck and return them', function () {
        var originalSize = basicDeck.size();
        //Draw three cards
        var numberToDraw = 3;
        var drawnCards = basicDeck.drawCards(numberToDraw);
        chai_1.assert.equal(basicDeck.size(), originalSize - numberToDraw);
        chai_1.assert.equal(drawnCards.length, numberToDraw);
        //Drawn cards should no longer be in deck
        drawnCards.forEach(function (card) {
            chai_1.assert.equal(basicDeck.getCards().indexOf(card), -1);
        });
    });
    it('Should only draw as many cards as are in the deck at maximum', function () {
        var numberOfCards = basicDeck.size();
        //Draw as many cards as possible
        var drawnCards = basicDeck.drawCards(numberOfCards + 1);
        chai_1.assert.equal(numberOfCards, drawnCards.length);
        chai_1.assert.equal(basicDeck.size(), 0);
    });
    it('should discard cards', function () {
        var numToDiscard = 2;
        var numCards = basicDeck.size();
        basicDeck.discardCards(numToDiscard);
        chai_1.assert.equal(numCards - numToDiscard, basicDeck.size());
    });
    it('should return the number of cards discarded', function () {
        var numToDiscard = 2;
        var discarded = basicDeck.discardCards(numToDiscard);
        chai_1.assert.equal(numToDiscard, discarded);
    });
    it('should add a card to the top of the deck', function () {
        var card = new card_1.Card(' a new card ', 1);
        basicDeck.addToTop(card);
        chai_1.assert.equal(card, basicDeck.peek());
    });
    it('should return a list of all the cards in the deck', function () {
        var cardList = basicDeck.getCards();
        chai_1.assert.equal(cardList.length, basicDeck.size());
    });
});
