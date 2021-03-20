"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var lodash_1 = __importDefault(require("lodash"));
var Deck = /** @class */ (function () {
    function Deck(cards) {
        this.cards = cards;
    }
    //Returns the number of remaining cards in the deck
    Deck.prototype.size = function () {
        return this.cards.length;
    };
    Deck.prototype.peek = function () {
        return this.cards[this.cards.length - 1];
    };
    //Returns top card on deck. If deck is empty, returns null.
    Deck.prototype.drawCard = function () {
        if (this.cards.length == 0)
            return null;
        //Get top card, remove it
        return this.cards.pop();
    };
    /* Removes and returns numCards from the deck. Cards are returned
        with index 0 being the first card removed from the deck, and
        the final card in the array being the last removed.

        If there are not enough cards in the deck, draws all remaining cards
    */
    Deck.prototype.drawCards = function (numCards) {
        var _this = this;
        //If not enough cards in deck, draw remaining cards
        var toRemove = Math.min(this.cards.length, numCards);
        //Remove number of cards and return them
        var drawnCards = new Array();
        lodash_1.default(toRemove).times(function () { drawnCards.push(_this.cards.pop()); });
        return drawnCards;
    };
    //Removes numToDiscard cards from the deck, returns number discarded
    Deck.prototype.discardCards = function (numToDiscard) {
        var _this = this;
        //Max number to discard is length of deck
        var toDiscard = Math.min(numToDiscard, this.cards.length);
        lodash_1.default(numToDiscard).times(function () { _this.cards.pop(); });
        return toDiscard;
    };
    //Adds a card to the top of the deck
    Deck.prototype.addToTop = function (card) {
        this.cards.push(card);
    };
    //Returns a list representing all of the cards in the deck
    Deck.prototype.getCards = function () {
        return this.cards.map(function (card) { return card; });
    };
    return Deck;
}());
exports.Deck = Deck;
