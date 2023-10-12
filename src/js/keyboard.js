export const KeyboardInputs = {
    WALK_UP: 'KeyW',
    WALK_DOWN: 'KeyS',
    WALK_LEFT: 'KeyA',
    WALK_RIGHT: 'KeyD',
    SHOOT: 'Mouse1',
}

export function handleKeyboardInput(player, pressedKeys){
    player.velocity.x = 0;
    player.velocity.y = 0;
    pressedKeys.forEach(key => {
        switch (key) {
            case 'KeyW':
                player.velocity.y = -5
                break;
            case 'KeyS':
                player.velocity.y = 5
                break;
            case 'KeyA':
                player.velocity.x = -5
                break;
            case 'KeyD':
                player.velocity.x = 5
                break;
            case 'Mouse0':
                    player.shoot();
                    break;
            default:
                break;
        }
    });
}