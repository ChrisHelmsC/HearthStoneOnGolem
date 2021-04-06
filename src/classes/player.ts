import { Board } from "./board";
import { Card } from "./cards/card";
import { MonsterCard } from "./cards/monstercard";
import { Deck } from "./deck";
import { Hero } from "./hero";

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
            console.log(this.name + " has taken " + this.noCardDamage + " damage from having no cards, and has " + this.hero.hitpoints + " health left.")
        } else {
            this.deck.drawCards(num).forEach((card ) => {
                console.log(this.name + ' drew a ' + card.name + ' from their deck.');
                this.hand.push(card);
            });
        }
    }

    public discardCards(num : number) {
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
            return b.cost - a.cost;
        });

        return filteredCards as Array<MonsterCard>;
    }

    public playMonsterCard(card : MonsterCard) {
        console.log(this.name + ' is playing monster: ' + card.name);
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
}