import { GameViewport } from "../constants/GameViewport.js";
import { allBullets } from "../entities/Bullet.js";
import { Gun } from "../entities/Guns.js";
import { MainPlayer } from "../entities/MainPlayer.js";
import { GameMap } from "../entities/Map.js";
import { Player } from "../entities/Player.js";
import { Tile } from "../entities/Tile.js"
import { registerKeyboardEvents } from "./handleKeyInputs.js";
import { KeyboardControls } from "./keyboard.js";



const gameMap = new GameMap(-1000, -1000, 1000, 1000)
const player = new MainPlayer(gameMap, 0, 0, 100, 100, 0, 0)

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
    player,
]


function arrowFunctionality(){
    let guns = document.querySelectorAll('.gun')
    guns[0].addEventListener('click', () => {player.mainHand = new Gun('knife', 'melee', 3, 30, 200, 'bullet', 0, 0, 0, 0)})
    guns[1].addEventListener('click', () => {player.mainHand = new Gun('ak47', 'range', 3, 30, 150, 'bullet', 1, 20, 4, 400)})
    guns[2].addEventListener('click', () => {player.mainHand = new Gun('flamethrower', 'range', 3, 100, 30, 'flame', 5, 10, 20, 300)})
    let actions = document.querySelectorAll('.action')

}

window.addEventListener('load', () => {
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')
    canvas.width  = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;
    
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
        bullet.update();
        bullet.draw(frameTime,  context, player);
    });
}