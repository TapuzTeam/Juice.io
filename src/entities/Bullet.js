import { GameViewport, RenderRelativeToPlayer } from "../constants/GameViewport.js";

export const allBullets = new Map()

export class Bullet{
    constructor(id, bulletName, x, y, angle, velocity, lifespan){
        this.image = document.querySelector(`img[alt="${bulletName}"`);
        this.id = id;
        this.position = {x: x, y: y, initialX: x, initialY: y}
        this.angle = angle;
        this.velocity = velocity;
        this.lifespan = lifespan;
    }

    update(player){
        let changeX = Math.floor(this.position.x - this.position.initialX);
        let changeY = Math.floor(this.position.y - this.position.initialY);
        let travelled = Math.sqrt(changeX*changeX + changeY*changeY);
        if (travelled >= this.lifespan){allBullets.delete(this.id)};
        this.position.x += this.velocity * Math.cos(this.angle * Math.PI/180);
        this.position.y += this.velocity * Math.sin(this.angle * Math.PI/180);
    }

    draw(context, player){
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
}