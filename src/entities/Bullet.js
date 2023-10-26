import { Entities, InteractionLayers } from "../constants/Entities.js";
import { GameViewport, RenderRelativeToPlayer } from "../constants/GameViewport.js";
import { checkCollision } from "../js/collisions.js";

export const allBullets = new Map()

export class Bullet{
    constructor(id, shooterID, bulletName, x, y, angle, velocity, lifespan){
        this.image = document.querySelector(`img[alt="${bulletName}"`);
        this.id = id;
        this.shooterID = shooterID;
        this.entityType = Entities.BULLET
        this.colliders = InteractionLayers[this.entityType]
        this.position = {x: x, y: y, initialX: x, initialY: y}
        this.angle = angle;
        this.velocity = velocity;
        this.lifespan = lifespan;

        this.toDraw = true;
    }

    update(frameTime, context, player){
        let changeX = Math.floor(this.position.x - this.position.initialX);
        let changeY = Math.floor(this.position.y - this.position.initialY);
        let travelled = Math.sqrt(changeX*changeX + changeY*changeY);
        if (travelled >= this.lifespan) this.delete();
        this.position.x += Math.floor(this.velocity * Math.cos(this.angle * Math.PI/180) * frameTime.secondsPassed * 100)/100;
        this.position.y += Math.floor(this.velocity * Math.sin(this.angle * Math.PI/180) * frameTime.secondsPassed * 100)/100;
    }

    draw(frameTime, context, player){
        if (!this.toDraw) return;
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
        context.fillStyle = 'black'
        context.restore()
    }

    checkCollision(entity){
        if (!this.colliders.includes(entity.entityType)) return;
        if (this.shooterID == entity.id) return;
        if (!checkCollision(this, entity)) return;
        this.toDraw = false;
        
        this.delete()
    }

    delete(){
        allBullets.delete(this.id)
    }
}