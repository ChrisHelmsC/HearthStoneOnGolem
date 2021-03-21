import cardCollection from "./cards/data/cardexamples";
import { Deck } from "./deck";
import { Hero } from "./hero";
import { Player } from "./player";

export class Game {
    public play() {
        //Create generic heros, each with 30 health
        const heroOne = new Hero('HeroOne', 30, 0, 0);
        const heroTwo = new Hero('HeroTwo', 30, 0, 0);

        //Create two decks
        const deckOne = new Deck(cardCollection);
        const deckTwo = new Deck(cardCollection.reverse());

        //Two players, each with a hero and a deck start at 30 health
        const playerOne = new Player('Player One', heroOne, deckOne, 1)
        const playerTwo = new Player('Player Two', heroTwo, deckTwo, 1)

        //Determine which player goes first, which gets coin
        const playerArray = [playerOne, playerTwo];
        const firstTurn = playerArray[Math.floor(Math.random() * playerArray.length)]
        const secondTurn = firstTurn == playerOne ? playerTwo : playerOne;

        //First player gets 3 cards, other player is given "the coin" and gets 4.

        //Players take turns until one dies 

        //Winner is determined
    }

    private takeTurn(currentPlayer : Player, opponent : Player) {
        //Check if any moves are applicable for current player based on mana, situation

        //Play moves until out of mana


    }
}