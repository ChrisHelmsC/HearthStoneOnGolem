import { clear } from "console";
import { mainModule } from "process";
import { CardType } from "./classes/cards/cardtype";
import { MonsterCard } from "./classes/cards/monstercard";


main();
function main() {
    const battleMage = new MonsterCard('Blazing BattleMage', 1, 2, 2, CardType.None);
    const boulderOgre = new MonsterCard('Boulderfist Ogre', 6, 6, 7, CardType.None);

    console.log("Battle mage hitponts is : " + battleMage.hitpoints);
    console.log("Ogre hitponts is : " + boulderOgre.hitpoints);
    battleMage.attack(boulderOgre);

    console.log("Battle mage hitponts after fight is : " + battleMage.hitpoints);
    console.log("Ogre hitponts after fight is : " + boulderOgre.hitpoints);
}