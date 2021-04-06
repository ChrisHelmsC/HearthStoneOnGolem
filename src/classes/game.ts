import { DeckBuilder } from "./cards/deck.builder";
import { AcidicSwampOoze } from "./cards/data/acidic.swamp.ooze.card";
import { BlazingBattlemage } from "./cards/data/blazing.battlemage.card";
import { BloodfenRaptor } from "./cards/data/bloodfen.raptor.card";
import { BluegillWarrior } from "./cards/data/bluegill.warrior.card";
import { KoboldGeomancer } from "./cards/data/kobold.geomancer.card";
import { MurlocRaider } from "./cards/data/murloc.raider.card";
import { StoneTuskBoar } from "./cards/data/stonetusk.boar.card";
import { Wisp } from "./cards/data/wisp.card";
import { SpellCard } from "./cards/spellcard";
import { Hero } from "./hero";
import { Player } from "./player";
import { CardWriter } from "./util/cardwriter";



export class Game {
    private readonly PLAYER_HEALTH = 15;

    players : Array<Player>;

    constructor() {
        this.players = new Array<Player>();
    }

    public play() {
        const cardCollection = [AcidicSwampOoze, BlazingBattlemage, BloodfenRaptor, BluegillWarrior, KoboldGeomancer,
            MurlocRaider, StoneTuskBoar, Wisp];

        //Create generic heros, each with 30 health
        const heroOne = new Hero('HeroOne', this.PLAYER_HEALTH, 0, 0);
        const heroTwo = new Hero('HeroTwo', this.PLAYER_HEALTH, 0, 0);

        

        //Two players, each with a hero and a deck start at 30 health, add to player array
        const playerOne = new Player('Player One', heroOne, 1, 0)
        const playerTwo = new Player('Player Two', heroTwo, 1, 0)

        //Create and set decks
        const deckOne = new DeckBuilder(cardCollection, playerOne, playerTwo).getAsDeck();
        playerOne.setDeck(deckOne);
        const deckTwo = new DeckBuilder(Array.from(cardCollection.reverse()), playerTwo, playerOne).getAsDeck();
        playerTwo.setDeck(deckTwo);

        this.players.push(playerOne);
        this.players.push(playerTwo);

        console.log(playerOne.name + ' Deck: \n' + new CardWriter(playerOne.getDeck().getCards()).createCardString());
        console.log(playerTwo.name + ' Deck: \n' + new CardWriter(playerTwo.getDeck().getCards()).createCardString());

        //Determine which player goes first, which goes second
        const firstTurnPlayer = this.players[Math.floor(Math.random() * this.players.length)]
        const secondTurnPlayer = firstTurnPlayer == playerOne ? playerTwo : playerOne;
        console.log(firstTurnPlayer.name + ' will have the first turn, ' + secondTurnPlayer.name + ' will start with the coin.')
;
        //First turn player gets 3 cards
        firstTurnPlayer.drawCards(3);
        console.log('Hand: ' + new CardWriter(firstTurnPlayer.getHand()).createCardString());

        //Second turn player get 4 cards and the mana token
        secondTurnPlayer.drawCards(4);
        secondTurnPlayer.addCardToHand(new SpellCard('Mana Token', 0))
        console.log('Hand: ' + new CardWriter(secondTurnPlayer.getHand()).createCardString());

        //Players take turns until one dies 
        console.log('\n!!!!!!!!!!!!!! Starting a match !!!!!!!!!!!!!\n');
        let someoneIsDead = false;
        let turnsPassed = 0;

        while(!someoneIsDead && turnsPassed < 300) {
            //Let first player take their turn
            this.takeTurn(firstTurnPlayer, secondTurnPlayer);

            this.printPlayerStatus(firstTurnPlayer);
            this.printPlayerStatus(secondTurnPlayer);

            //If a player died, end game
            if(this.isAPlayerDead()) {
                break;
            }

            //Let second player take turn
            this.takeTurn(secondTurnPlayer, firstTurnPlayer);
            turnsPassed++;

            this.printPlayerStatus(firstTurnPlayer);
            this.printPlayerStatus(secondTurnPlayer);
        }

        //Winner is determined
        console.log('A player has died');
        console.log('Turns passed: ' + turnsPassed);
        console.log('PlayerOne: ' + firstTurnPlayer.getHero().hitpoints + ' Player 2 : ' + secondTurnPlayer.getHero().hitpoints);
    }
    
    /*
        Basic implementation for now:
            Play a monster if possible
            Attack opponents monsters if they have any
            Attack opponent
    */
    private takeTurn(currentPlayer : Player, opponent : Player) {
        console.log(currentPlayer.name + ' is taking their turn.');
        //Increase players mana by 1 and reset available
        currentPlayer.increaseTotalMana(1);
        currentPlayer.resetAvailableMana();

        //Draw a card
        currentPlayer.drawCards(1);

        //Play highest possible card in hand if possible
        if(currentPlayer.getPlayableMonsterCards().length > 0) {
            currentPlayer.playMonsterCard(currentPlayer.getPlayableMonsterCards()[0]);
        } else {
            console.log(currentPlayer.name + ' has no cards that can be played.');
        }

        //If monsters are on field for player, attack
        if(currentPlayer.getBoard().getCards().length > 0) {
            //If opponent has monsters, attack them
            const attackingMonsters = currentPlayer.getBoard().getAttackReadyMonsters();
            let monstersToAttack = opponent.getBoard().getCards();

            attackingMonsters.forEach((monster) => {
                //Attack opponents monsters first
                if(monstersToAttack.length > 0) {
                    monster.attack(monstersToAttack[0]);
                    opponent.getBoard().removeDeadCards();
                    currentPlayer.getBoard().removeDeadCards();
                } else {
                    //If no monsters, attack opponent directly
                    monster.attack(opponent.getHero());
                }
            });
        }

        //At the end of turn, remove summoning sickness for player's monsters
        currentPlayer.getBoard().removeAllSummonSick();
    }

    private isAPlayerDead(){
        return this.players.filter((player) => {
            return player.isDead();
        }).length > 0;
    }

    private printPlayerStatus(player : Player) {
        console.log('The status for ' + player.name + ' is:');
        console.log('Board: ' + new CardWriter(player.getBoard().getCards()).createCardString());
        console.log('Hand: ' + new CardWriter(player.getHand()).createCardString());
        console.log('Deck: ' + new CardWriter(player.getDeck().getCards()).createCardString());
    }
}