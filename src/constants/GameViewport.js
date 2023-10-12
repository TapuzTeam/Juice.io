export const GameViewport = {
    WIDTH: 384 * 4,
    HEIGHT: 224 * 4,
}

export function RenderRelativeToPlayer(player, entity, mode){
    let playerPos;
    let entityPos;
    if (mode == 'WIDTH'){
        playerPos = player.position.x;
        entityPos = entity.position.x;
    } else if (mode == 'HEIGHT'){
        playerPos = player.position.y;
        entityPos = entity.position.y;
    }
    return (entityPos - playerPos)+ GameViewport[mode]/2
}