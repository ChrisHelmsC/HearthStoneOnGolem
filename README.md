# HearthStoneOnGolem

**NOTICE:** This is a hackathon project and the quality of code is not garunteed. Please do not judge anything for being messy, gross,  heinous, ridiculous, ineffecient, convoluted, of poor quality, poorly designed, noobish, hackey, or downright disgusting. Everything in this project was written in a small amount of time and with little to no planning. 

## Table of Contents
* Introduction
* Setup
* Infile Configuration
* Output
* Cards
* Strategy Definition

## Introduction
**This project is designed to be run on the Golem Network (https://www.golem.network) as a provider image and references file paths specific to the Golem project. It can be run as a standalone project with some modifications, but its recommended use is through the associated Golem requestor script, located at https://github.com/ChrisHelmsC/hsog-requester. Non-developers should refer to the requestor repository and avoid using this application directly.**

HearthStoneSimulationsOnGolem is a Node JS application designed to simulate a single game of HearthStone, a popular card game created by Blizzard. An input file is provided to the application detailing data to be used in the game, including the deck composition and strategy for each player to use. The game is simulated using these details and returns a list of statistics, including the overall winner, damage done, cards played, and more. The application additionally writes out logging which provides insight into each move made within the game.

**The overall intention of this application is to assist HearthStone players in designing and tweaking decks by allowing them "play" games extremely quickly and then utilzing the output to better understand deck performance.** It attempts to align as closely as possible with actual HearthStone concepts, and future revisions will bring it closer to this goal.

Developers should aim to define new **strategies** for the application, as they act as the brains behind what move should be played next. A useful **Strategy** interface has been defined to ensure this functionality is widely extensible.

## Setup
**Intended for developers who wish to extend functionality ONLY.**
* Once cloned, project dependencies should be installed with `npm install`.
* The project can be run directly using `npm run start`, but all lines related to read and writing from docker volumes should be modified to refer to local locations. These modifications include changes to specify the InFile location, as well as changes to specify where output logs and statistics should be written.
* The project can be built into a docker image using the provided Dockerfile with no modifications. The expected InFile location in this case will be the volume `/golem/input/in.file.json'`, and the output location will be the volume `/golem/output/gamestats.json`.

## InFile Configuration
The infile is used to define the data that will be used to run the simulation. InFiles are defined based on an interface in `/src/util/in.file.ts`. And example infile `/src/util/example.in.file.json` has also been included.
At the time of writing, an infile should contain:
* Definitions of data for two players:
  * An array of card names **in order** that will represent the player's deck. These card names should match the card class names defined in the location `src/classes/cards/data/`.
  * The strategy class name to use when playing these cards. Strategies are defined in `src/classes/strategy/`.

## Output
Output is written at the end of the simulation in the form of a **GameData Object** using a JSON format. This object includes a number of useful stats collected over the course of the game for both players. The location of this clas within the project is `src/logging/game.data.ts`.
Logging for actions and events during the game is writtent to standard output.

## Cards
Cards are a component of the data used to play a game. All the cards that can be used in the simulation are defined in `src/classes/cards/data/`. When referring to cards on the InFile the user must use the class name of the card, not the card's name property. Addtional cards will be created for use over time, and will be added here as well.

## Strategy Definition
Strategies are the brains behind making moves in the application. Two basic strategies have been defined already:
* DumbStrategy - plays a random move.
* SimpleStrategy - will attempt to attack monster that can be killed without losing a monster of its own, and will prioritize attacking the enemy Hero if they can be killed in the current move.

These pre-defined strategies only serve as examples, additional strategies should be developed for more granular control over decisions involving your deck. Strategies should implement the Strategy interface, which requires them to implement a few simple but powerful methods. In short, the simulator will pass a list of possible "moves" to the strategy, and it should return the move it determines is the best for the current situation. After the move is played, the strategy will be passed another move, and this cycle will continue until the player has run out of possible moves and ends their turn.
