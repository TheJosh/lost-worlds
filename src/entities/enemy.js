function Enemy(x, y) {
    this.x = x;
    this.y = y;

    this.render = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    };
}
