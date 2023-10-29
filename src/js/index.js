import { GameViewport } from "../constants/GameViewport.js";
import { EntityNames } from "../constants/Sprites.js";
import { allBullets, Bullet } from "../entities/Bullet.js";
import { Dummy } from "../entities/Dummy.js";
import { Gun } from "../entities/Guns.js";
import { MainPlayer } from "../entities/MainPlayer.js";
import { GameMap } from "../entities/Map.js";
import { Tile } from "../entities/Tile.js"
import { registerKeyboardEvents } from "./handleKeyInputs.js";
import { KeyboardControls } from "./keyboard.js";
import { isRectCollide } from './collisions/index.js'
import { checkCollision } from "./collisions.js";

export function randStr(){return (Math.random() + 1).toString(36).substring(7);}


const rects = [
  {x:200, y: 200, w:100, h:100, angle: 0},
  {x:299, y: 200, w:100, h:100, angle: 0},
];

const isColliding = isRectCollide(...rects);

const gameMap = new GameMap(-1000, -1000, 1000, 1000)
const player = new MainPlayer(gameMap, 0, 0, 0, 0)
const dummy1 = new Dummy(gameMap, -200, -200, 0, 0)


var frameTime = {
    previous: 0,
    secondsPassed: 0,
};

var tiles = [gameMap];
function createTiles(){
    tiles = [gameMap]
    let color;
    let tileRange = (gameMap.boundaries.maxX-gameMap.boundaries.minX)/(new Tile().width)
    for (let x = -tileRange/2; x<tileRange/2; x++){
        for (let y = -tileRange/2; y<tileRange/2; y++){
            switch (true) {
                case x >= 0 && y >= 0:
                    color = 'red'
                    break;
                case x < 0 && y >= 0:
                    color = 'blue'
                    break;
                case x < 0 && y < 0:
                    color = 'green'
                    break;
                case x >= 0 && y < 0:
                    color = 'brown'
                    break;
              }
            tiles.push(new Tile(x,y,color))
        }
    }
}
createTiles()
var entities = [
    dummy1,
    player,
]


function arrowFunctionality(){
    let guns = document.querySelectorAll('.gun')
    guns[0].addEventListener('click', () => {player.mainHand = new Gun(EntityNames.GUN_AK47)})
    guns[1].addEventListener('click', () => {player.mainHand = new Gun(EntityNames.GUN_GRENADE_LAUNCHER)})
    guns[2].addEventListener('click', () => {player.mainHand = new Gun(EntityNames.GUN_GALLO_SA12)})
    let actions = document.querySelectorAll('.action')

}

window.addEventListener('load', () => {
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')
    canvas.width  = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;
    context.imageSmoothingEnabled = false;
    registerKeyboardEvents(player)
    
    canvas.addEventListener('contextmenu', (event) => {event.preventDefault()})
    
    arrowFunctionality()
    window.requestAnimationFrame(frame)
})

function frame(time){
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')
    entities = [
        ...Array.from(allBullets.values()),
        dummy1,
        player,
    ]

    frameTime = {
        secondsPassed: Math.floor((time - frameTime.previous)*1000)/1000 / 1000,
        previous: time,
    }


    entities.forEach(entity => {
        if (entity instanceof Bullet) {
            entities.forEach((nonBulletEntity) =>{
                if (nonBulletEntity instanceof Bullet) return;
                entity.checkCollision(nonBulletEntity, frameTime)
        })}
        entity.update(frameTime, context, player);
    });


    tiles.forEach(tile => {
        tile.draw(frameTime, context, player);
    });
    
    entities.forEach(entity => {
        entity.draw(frameTime, context, player);
    });

    
    window.requestAnimationFrame(frame);
}