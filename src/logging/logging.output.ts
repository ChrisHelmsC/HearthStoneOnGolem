import { PlayerStats } from './player.stats'

export interface LoggingOutput {
    playerOne : PlayerStats;
    playerTwo : PlayerStats;
    
    turnsPlayed : number;
}