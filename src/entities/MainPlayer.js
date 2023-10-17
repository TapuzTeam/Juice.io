import { Player } from "./Player.js";
import { GameViewport } from "../constants/GameViewport.js";
import { PlayerStates } from "../constants/PlayerStates.js";
import { EntityNames } from "../constants/Sprites.js";
import { isNorth, isEast, isSouth, isWest, isShoot, isReload } from "../js/handleKeyInputs.js";
import { allBullets } from "./Bullet.js";
import { Gun } from "./Guns.js";

export class MainPlayer extends Player{
    constructor(gameMap, x, y, vX, vY){
        super(gameMap, x, y, vX, vY)
        this.directionVelocity = {
            x: 0,
            y: 0
        }
        this.image = document.querySelector(`img[alt=jew`);
        this.speed = 400;
        this.mainHand = new Gun(EntityNames.GUN_AK47)
    }

    handleMoveIdleInit(){
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    handleMoveIdleState(){
        if((isNorth() && isEast() && isWest() && isSouth()) || (isEast() && isWest()) || (isNorth() && isSouth())) return;

        if(isNorth()) this.changeState(PlayerStates.MOVE_WALK)
        if(isSouth()) this.changeState(PlayerStates.MOVE_WALK)
        if(isEast()) this.changeState(PlayerStates.MOVE_WALK)
        if(isWest()) this.changeState(PlayerStates.MOVE_WALK)
    }

    handleMoveInit(){
        //init code
    }

    handleMoveState(frameTime){
        let directionVelocity = {x:0, y:0};
        if(isNorth()) directionVelocity.y -= 1
        if(isSouth()) directionVelocity.y += 1
        if(isEast()) directionVelocity.x += 1
        if(isWest()) directionVelocity.x -= 1
        if (!directionVelocity.x && !directionVelocity.y) {this.changeState(PlayerStates.MOVE_IDLE); return;}
        this.calculateSpeed(directionVelocity.x, directionVelocity.y);
        this.handleMove(frameTime)
        console.log(this.position)
    }

    //ACTION STATES
    handleActionIdleInit(){
        
    }

    handleActionIdleState(frameTime){
        if (isReload() && this.mainHand.checkBullets()) this.changeState(PlayerStates.ACTION_RELOAD)
        if (isShoot() && this.mainHand.checkBullets()) this.changeState(PlayerStates.ACTION_RELOAD)
        if(isShoot() && this.mainHand.checkMag()) this.changeState(PlayerStates.ACTION_SHOOT)
    }

    handleActionShootInit(){
    }

    handleActionShootState(frameTime){
        if(!isShoot()){this.changeState(PlayerStates.ACTION_IDLE); return;} 
        switch (this.shoot(frameTime)) {
            case 'reload':
                    if (!this.mainHand.checkBullets()){return;}
                    this.changeState(PlayerStates.ACTION_RELOAD)
                break;
        
            default:
                break;
        }
    }

    handleActionReloadInit(){

    }

    handleActionReloadState(frameTime){
        if(this.reload(frameTime)){
            this.changeState(PlayerStates.ACTION_IDLE); return;
        }
    }

    calculateSpeed(x, y){
        let degrees = Math.atan2(y,x) * 180/Math.PI
        let velX = Math.floor(this.speed * Math.cos(degrees * Math.PI/180) * 100)/100;
        let velY = Math.floor(this.speed * Math.sin(degrees * Math.PI/180) * 100)/100;
        this.velocity.x = velX;
        this.velocity.y = velY;
    }

    handleMove(frameTime){
        this.position.x += this.velocity.x * frameTime.secondsPassed
        this.position.y += this.velocity.y * frameTime.secondsPassed
        this.checkMapBoundary()
    }

    checkMapBoundary(){
        if (this.position.x - this.dimensions.x/2 <= this.gameMap.boundaries.minX){this.position.x = this.gameMap.boundaries.minX + this.dimensions.x/2}
        if (this.position.x + this.dimensions.x/2 >= this.gameMap.boundaries.maxX){this.position.x = this.gameMap.boundaries.maxX - this.dimensions.x/2}
        
        if (this.position.y - this.dimensions.y/2 <= this.gameMap.boundaries.minY){this.position.y = this.gameMap.boundaries.minY + this.dimensions.y/2}
        if (this.position.y + this.dimensions.y/2 >= this.gameMap.boundaries.maxY){this.position.y = this.gameMap.boundaries.maxY - this.dimensions.y/2}
    }

    update(frameTime, context, player){
        this.mainHand.update(frameTime)
        this.moveStates[this.currentMoveState].update(frameTime)
        this.actionStates[this.currentActionState].update(frameTime)
    }
    
    draw(frameTime, context, player){
        context.save()

        //draw player
        let degrees = Math.atan2(this.cursorPosition.y - GameViewport.HEIGHT/2, this.cursorPosition.x - GameViewport.WIDTH/2) * 180 / Math.PI
        context.translate(GameViewport.WIDTH / 2, GameViewport.HEIGHT / 2);
        if (degrees > -90 && degrees < 90){context.scale(1, 1);} else {context.scale(-1, 1)}
        context.drawImage(this.image, -this.dimensions.x/2, -this.dimensions.y/2)
        context.restore()
        
        context.save()
        //draw cursor
        context.beginPath();
        context.strokeStyle = 'black'
        context.moveTo(GameViewport.WIDTH/2, GameViewport.HEIGHT/2)
        context.lineTo(this.cursorPosition.x, this.cursorPosition.y)
        context.stroke()

        //draw gun
        this.mainHand.draw(frameTime, context, this.cursorPosition.x, this.cursorPosition.y)

        //draw state
        context.fillStyle = 'black';
        context.font = "36px arial";
        let moveWidth = context.measureText(this.currentMoveState)
        let actionWidth = context.measureText(this.currentActionState)
        context.fillText(this.currentMoveState, (GameViewport.WIDTH - moveWidth.width)/2, GameViewport.HEIGHT/2 + player.dimensions.y)
        context.fillText(this.currentActionState, (GameViewport.WIDTH - actionWidth.width)/2, GameViewport.HEIGHT/2 + player.dimensions.y*1.5)


        context.restore()
    }

    equip(gun){
        this.mainHand = gun;
    }

    shoot(){
        let angle = Math.atan2(this.cursorPosition.y - GameViewport.HEIGHT/2, this.cursorPosition.x - GameViewport.WIDTH/2) * 180 / Math.PI
        return this.mainHand.shoot(this.position.x, this.position.y, angle);
    }
    
    reload(frameTime){
        return this.mainHand.reload(frameTime);
    }
}
