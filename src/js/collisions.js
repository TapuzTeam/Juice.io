import { isRectCollide } from "./collisions/index.js"

export function toRect(entity){
  return {
    x: entity.position.x, 
    y: entity.position.y, 
    w: entity.image.width, 
    h: entity.image.height, 
    angle: (entity.angle || 0),
  }
}

export function checkCollision(entity1, entity2){
  return isRectCollide(toRect(entity1), toRect(entity2))
}
