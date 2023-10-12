import { GameViewport } from "../constants/GameViewport.js";
import { allBullets } from "../entities/Bullet.js";
import { Gun } from "../entities/Guns.js";
import { GameMap } from "../entities/Map.js";
import { Player } from "../entities/Player.js";
import { Tile } from "../entities/Tile.js"
import { handleKeyboardInput, KeyboardInputs } from "./keyboard.js";


const gameMap = new GameMap(-1000, -1000, 1000, 1000)
const player = new Player(gameMap)
const pressedKeys = ['ass']



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
    let arrows = document.querySelectorAll('.arrow')
    arrows[0].addEventListener('click',()=>{player.velocity.y -= 1})
    arrows[1].addEventListener('click',()=>{player.velocity.y += 1})
    arrows[2].addEventListener('click',()=>{player.velocity.x += 1})
    arrows[3].addEventListener('click',()=>{player.velocity.x -= 1})

    let guns = document.querySelectorAll('.gun')
    guns[0].addEventListener('click', () => {player.mainHand = new Gun('knife', 'melee', 3, 30, 'bullet', 0, 0, 0, 0)})
    guns[1].addEventListener('click', () => {player.mainHand = new Gun('ak47', 'range', 3, 30, 'bullet', 1, 20, 4, 400)})
    guns[2].addEventListener('click', () => {player.mainHand = new Gun('flamethrower', 'range', 3, 30, 'flame', 5, 10, 20, 300)})
    let actions = document.querySelectorAll('.action')
    actions[0].addEventListener('click', () => {player.shoot()})

}

window.addEventListener('load', () => {
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')
    canvas.width  = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;
    canvas.addEventListener('mousemove', (event) => {
        let ratio = Math.min(window.innerHeight / canvas.height, window.innerWidth / canvas.width)
        player.cursorPosition.x = (event.clientX - ((window.innerWidth - GameViewport.WIDTH*ratio)/2))/ratio;
        player.cursorPosition.y = (event.clientY - ((window.innerHeight - GameViewport.HEIGHT*ratio)/2))/ratio;
    });
    canvas.addEventListener('mousedown', (event) => {
        event.preventDefault()
        let code = 'Mouse' + event.button
        if (!pressedKeys.includes(code)){
            pressedKeys.push(code)
        }
    });
    canvas.addEventListener('mouseup', (event) => {
        event.preventDefault()
        let code = 'Mouse' + event.button
        if (pressedKeys.indexOf(code) > -1) {
            pressedKeys.splice(pressedKeys.indexOf(code), 1); 
        }
    });

    
    document.addEventListener('keydown', (event) => {
        if (!Object.values(KeyboardInputs).includes(event.code) || pressedKeys.includes(event.code)){return;}
        event.preventDefault();
        pressedKeys.push(event.code)
    })

    document.addEventListener('keyup', (event) => {
        if (!Object.values(KeyboardInputs).includes(event.code) || !pressedKeys.includes(event.code)){return;}
        event.preventDefault();
        pressedKeys.splice(pressedKeys.indexOf(event.code), 1);
    })
    

    canvas.addEventListener('contextmenu', (event) => {event.preventDefault()})


    arrowFunctionality()
    window.requestAnimationFrame(frame)    
})

function frame(){
    const canvas = /** @type {HTMLCanvasElement} */ document.querySelector('canvas')
    const context = canvas.getContext('2d')

    handleKeyboardInput(player, pressedKeys);
    
    entities.forEach(entity => {
        entity.update(player);
    });

    entities.forEach(entity => {
        entity.draw(context, player);
    });

    allBullets.forEach(bullet => {
        bullet.update();
        bullet.draw(context, player);
    });


    window.requestAnimationFrame(frame);
}