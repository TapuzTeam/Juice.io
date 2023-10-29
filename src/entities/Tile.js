import { GameViewport, RenderRelativeToPlayer } from "../constants/GameViewport.js";

export class Tile {
    constructor(posX, posY, color){
        this.width = 100;
        this.height = 100;
        this.position = {x:posX, y:posY};
        this.color = color;
    }
    
    draw(frameTime, context, player){
        this.position.x *= this.width;
        this.position.y *= this.width;
        
        //if (this.position.x - Math.ceil(player.position.x/100) > 8 || this.position.y - Math.ceil(player.position.y/100) > 5){return;}
        context.fillStyle = this.color;
    
        context.fillRect(RenderRelativeToPlayer(player, this, 'WIDTH'), RenderRelativeToPlayer(player, this, 'HEIGHT'), this.width, this.height);
        
        context.strokeStyle = 'black'
        context.strokeRect(RenderRelativeToPlayer(player, this, 'WIDTH'), RenderRelativeToPlayer(player, this, 'HEIGHT'), this.width, this.height);
        
        this.position.x /= this.width;
        this.position.y /= this.width;
    }

    update(frameTime, context, player){
        
    }
}