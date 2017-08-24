function Bullet(x, y, rot, vel) {
    this.x = x;
    this.y = y;
    this.dirX = Math_cos(rot) * vel;
    this.dirY = Math_sin(rot) * vel;
    this.alive = true;

    this.render = function(ctx) {
        ctx.fillStyle = '#e11';
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    };

    this.update = function(delta) {
        if (! this.alive) return;

        this.x += this.dirX * delta;
        this.y += this.dirY * delta;

        if (this.x < 0 || this.y < 0 || this.x > 256 * universe.tileSize || this.y > 64 * universe.tileSize) {
            this.alive = false;
        }

        checkCollideTiny(this, function() {
            this.alive = false;
        });
    };
}
