import { DumbStrategy } from "./dumb.strategy";
import { SimpleStrategy } from "./simple.strategy.";
import { Strategy } from "./strategy";

export class StrategyMapper {

    private allStrategies: { [x: string]: () => Strategy; } = {};

    constructor() {
        // Called a hackathon for a reason
        this.allStrategies[DumbStrategy.name] = () => {return new DumbStrategy()}
        this.allStrategies[SimpleStrategy.name] = () => {return new SimpleStrategy()}
    }

    public getStrategyFromClass(strategyName : string) : Strategy {
        return this.allStrategies[strategyName]();
    }
}