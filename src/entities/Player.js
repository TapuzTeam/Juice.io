import { GameViewport } from "../constants/GameViewport.js";
import { PlayerStates } from "../constants/PlayerStates.js";
import { allBullets } from "./Bullet.js";
import { Gun } from "./Guns.js";

export class Player {
    constructor(gameMap){
        this.position = {x: 0, y: 0};
        this.dimensions = {x:100, y:100};
        this.velocity = {x:0, y:0};
        this.gameMap = gameMap;
        this.cursorPosition = {x:0, y:0};
        this.mainHand = new Gun('knife', 'melee', 3, 30, 'bullet', 0, 0, 0)
        this.walkStates = [ PlayerStates.WALK_NORTH, PlayerStates.WALK_SOUTH,
            PlayerStates.WALK_EAST, PlayerStates.WALK_WEST, PlayerStates.WALK_NORTHEAST,
            PlayerStates.WALK_NORTHWEST, PlayerStates.WALK_SOUTEAST, PlayerStates.WALK_SOUTHWEST];
    }

    

    draw(context){
        context.save()
        context.fillStyle = 'yellow'
        context.fillRect((GameViewport.WIDTH - this.dimensions.x)/2, (GameViewport.HEIGHT - this.dimensions.x)/2, this.dimensions.x, this.dimensions.y);

        //draw cursor
        context.beginPath();
        context.strokeStyle = 'black'
        context.moveTo(GameViewport.WIDTH/2, GameViewport.HEIGHT/2)
        context.lineTo(this.cursorPosition.x, this.cursorPosition.y)
        context.stroke()

        let degrees = Math.atan2(this.cursorPosition.y - GameViewport.HEIGHT/2, this.cursorPosition.x - GameViewport.WIDTH/2) * 180 / Math.PI
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(Math.PI /180 * (degrees));

        if (degrees > -90 && degrees < 90){context.scale(1, 1);} else {context.scale(1, -1)}
        context.scale(1,1)
        context.drawImage(this.mainHand.image, this.mainHand.image.width/2, 0)

        context.restore()
    }

    update(){
        this.handleMove()
    }

    handleMove(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.checkMapBoundary()
        
    }
    
    checkMapBoundary(){
        if (this.position.x - this.dimensions.x/2 <= this.gameMap.boundaries.minX){this.position.x = this.gameMap.boundaries.minX + this.dimensions.x/2}
        if (this.position.x + this.dimensions.x/2 >= this.gameMap.boundaries.maxX){this.position.x = this.gameMap.boundaries.maxX - this.dimensions.x/2}
        
        if (this.position.y - this.dimensions.y/2 <= this.gameMap.boundaries.minY){this.position.y = this.gameMap.boundaries.minY + this.dimensions.y/2}
        if (this.position.y + this.dimensions.y/2 >= this.gameMap.boundaries.maxY){this.position.y = this.gameMap.boundaries.maxY - this.dimensions.y/2}
    }
    
    equip(gun){
        this.mainHand = gun;
    }

    shoot(context){
        this.mainHand.shoot(this)
    }
}

    
