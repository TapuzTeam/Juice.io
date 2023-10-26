export const Entities = {
    PLAYER: 'player',
    ENEMY: 'ENEMY',
    BULLET: 'bullet',
    TILE: 'tile',
    WALL: 'wall',
}

export const InteractionLayers = {
    [Entities.PLAYER]: [Entities.BULLET, Entities.WALL],
    [Entities.ENEMY]: [Entities.BULLET, Entities.WALL],
    [Entities.BULLET]: [Entities.PLAYER, Entities.WALL, Entities.ENEMY],
    [Entities.WALL]: [Entities.BULLET, Entities.PLAYER, Entities.ENEMY],
    [Entities.TILE]: []
}