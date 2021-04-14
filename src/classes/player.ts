import { Board } from "./board";
import { Card } from "./cards/card";
import { MonsterCard } from "./cards/monstercard";
import { Deck } from "./deck";
import { Hero } from "./hero";
import { globalEvent } from '@billjs/event-emitter'
import { range } from "lodash";
import { SpellCard } from "./cards/spellcard";

export class Player {
    public  name : string;
    private hero : Hero;
    private deck : Deck;
    private hand : Array<Card>;
    private board : Board; 
    private totalMana : number;
    private availableMana : number;
    private spellDamage : number;
    private noCardDamage : number;

    constructor(name : string, hero : Hero, totalMana : number, spellDamage : number, noCardDamage : number) {
        this.name = name;
        this.hero = hero;
        this.hand = new Array<Card>();
        this.board = new Board;
        this.totalMana = totalMana;
        this.availableMana = totalMana;
        this.spellDamage = spellDamage;
        this.noCardDamage = noCardDamage;
    }

    //Player draws n cards from their deck into their hand. If they are out of cards, then they are hurt.
    public drawCards(num : number) {
        if(this.isOutOfCards()) {
            this.noCardDamage += 1;
            this.hero.takeDamage(this.noCardDamage);
            globalEvent.fire('card_fatigue_damage', {player : this});
        } else {
            const drawnCards = this.deck.drawCards(num);
            drawnCards.forEach((card ) => {
                this.hand.push(card);
            });
            globalEvent.fire('cards_drawn', {player : this, drawnCards : drawnCards});

            //Discard any cards that go past hand limit
            const CARDS_IN_HAND_LIMIT = 10;
            const discardedCards = this.discardCardsFromHand(this.hand.length - CARDS_IN_HAND_LIMIT);
            if(discardedCards.length > 0) {
                console.log(this.name + " was forced to discard " + discardedCards.length + " cards due to hand size limitations.");
            }
            
        }
    }

    public discardCardsFromHand(num : number)  : Card[]{
        //If no cards to discard, exit
        if(num <= 0) return [];

        const discardedCards :  Card[] = [];
        //TODO this 
        for(let i = 0; i < num; i++) {
            discardedCards.push(this.hand.pop());
        }

        //Fire event for any discarded cards
        globalEvent.fire("cards_discarded_from_hand", {player: this, discardedCards: discardedCards});

        return discardedCards;
    }

    //TODO rename to discardCardsFromDeck
    public discardCardsFromDeck(num : number) {
        this.deck.discardCards(num);
    }

    public isOutOfCards() {
        return this.deck.isEmpty();
    }

    public addCardToHand(card : Card) {
        this.hand.push(card);
    }

    //Returns cards that can be played with current available mana, sorted highest cost first
    public getPlayableCards() {
        return this.hand.filter((card) => {
            return card.cost < this.availableMana;
        }).sort((a, b) => {
            return b.cost - a.cost;
        })
    }

    public getPlayableMonsterCards() : Array<MonsterCard> {
        const filteredCards =  this.hand.filter((card) => {
            return card.cost < this.availableMana &&
                card instanceof MonsterCard;
        }).sort((a, b) => {
            return a.cost - b.cost;
        });

        return filteredCards as Array<MonsterCard>;
    }

    public getPlayableSpellCards() : Array<SpellCard> {
        const filteredCards =  this.hand.filter((card) => {
            return card.cost < this.availableMana &&
                card instanceof SpellCard &&
                card.canPlay();
        }).sort((a, b) => {
            return b.cost - a.cost;
        });

        return filteredCards as Array<SpellCard>;
    }

    public playSpellCard(card : SpellCard) {
        //TODO this is duplicate code with monster card
        card.play();
        this.hand.splice(this.hand.indexOf(card), 1);
        this.availableMana -= card.cost;
    }

    public playMonsterCard(card : MonsterCard) {
        globalEvent.fire("card_played", {player : this, card: card});
        globalEvent.fire("monster_card_played", {player : this, card: card});
        
        this.hand.splice(this.hand.indexOf(card), 1);
        this.board.playCard(card);

        //Alert card that is has been played
        card.play();

        //Subtract cost from available mana
        this.availableMana -= card.cost;
    }

    public isDead() {
        return this.hero.isDead();
    }

    public getBoard() {
        return this.board;
    }

    public getTotalMana() {
        return this.totalMana;
    }

    public getAvailableMana() {
        return this.availableMana;
    }

    public resetAvailableMana() {
        this.availableMana = this.totalMana;
    }

    public increaseTotalMana(amount : number) {
        this.totalMana += amount;
        this.availableMana += amount;
    }

    public getSpellDamage() : number{
        return this.spellDamage;
    }

    public increaseSpellDamage(amount : number) {
        this.spellDamage += amount;
    }

    public decreaseSpellDamage(amount : number) {
        this.spellDamage = Math.max(this.spellDamage - amount, 0);
    }

    public getHero() {
        return this.hero;
    }

    public setDeck(deck : Deck) {
        this.deck = deck;
    }

    public getDeck() {
        return this.deck;
    }
    
    public getHand() {
        return this.hand;
    }

    public getNoCardDamage() {
        return this.noCardDamage;
    }

    //Handles mana reset and increase at beginning of turn
    public resetAndIncreaseMana() {
        //Event to track mana used last turn
        globalEvent.fire("record_mana_used", {player: this});

        //Increase players mana by 1 and reset available
        this.increaseTotalMana(1);
        this.resetAvailableMana();

        console.log(this.name + " mana has been increased to " + this.totalMana);

        //Event to track total mana during game
        globalEvent.fire("record_mana_available", {player : this});
    }

    public removeDeadCardsFromBoard() {
        const deadCards = this.board.removeDeadCards();

        globalEvent.fire("monster_died", {player: this, deadCards: deadCards});
    }
}