import { GameViewport } from "../constants/GameViewport.js";
import { EntityNames } from "../constants/Sprites.js";
import { allBullets } from "../entities/Bullet.js";
import { Dummy } from "../entities/Dummy.js";
import { Gun } from "../entities/Guns.js";
import { MainPlayer } from "../entities/MainPlayer.js";
import { GameMap } from "../entities/Map.js";
import { Tile } from "../entities/Tile.js"
import { registerKeyboardEvents } from "./handleKeyInputs.js";
import { KeyboardControls } from "./keyboard.js";



const gameMap = new GameMap(-1000, -1000, 1000, 1000)
const player = new MainPlayer(gameMap, 0, 0, 0, 0)
const dummy1 = new Dummy(gameMap, -200, -200, 0, 0)


var frameTime = {
    previous: 0,
    secondsPassed: 0,
};

var tiles = [];
function createTiles(){
    tiles = []
    let color;
    for (let x = -10; x<10; x++){
        for (let y = -10; y<10; y++){
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
const entities = [
    gameMap,
    ...tiles,
    ...allBullets,
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
    window.requestAnimationFrame(frame);
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')


    frameTime = {
        secondsPassed: Math.floor((time - frameTime.previous)*1000)/1000 / 1000,
        previous: time,
    }

    entities.forEach(entity => {
        entity.update(frameTime, context, player);
    });

    entities.forEach(entity => {
        entity.draw(frameTime, context, player);
    });

    allBullets.forEach(bullet => {
        bullet.update(frameTime);
        bullet.draw(frameTime,  context, player);
    });
}