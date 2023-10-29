import { Entities, InteractionLayers } from "../constants/Entities.js";
import { GameViewport, RenderRelativeToPlayer } from "../constants/GameViewport.js";
import { GunSpecs } from "../constants/Sprites.js";
import { checkCollision } from "../js/collisions.js";

export const allBullets = new Map()

export class Bullet{
    constructor(id, shooterID, x, y, angle, gun){
        this.id = id;
        this.shooterID = shooterID;
        this.entityType = Entities.BULLET;
        this.colliders = InteractionLayers[this.entityType];
        this.bulletOf = gun;
        this.gunSpecs = GunSpecs[this.bulletOf];
        this.image = document.querySelector(`img[alt="${this.gunSpecs.BULLETNAME}"`);
        this.position = {x: x, y: y, initialX: x, initialY: y}
        this.angle = angle;
        this.velocity = this.gunSpecs.BULLETSPEED;
        this.lifespan = this.gunSpecs.BULLETLIFESPAN;
        this.damage = this.gunSpecs.BULLETDAMAGE;
        this.toDelete = false;
    }

    update(frameTime, context, player){
        if (this.toDelete) return;
        let changeX = Math.floor(this.position.x - this.position.initialX);
        let changeY = Math.floor(this.position.y - this.position.initialY);
        let travelled = Math.sqrt(changeX*changeX + changeY*changeY);
        if (travelled >= this.lifespan) this.delete();
        this.position.x += Math.floor(this.velocity * Math.cos(this.angle * Math.PI/180) * frameTime.secondsPassed * 100)/100;
        this.position.y += Math.floor(this.velocity * Math.sin(this.angle * Math.PI/180) * frameTime.secondsPassed * 100)/100;
    }

    draw(frameTime, context, player){
        if (this.toDelete) return;
        let relativePos = {
            x: RenderRelativeToPlayer(player, this, 'WIDTH'),
            y: RenderRelativeToPlayer(player, this, 'HEIGHT'),
        }
        context.save()

        context.translate(relativePos.x, relativePos.y, this.width, this.height);
        context.rotate(Math.PI /180 * (this.angle));
        if (this.angle > -90 && this.angle < 90){context.scale(1, 1);} else {context.scale(1, -1)}
        context.translate(-relativePos.x, -relativePos.y, this.width, this.height);
        context.drawImage(this.image, relativePos.x, relativePos.y);
        context.fillStyle = 'black';
        context.restore();
    }

    checkCollision(entity, frameTime){
        if (!this.colliders.includes(entity.entityType)) return;
        if (this.shooterID == entity.id) return;
        if (!checkCollision(this, entity)) return;
        
        if (typeof entity.changeHealth === 'function'){
            entity.changeHealth(frameTime, -this.damage)
        }

        this.toDelete = true;
        this.delete()
    }

    delete(){
        allBullets.delete(this.id)
    }
}