function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.dirX = 0;
    this.dirY = 0;
    this.alive = true;

    this.render = function(ctx) {
        ctx.fillStyle = '#e11';
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    };

    this.update = function(delta) {
        if (! this.alive) return;

        this.x += this.dirX * delta;
        this.y += this.dirY * delta;

        if (this.x < 0 || this.y < 0) {
            this.alive = false;
        }

        // TODO: Also check far edge

    };
}


function addBullet(x, y, rot, vel) {
    var bul = new Bullet(x, y);
    bul.dirX = Math_cos(rot) * vel;
    bul.dirY = Math_sin(rot) * vel;
    bullets.push(bul);
}
