import { PlayerStats } from "./player.stats";
import { globalEvent } from "@billjs/event-emitter"
import { Player } from "../classes/player";
import { Card } from "../classes/cards/card";
import { MonsterCard } from "../classes/cards/monstercard";
import { Hero } from "../classes/hero";
import { Fighter } from "../classes/fighter";

export class LoggingHandler {
    gameData  : {[ key :string] : PlayerStats} = {};
    turnsPlayed : number = 0;

    //Certain events require tracking of which player's turn it is, update every turn
    currentPlayer : Player;
    opponent : Player;

    constructor(playerOne : Player, playerTwo : Player) {
        //Add stats for reference by player name
        this.gameData[playerOne.name] = new PlayerStats();
        this.gameData[playerTwo.name] = new PlayerStats();

        //Any time a player takes their turn, track it for context
        globalEvent.on('begin_turn', event => {
            this.currentPlayer = event.data.currentPlayer;
            this.opponent = event.data.opponent;
            console.log(this.currentPlayer.name + ' is taking their turn.');
        })

        //Track player drawing cards
        globalEvent.on("cards_drawn", event => {
            const player : Player = event.data.player;
            const drawnCards : Card[] = event.data.drawnCards;

            //Increment draw count
            this.gameData[player.name].cardsNaturallyDrawn += drawnCards.length;

            drawnCards.forEach(card => {
                console.log(player.name + ' drew a ' + card.name + ' from their deck.');
            })
        })

        //Track player being "forced" to draw cards (By non natural event)
        globalEvent.on("cards_force_drawn", event => {
            const player : Player = event.data.player;
            const affecter = event.data.affecter;

            console.log(player.name + " was forced to draw " + affecter.DRAW_AMOUNT + " from their deck.");
            this.gameData[player.name].cardsForceDrawn += affecter.DRAW_AMOUNT;
        })

        //Card fatigue event
        globalEvent.on("card_fatigue_damage", event => {
            const player : Player = event.data.player as Player;
            console.log(player.name + " has taken " + player.getNoCardDamage() + " damage from having no cards, and has " +
             player.getHero().hitpoints + " health left.")

             //Increment stats
             this.gameData[player.name].fatigueDamageTaken += player.getNoCardDamage();
        })

        //Card played event
        globalEvent.on("card_played", event => {
            const player : Player = event.data.player;
            const card = event.data.card;

            this.gameData[player.name].cardsPlayed += 1;
        })

        globalEvent.on("cards_discarded_from_hand", event => {
            const player : Player = event.data.player;
            const discardedCards : Card[] = event.data.discardedCards;

            this.gameData[player.name].cardsDiscarded += discardedCards.length;
        })

        globalEvent.on('monster_attacking', event => {
            const attacker : MonsterCard = event.data.attacker;
            const defender : Fighter = event.data.defender;

            //Use player turn since we can't get access to player here
            const currentGameData = this.gameData[this.currentPlayer.name];

            //Damage MY monsters have done, damage MY monsters have taken
            currentGameData.monsterDamageDone += attacker.totalDamage();
            currentGameData.monsterDamageTaken += defender.totalDamage();

            console.log(attacker + ' is attacking ' + defender.name + ' for ' + attacker.totalDamage() + ' damage.' 
            + defender.name + " will do " + defender.totalDamage() + " to " + attacker.name + ".");
        });

        globalEvent.on('monster_defending', event => {
            const attacker : MonsterCard = event.data.attacker;
            const defender : MonsterCard = event.data.defender;

            //Use player turn since we cant get access to player here
            const currentGameData = this.gameData[this.opponent.name];
            currentGameData.monsterDamageDone += defender.totalDamage();
            currentGameData.monsterDamageTaken += attacker.totalDamage();
        })

        //Card played event
        globalEvent.on("monster_card_played", event => {
            const player : Player = event.data.player;
            const card = event.data.card;

            this.gameData[player.name].monstersPlayed += 1;
            console.log(player.name + ' is playing monster: ' + card.name);
        })

        //Track monsters that died
        globalEvent.on("monster_died", event => {
            const player : Player = event.data.player;
            const deadCards : Array<MonsterCard> = event.data.deadCards;

            this.gameData[player.name].monstersLost += deadCards.length;
            this.gameData
        });

        //Handle hero being attacker
        globalEvent.on('hero_defending', event => {
            const attacker : Fighter = event.data.attacker;
            const defender : Hero = event.data.defender;

            //Use player turn since we cant get access to player here
            const currentGameData = this.gameData[this.opponent.name];
            //currentGameData.heroDamageDone += defender.totalDamage();
            currentGameData.heroDamageTaken += attacker.totalDamage();
        })

        //Handle card causing hero to gain health
        globalEvent.on("hero_gain_health", event => {
            const player : Player = event.data.player;
            const affecter = event.data.affecter;
            console.log(affecter.name + " is giving " + affecter.HITPOINTS_GAIN + " health to " + player.name);

            //Increment stats
            this.gameData[player.name].heroHealing += affecter.HITPOINTS_GAIN;
        })

        //Add to total mana allowed to player in game
        globalEvent.on("record_mana_available", event => {
            const player : Player = event.data.player;
            this.gameData[player.name].manaAvailable += player.getTotalMana();
        })

        //Store amount of mana used by player throughout game
        globalEvent.on("record_mana_used", event => {
            const player : Player = event.data.player;
            this.gameData[player.name].manaUsed += (player.getTotalMana() - player.getAvailableMana());
        })

        //Store final turn count
        globalEvent.on("final_turn_count", event => {
            this.turnsPlayed = event.data;
        })
    }
}