function Bullet(x, y, rot, vel) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.vel = vel;
    this.dir = getRotVel(rot, vel);
    this.alive = true;
    this.strength = 1.0;
    this.hitCount = 0;
}

    Bullet.prototype.render = function(ctx) {
        ctx.globalAlpha = this.strength;
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    };

    Bullet.prototype.update = function(delta) {
        this.x += this.dir.x * delta;
        this.y += this.dir.y * delta;

        if (this.x < 0 || this.y < 0 || this.x > universe.mapWidth * universe.tileSize || this.y > universe.mapHeight * universe.tileSize) {
            this.alive = false;
        }

        checkCollideTiny(this, function() {
            if (this.hitCount++ > 3) this.alive = false;
            if (Math_random() > 0.7) this.alive = false;

            this.rot += getRandom(0, Math_PI * 2);
            this.dir = getRotVel(this.rot, this.vel);
            this.strength -= 0.1;
        });

        this.strength -= 0.01;
        if (this.strength < 0.01) {
            this.alive = false;
        }
    };
