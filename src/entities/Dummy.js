import { Entities, InteractionLayers } from "../constants/Entities.js";
import { Player } from "./Player.js";
import { GameViewport, RenderRelativeToPlayer } from "../constants/GameViewport.js";
import { PlayerStates } from "../constants/PlayerStates.js";
import { EntityNames } from "../constants/Sprites.js";
import { isNorth, isEast, isSouth, isWest, isShoot, isReload } from "../js/handleKeyInputs.js";
import { allBullets } from "./Bullet.js";
import { Gun } from "./Guns.js";

export class Dummy extends Player{
    constructor(gameMap, x, y, vX, vY){
        super(gameMap, x, y, vX, vY)
        this.entityType = Entities.ENEMY
        this.colliders = InteractionLayers[this.entityType]
        this.directionVelocity = {x: 0, y: 0}
        this.image = document.querySelector(`img[alt=dummy`);
        this.dimensions = {x:this.image.width, y:this.image.height};
        this.speed = 400;
        this.mainHand = new Gun(EntityNames.GUN_AK47)
        this.damageTaken = []
    }

    handleMoveIdleInit(){
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    handleMoveIdleState(){
        if(isNorth() && isEast() && isWest() && isSouth()) return;

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
    }

    //ACTION STATES
    handleActionIdleInit(){
        
    }

    handleActionIdleState(frameTime){
    }

    handleActionShootInit(){
    }

    handleActionShootState(frameTime){
    }

    handleActionReloadInit(){

    }

    handleActionReloadState(frameTime){
    }

    calculateSpeed(x, y){
        let degrees = Math.atan2(y,x) * 180/Math.PI
        let velX = Math.floor(this.speed * Math.cos(degrees * Math.PI/180) * 100)/100;
        let velY = Math.floor(this.speed * Math.sin(degrees * Math.PI/180) * 100)/100;
        this.velocity.x = velX;
        this.velocity.y = velY;
    }

    handleMove(frameTime){
        this.position.x += this.velocity.x * frameTime.secondsPassed;
        this.position.y += this.velocity.y * frameTime.secondsPassed;
        this.checkMapBoundary()
    }

    changeHealth(frameTime, amount, source){
        let absolute = Math.abs(amount);
        let type = amount > 0 ? 'positive' : 'negative';
        this.damageTaken.push({amount: absolute, type: type, time: frameTime.previous, float: Math.floor(Math.random() * 30), offset: Math.floor(Math.random() * 40) * (Math.random() < .5 ? 1 : -1)})
        console.log(this.damageTaken)
    }

    drawHealthChange(frameTime, context, player){
        let float;
        let offset;
        this.damageTaken.forEach(instance => {
            if (frameTime.previous - instance.time > 1000) this.damageTaken.splice((this.damageTaken.findIndex((inst) => inst.time == instance.time)), 1);
            float =  instance.float + 70 * (frameTime.previous - instance.time)/1000
            offset = instance.offset
            context.save()
            context.font = '28px CS'
            context.fillStyle = instance.type == 'negative' ? 'red' : 'green'
            let textWidth = context.measureText(instance.amount).width
            context.fillText(instance.amount, RenderRelativeToPlayer(player, this, 'WIDTH') - textWidth/2 - offset, RenderRelativeToPlayer(player, this, 'HEIGHT') - this.dimensions.y/2 - float)
            context.restore()
        });
    }

    update(frameTime, context, player){
        //this.mainHand.update(frameTime)
        //this.moveStates[this.currentMoveState].update(frameTime)
        //this.actionStates[this.currentActionState].update(frameTime)
    }
    
    draw(frameTime, context, player){
        context.save()
        
        //draw dummy
        context.drawImage(this.image, RenderRelativeToPlayer(player, this, 'WIDTH') -this.dimensions.x/2, RenderRelativeToPlayer(player, this, 'HEIGHT') -this.dimensions.y/2)
        context.restore()

        this.drawHealthChange(frameTime, context, player)
    }
}
