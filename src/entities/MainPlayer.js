import { PlayerStates } from "../constants/PlayerStates.js";
import { GameMap } from "./Map.js";
import { Player } from "./Player.js";

export class MainPlayer extends Player{
    constructor(gameMap, x, y, dimX, dimY, vX, vY){
        super(gameMap, x, y, dimX, dimY, vX, vY)
        this.directionVelocity = {
            x: 0,
            y: 0
        }
    }
}
