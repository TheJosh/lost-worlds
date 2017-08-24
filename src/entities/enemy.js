function Enemy(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;

    this.render = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    };
}
