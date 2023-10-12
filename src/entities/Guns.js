import { GameViewport } from "../constants/GameViewport.js";
import { allBullets, Bullet } from "./Bullet.js";
function randStr(){return (Math.random() + 1).toString(36).substring(7);}

export class Gun{
    constructor(name, rangeType, maxMags, magSize, bulletName, bulletCount, bulletSpeed, bulletSpread, bulletLifespan){
        this.name = name;
        this.image = document.querySelector(`img[alt=${this.name}]`)
        this.rangeType = rangeType;
        this.maxMags = maxMags;
        this.magSize = magSize;
        this.ammo = maxMags * magSize;
        this.bullet = {
            bulletImage: bulletName,
            bulletCount: bulletCount,
            speed: bulletSpeed,
            spread: bulletSpread,
            lifespan: bulletLifespan,
        }
        this.firedBullets = {
            direction: 0,
            position: {x:0, y:0}
        }
    }


    shoot(player){
        if (this.rangeType == 'melee'){return;}
        for (let i = 0; i < this.bullet.bulletCount; i++){
            let spread = Math.floor(Math.random() * this.bullet.spread)
            let degrees = Math.atan2(player.cursorPosition.y - GameViewport.HEIGHT/2, player.cursorPosition.x - GameViewport.WIDTH/2) * 180 / Math.PI - spread + this.bullet.spread/2
            let dist = this.image.width * 1.5
            let bulX = Math.floor(dist * Math.cos(degrees * Math.PI/180));
            let bulY = Math.floor(dist * Math.sin(degrees * Math.PI/180));
            let newId = randStr();
            allBullets.set(newId, new Bullet(newId, this.bullet.bulletImage, player.position.x + bulX, player.position.y + bulY, degrees, this.bullet.speed,  this.bullet.lifespan))
            this.ammo -= 1
            console.log(this.bullet.bulletCount)
        };
    }
}