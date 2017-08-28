function Bullet(x, y, rot, vel) {
    this.x = x;
    this.y = y;
    this.dir = getRotVel(rot, vel);
    this.alive = true;
    this.strength = 1.0;

    var hitCount = 0;

    this.render = function(ctx) {
        ctx.globalAlpha = this.strength;
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    };

    this.update = function(delta) {
        this.x += this.dir.x * delta;
        this.y += this.dir.y * delta;

        if (this.x < 0 || this.y < 0 || this.x > 256 * universe.tileSize || this.y > 64 * universe.tileSize) {
            this.alive = false;
        }

        checkCollideTiny(this, function() {
            if (hitCount++ > 3) this.alive = false;
            if (Math_random() > 0.7) this.alive = false;

            rot += getRandom(0, Math_PI * 2);
            this.dir = getRotVel(rot, vel);
            this.strength -= 0.1;
        });

        this.strength -= 0.01;
        if (this.strength < 0.01) {
            this.alive = false;
        }
    };
}
