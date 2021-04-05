import { CardType } from "../cardtype";
import { MonsterCard } from "../monstercard";

const wisp = new MonsterCard('Wisp', 0, 1, 1, CardType.None);
const blazingBattlemage = new MonsterCard('Blazing Battlemage', 1, 2, 2, CardType.None);
const murlocRaider = new MonsterCard('Murloc Raider', 1, 1, 2, CardType.Murloc);
const stoneTuskBoar = new MonsterCard('Stonetusk Boar', 1, 1, 1, CardType.Beast);
const bloodfenRaptor = new MonsterCard('Bloodfen Raptor', 2, 2, 3, CardType.Beast);
const acidicSwampOoze = new MonsterCard('Acidic Swamp Ooze', 2, 2, 3, CardType.None);
const bluegillWarrior = new MonsterCard('Bluegill Warrior', 2, 1, 2, CardType.Murloc);

const cardCollection = [wisp, blazingBattlemage,  bluegillWarrior, stoneTuskBoar, bloodfenRaptor,
    acidicSwampOoze, murlocRaider ];
export default cardCollection;

