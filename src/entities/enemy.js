function Enemy(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.dirX = 0;
    this.dirY = 100;
    this.alive = true;
    this.hitDistSq = 25 * 25;

    var health = 10;

    this.render = function(ctx) {
        ctx.fillStyle = '#00f';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math_PI);
        ctx.fill();
    };

    this.update = function(delta) {
        this.y += this.dirY * delta;
        checkCollide(this, 10, function(axis, sign) {
            this.dirY = -this.dirY;
        });
    };

    this.hitPlayer = function() {
        console.log('ded');
    };

    this.takeDamage = function(bullet) {
        health -= bullet.strength;
        if (health < 0) this.alive = false;
    };
}
