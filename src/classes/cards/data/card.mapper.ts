import { Card } from "../card";
import { AcidicSwampOoze } from "./acidic.swamp.ooze.card";
import { BackStab } from "./backstab.spell";
import { BlazingBattlemage } from "./blazing.battlemage.card";
import { BloodfenRaptor } from "./bloodfen.raptor.card";
import { BluegillWarrior } from "./bluegill.warrior.card";
import { ChillwindYeti } from "./chillwind.yeti.card";
import { EmeraldSkytalon } from "./emerald.skytalon.card";
import { FanOfKnives } from "./fan.of.knives.spell";
import { GangUp } from "./gang.up.spell";
import { GurubashiBerserker } from "./gurubashi.berserker.card";
import { KoboldGeomancer } from "./kobold.geomancer.card";
import { LootHoarder } from "./loot.hoarder.card";
import { ManaToken } from "./mana.token";
import { MurlocRaider } from "./murloc.raider.card";
import { Sap } from "./sap.spell";
import { Shadowstep } from "./shadowstep.spell";
import { StoneTuskBoar } from "./stonetusk.boar.card";
import { TowagglesScheme } from "./towaggles.scheme.spell";
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
        this.allCards[ChillwindYeti.name] = () => {return new ChillwindYeti()}
        this.allCards[GurubashiBerserker.name] = () => {return new GurubashiBerserker()}
        this.allCards[LootHoarder.name] = () => {return new LootHoarder()}
        this.allCards[BackStab.name] = () => {return new BackStab()}
        this.allCards[Shadowstep.name] = () => {return new Shadowstep()}
        this.allCards[TowagglesScheme.name] = () => {return new TowagglesScheme()}
        this.allCards[GangUp.name] = () => {return new GangUp()}
        this.allCards[Sap.name] = () => {return new Sap()}
        this.allCards[FanOfKnives.name] = () => {return new FanOfKnives()}
        this.allCards[ManaToken.name] = () => {return new ManaToken()}
    }

    public getCardFromClass(cardName : string) : Card {
        return this.allCards[cardName]();
    }

}