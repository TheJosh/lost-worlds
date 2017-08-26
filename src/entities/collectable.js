function Collectable(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.alive = true;
    this.hitDistSq = 25 * 25;

    this.render = function(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math_PI);
        ctx.fill();
    };

    this.touchPlayer = function() {
        this.alive = false;
    };
}
