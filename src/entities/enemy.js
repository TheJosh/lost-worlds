function Enemy(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;

    this.hitDistSq = 25 * 25;

    this.render = function(ctx) {
        ctx.fillStyle = '#00f';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    };

    var yMove = 100.0;
    this.update = function(delta) {
        this.y += yMove * delta;
        checkCollide(this, function(axis, sign) {
            yMove = -yMove;
        });
    };

    this.hitPlayer = function() {
        console.log('ded');
    };
}
