import { Card } from "./card";
import { Deck } from "./deck";
import { Hero } from "./hero";

export class Player {
    name : string;

    hero : Hero;
    deck : Deck;
    hand : Array<Card>;
    board : Array<Card>; 

    constructor(name : string, hero : Hero, deck : Deck) {
        this.name = name;
        this.hero = hero;
        this.deck = deck;
        this.hand = new Array<Card>();
        this.board = new Array<Card>();
    }ßß
}