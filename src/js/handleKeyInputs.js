import { GameViewport } from "../constants/GameViewport.js";
import { Control, KeyboardControls } from "./keyboard.js";
const heldKeys = new Set();

const mappedKeys = KeyboardControls.map(({keyboard}) => Object.values(keyboard)).flat();

function handleKeyDown(event){
    if (!mappedKeys.includes(event.code)) return;
    event.preventDefault();
    
    heldKeys.add(event.code)
}

function handleKeyUp(event){
    if (!mappedKeys.includes(event.code)) return;
    event.preventDefault();

    heldKeys.delete(event.code)
}

function handleMouseDown(event){
    event.preventDefault()
    let code = 'Mouse' + event.button
    if (!mappedKeys.includes(code)) return;
    
    heldKeys.add(code)
}

function handleMouseUp(event){
    event.preventDefault()
    let code = 'Mouse' + event.button
    if (!mappedKeys.includes(code)) return;
    heldKeys.delete(code)
}

function handleMouseMove(event, player){
    let ratio = Math.min(window.innerHeight / canvas.height, window.innerWidth / canvas.width)
    player.cursorPosition.x = (event.clientX - ((window.innerWidth - GameViewport.WIDTH*ratio)/2))/ratio;
    player.cursorPosition.y = (event.clientY - ((window.innerHeight - GameViewport.HEIGHT*ratio)/2))/ratio;
}

export function registerKeyboardEvents(player){
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('keyup',handleKeyUp)
    window.addEventListener('mousedown',handleMouseDown)
    window.addEventListener('mouseup',handleMouseUp)
    window.addEventListener('mousemove', (event) =>{handleMouseMove(event, player)})
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export const isNorth = () => isKeyDown(KeyboardControls[0].keyboard[Control.WALK_NORTH]);
export const isSouth = () => isKeyDown(KeyboardControls[0].keyboard[Control.WALK_SOUTH]);
export const isEast = () => isKeyDown(KeyboardControls[0].keyboard[Control.WALK_EAST]);
export const isWest = () => isKeyDown(KeyboardControls[0].keyboard[Control.WALK_WEST]);
export const isShoot = () => isKeyDown(KeyboardControls[0].keyboard[Control.SHOOT]);
export const isReload = () => isKeyDown(KeyboardControls[0].keyboard[Control.RELOAD]);

