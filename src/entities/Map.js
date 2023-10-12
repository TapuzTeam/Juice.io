import { GameViewport } from "../constants/GameViewport.js";

export class GameMap{
    constructor(minX, minY, maxX, maxY){
        this.boundaries = {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY,
        }
    }

    draw(context){
        context.fillStyle = 'black'
        context.fillRect(0,0, GameViewport.WIDTH, GameViewport.HEIGHT);

        //const ptrn = context.createPattern(sand, 'repeat');
        //context.fillStyle = ptrn;
    }

    update(){
        
    }
}