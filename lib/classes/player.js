"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(name, health) {
        this.name = name;
        this.health = health;
    }
    Player.prototype.loseHealth = function (healthLost) {
        this.health -= healthLost;
    };
    Player.prototype.gainHealth = function (healthGained) {
        this.health += healthGained;
    };
    return Player;
}());
exports.Player = Player;
