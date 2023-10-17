import { GameViewport } from "../constants/GameViewport.js";
import { EntityNames, GunSpecs, SpriteMap } from "../constants/Sprites.js";
import { allBullets, Bullet } from "./Bullet.js";
function randStr(){return (Math.random() + 1).toString(36).substring(7);}

export class Gun{
    constructor(item){
        this.scale = 2
        this.item = item;
        this.specs = GunSpecs[this.item]
        this.name = this.specs.NAME;
        this.image = document.querySelector(`img[alt=gunsprites]`);
        this.spriteMap = SpriteMap[this.item]
        this.rangeType = this.specs.RANGETYPE;
        this.maxMags = this.specs.MAXMAGS;
        this.magSize = this.specs.MAGSIZE;
        this.ammo = this.magSize * (this.maxMags-1);
        this.curMag = this.magSize;
        this.shotDelay = this.specs.SHOTDELAY;
        this.lastShot = 0;
        this.curReload = 0;
        this.reloadTime = this.specs.RELOADDELAY;
        this.bullet = {
            bulletImage: this.specs.BULLETNAME,
            bulletCount: this.specs.BULLETCOUNT,
            speed: this.specs.BULLETSPEED,
            spread: this.specs.BULLETSPREAD,
            lifespan: this.specs.BULLETLIFESPAN,
            damage: this.specs.BULLETDAMAGE,
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
        let [originX, originY, width, height] = this.spriteMap
        context.save()
        let degrees = Math.atan2(curY - GameViewport.HEIGHT/2, curX - GameViewport.WIDTH/2) * 180 / Math.PI
        context.translate(GameViewport.WIDTH / 2, GameViewport.HEIGHT / 2);
        context.rotate(Math.PI /180 * (degrees));

        if (degrees > -90 && degrees < 90){context.scale(this.scale, this.scale);} else {context.scale(this.scale, -this.scale)}
        context.drawImage(this.image, originX, originY, width, height, width/4, -5, width, height)

        context.restore()
        this.drawUI(context)
    }

    drawUI(context){
        let [uiOriginX, uiOriginY, width, height] = [GameViewport.WIDTH - 300, GameViewport.HEIGHT - 100, GameViewport.WIDTH - 1, GameViewport.HEIGHT -1]
        context.save()
        //context.strokeStyle = 'yellow'
        //context.strokeRect(uiOriginX, uiOriginY, width, height);

        let grd = context.createLinearGradient(uiOriginX+50, uiOriginY, width+50, height);
        grd.addColorStop(1,"black");
        grd.addColorStop(0,"transparent");
        context.fillStyle = grd;
        context.fillRect(uiOriginX, uiOriginY, width, height)

        context.fillStyle = 'white'
        context.font = '34px CS'
        context.fillText(`${this.curMag} / ${this.ammo}`, uiOriginX + 100, uiOriginY + 50)
        context.restore()
    }

    shoot(posX, posY, angle){
        let [originX, originY, width, height] = this.spriteMap
        if(this.lastShot < this.shotDelay){return;}
        if (this.rangeType == 'melee'){return 'melee';}
        if (this.curMag <= 0){return 'reload';}
        //ranged
        let spread = Math.floor(Math.random() * this.bullet.spread)
        this.lastShot = 0;
        let nexBullet = 0
        for (let i = 0; i < this.bullet.bulletCount; i++){
            nexBullet -= this.bullet.spread/this.bullet.bulletCount
            let newId = randStr();
            let degrees = angle - spread - nexBullet - this.bullet.spread/2
            if (this.bullet.bulletCount > 1) degrees = angle - nexBullet - this.bullet.spread/2
            let dist = width * this.scale * 1.2
            let bulX = Math.floor(dist * Math.cos(degrees * Math.PI/180));
            let bulY = Math.floor(dist * Math.sin(degrees * Math.PI/180));
            allBullets.set(newId, new Bullet(newId, this.bullet.bulletImage, posX + bulX, posY + bulY, degrees, this.bullet.speed,  this.bullet.lifespan))
        };
        this.curMag -= 1
    }

    reload(frameTime){
        if (this.curMag == this.magSize){return true;}
        if (this.curReload < this.reloadTime){
            this.curReload += frameTime.secondsPassed * 1000;
            return false;
        }
        this.curReload = 0;
        this.ammo += this.curMag;
        if (this.ammo - this.magSize < 0){
            this.curMag = this.ammo;
            this.ammo = 0;
        } else {
            this.ammo -= this.magSize;
            this.curMag = this.magSize
        }
        return true;
    }

    checkBullets(){
        if (this.ammo <= 0) return false;
        return true;
    }

    checkMag(){
        if (this.curMag == 0) return false;
        return true;
    }
}