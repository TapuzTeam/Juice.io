export const Control = {
    WALK_NORTH: 'walkNorth',
    WALK_SOUTH: 'walkSouth',
    WALK_WEST: 'walkWest',
    WALK_EAST: 'walkEast',
    SHOOT: 'actionPrimary',
    RELOAD: 'actionReload',
}

export const KeyboardControls = [
    {
        keyboard: {
            [Control.WALK_NORTH]: 'KeyW',
            [Control.WALK_SOUTH]: 'KeyS',
            [Control.WALK_WEST]: 'KeyA',
            [Control.WALK_EAST]: 'KeyD',
            [Control.SHOOT]: 'Mouse0',
            [Control.RELOAD]: 'KeyR',
        }
    }
]