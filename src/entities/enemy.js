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
    ctx.fillStyle = '#00f';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math_PI);
    ctx.fill();
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
