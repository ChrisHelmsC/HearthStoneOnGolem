import { Card } from "./cards/card";
import { Deck } from "./deck";
import { Hero } from "./hero";

export class Player {
    name : string;

    hero : Hero;
    deck : Deck;
    hand : Array<Card>;
    board : Array<Card>; 
    totalMana : number;
    availableMana : number;

    constructor(name : string, hero : Hero, deck : Deck, totalMana : number) {
        this.name = name;
        this.hero = hero;
        this.deck = deck;
        this.hand = new Array<Card>();
        this.board = new Array<Card>();
        this.totalMana = totalMana;
        this.availableMana = totalMana;
    }
}