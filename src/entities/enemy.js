var bug = new Image();
bug.src = 'bug.gif';


function Enemy(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.dirX = 0;
    this.dirY = 100;
    this.alive = true;
    this.hitDistSq = 25 * 25;
    this.health = 10;
    this.damage = 5;
};


Enemy.prototype.render = function(ctx) {
    if (this.alive == false) {
        return;
    }

    ctx.translate(this.x, this.y);
    if (this.dirY > 0) ctx.rotate(Math_PI);
    ctx.drawImage(bug, -9, -11);
    if (this.dirY > 0) ctx.rotate(-Math_PI);
    ctx.translate(-this.x, -this.y);
};


Enemy.prototype.update = function(delta) {
    this.y += this.dirY * delta;
    checkCollide(this, 10, function(axis, sign) {
        this.dirY = -this.dirY;
    });
};


Enemy.prototype.takeDamage = function(bullet) {
    this.health -= bullet.strength;

    if (this.health < 0) {
        this.alive = false;
    }

    this.x += bullet.dirX * bullet.strength / 300;
    this.y += bullet.dirY * bullet.strength / 300;
};
