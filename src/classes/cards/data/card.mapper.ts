import { Card } from "../card";
import { AcidicSwampOoze } from "./acidic.swamp.ooze.card";
import { BlazingBattlemage } from "./blazing.battlemage.card";
import { BloodfenRaptor } from "./bloodfen.raptor.card";
import { BluegillWarrior } from "./bluegill.warrior.card";
import { EmeraldSkytalon } from "./emerald.skytalon.card";
import { KoboldGeomancer } from "./kobold.geomancer.card";
import { MurlocRaider } from "./murloc.raider.card";
import { StoneTuskBoar } from "./stonetusk.boar.card";
import { VoodooDoctor } from "./voodoo.doctor.card";
import { Wisp } from "./wisp.card";

export class CardMapper {

    private allCards: { [x: string]: () => Card; } = {};

    constructor() {
        // Called a hackathon for a reason
        this.allCards[AcidicSwampOoze.name] = () => {return new AcidicSwampOoze()}
        this.allCards[BlazingBattlemage.name] = () => {return new BlazingBattlemage();}
        this.allCards[BloodfenRaptor.name] = () => {return new BloodfenRaptor();}
        this.allCards[BluegillWarrior.name] = () => {return new BluegillWarrior();}
        this.allCards[KoboldGeomancer.name] = () => {return new KoboldGeomancer();}
        this.allCards[MurlocRaider.name] = () => {return new MurlocRaider();}
        this.allCards[StoneTuskBoar.name] = () => {return new StoneTuskBoar();}
        this.allCards[Wisp.name] = () => {return new Wisp();}
        this.allCards[VoodooDoctor.name] = () => {return new VoodooDoctor();}
        this.allCards[EmeraldSkytalon.name] = () => {return new EmeraldSkytalon()}
    }

    public getCardFromClass(cardName : string) : Card {
        return this.allCards[cardName]();
    }

}