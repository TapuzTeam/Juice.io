import { GameViewport } from "../constants/GameViewport.js";
import { PlayerStates } from "../constants/PlayerStates.js";
import { EntityNames } from "../constants/Sprites.js";
import { isNorth, isEast, isSouth, isWest, isShoot, isReload } from "../js/handleKeyInputs.js";
import { allBullets } from "./Bullet.js";
import { Gun } from "./Guns.js";

export class Player {
    constructor(gameMap, x, y, vX, vY){
        this.image = document.querySelector(`img[alt="jew"`);
        this.position = {x: x, y: y};
        this.dimensions = {x:this.image.width, y:this.image.height};
        this.velocity = {x:vX, y:vY};
        this.directionVelocity = {}
        this.speed = 0;
        this.gameMap = gameMap;
        this.cursorPosition = {x:0, y:0};
        this.mainHand = new Gun(EntityNames.GUN_AK47)
        this.currentMoveState = PlayerStates.MOVE_IDLE
        this.currentActionState = PlayerStates.ACTION_IDLE
        this.moveStates = {
            [PlayerStates.MOVE_IDLE]: {
                init: this.handleMoveIdleInit.bind(this),
                update: this.handleMoveIdleState.bind(this),
            },
            [PlayerStates.MOVE_WALK]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
            },
        },
        this.actionStates = {
            [PlayerStates.ACTION_IDLE]: {
                init: this.handleActionIdleInit.bind(this),
                update: this.handleActionIdleState.bind(this),
            },
            [PlayerStates.ACTION_SHOOT]: {
                init: this.handleActionShootInit.bind(this),
                update: this.handleActionShootState.bind(this),
            },
            [PlayerStates.ACTION_RELOAD]: {
                init: this.handleActionReloadInit.bind(this),
                update: this.handleActionReloadState.bind(this),
            },
        },
        this.changeState(PlayerStates.MOVE_IDLE)
        
    }

    changeState(newState){
        if (this.moveStates[newState]){
            this.currentMoveState = newState;
            this.moveStates[this.currentMoveState].init()
        } else if (this.actionStates[newState]){
            this.currentActionState = newState;
            this.actionStates[this.currentActionState].init()
        }

    }

    update(frameTime, context, player){
        
    }

    draw(frameTime, context, player){
        
    }
    
    
}

    
