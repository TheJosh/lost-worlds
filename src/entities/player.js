function Player(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.rot = 0;

    this.render = function(ctx) {
        ctx.translate(player.x, player.y);
        ctx.rotate(player.rot);

        ctx.fillStyle = '#f00';
        ctx.fillRect(-HALF_PLAYER_SIZE, -HALF_PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
        ctx.fillRect(-HALF_PLAYER_SIZE - 5, -3, 6, 6);

        ctx.rotate(-player.rot);
        ctx.translate(-player.x, -player.y);
    };

    this.fire = function() {
        bullets.push(
            new Bullet(player.x, player.y, player.rot + Math_PI, 500)
        );
    }
}
