import { GameViewport } from "../constants/GameViewport.js";
import { allBullets, Bullet } from "./Bullet.js";
function randStr(){return (Math.random() + 1).toString(36).substring(7);}

export class Gun{
    constructor(name, rangeType, maxMags, magSize, shotDelay, bulletName, bulletCount, bulletSpeed, bulletSpread, bulletLifespan){
        this.name = name;
        this.image = document.querySelector(`img[alt=${this.name}]`)
        this.rangeType = rangeType;
        this.maxMags = maxMags;
        this.magSize = magSize;
        this.ammo = magSize * (maxMags-1);
        this.curMag = magSize;
        this.shotDelay = shotDelay;
        this.lastShot = 0;
        this.curReload = 0;
        this.reloadTime = 1500;
        this.bullet = {
            bulletImage: bulletName,
            bulletCount: bulletCount,
            speed: bulletSpeed,
            spread: bulletSpread,
            lifespan: bulletLifespan,
            damage: 1,
        }
        this.firedBullets = {
            direction: 0,
            position: {x:0, y:0}
        }
    }
    update(frameTime){
        this.lastShot += frameTime.secondsPassed * 1000
    }

    draw(frameTime, context, curX, curY){
        context.save()
        let degrees = Math.atan2(curY - GameViewport.HEIGHT/2, curX - GameViewport.WIDTH/2) * 180 / Math.PI
        context.translate(GameViewport.WIDTH / 2, GameViewport.HEIGHT / 2);
        context.rotate(Math.PI /180 * (degrees));

        if (degrees > -90 && degrees < 90){context.scale(1, 1);} else {context.scale(1, -1)}
        context.scale(1,1)
        context.drawImage(this.image, this.image.width/2, 0)

        context.restore()
    }


    shoot(posX, posY, angle){
        if(this.lastShot < this.shotDelay){return;}
        if (this.rangeType == 'melee'){return 'melee';}
        if (this.curMag <= 0){return 'reload';}
        //ranged
        this.lastShot = 0;
        for (let i = 0; i < this.bullet.bulletCount; i++){
            let newId = randStr();
            let spread = Math.floor(Math.random() * this.bullet.spread)
            let degrees = angle - spread + this.bullet.spread/2
            let dist = this.image.width * 1.5
            let bulX = Math.floor(dist * Math.cos(degrees * Math.PI/180));
            let bulY = Math.floor(dist * Math.sin(degrees * Math.PI/180));
            allBullets.set(newId, new Bullet(newId, this.bullet.bulletImage, posX + bulX, posY + bulY, degrees, this.bullet.speed,  this.bullet.lifespan))
        };
        this.curMag -= 1
    }

    reload(frameTime){
        if (this.curMag == this.magSize){return;}
        if (this.curReload < this.reloadTime){
            this.curReload += frameTime.secondsPassed * 1000;
            return false;
        }
        this.curReload = 0;
        this.ammo -= this.magSize;
        this.curMag = this.magSize
        return true;
    }

    checkBullets(){
        if (this.ammo == 0) return false;
        return true;
    }

    checkMag(){
        if (this.curMag == 0) return false;
        return true;
    }
}