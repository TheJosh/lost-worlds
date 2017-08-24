function BlackHole(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;

    this.dist = 0;
    this.strength = 0;

    this.render = function(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        ctx.fill();
    };
}
