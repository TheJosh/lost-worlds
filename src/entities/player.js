function Player(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.rot = 0;
    this.weapon = 2;

    var fireDelay = 0;

    var img = document.createElement('img');
    img.src = 'player.png';

    this.render = function(ctx) {
        ctx.translate(player.x, player.y);
        ctx.rotate(player.rot);

        ctx.drawImage(
            img,
            this.weapon * 52, 0, 52, 31,
            -HALF_PLAYER_SIZE - 22, -HALF_PLAYER_SIZE, 52, 31
        );

        ctx.rotate(-player.rot);
        ctx.translate(-player.x, -player.y);
    };

    this.update = function(delta) {
        if (fireDelay > 0) fireDelay -= delta;
    };

    this.fire = function(delta) {
        if (fireDelay > 0) return;
        bullets.push(
            new Bullet(player.x, player.y, player.rot + Math_PI, 500)
        );
        fireDelay = 0.2;
    };
}
