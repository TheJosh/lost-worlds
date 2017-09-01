var guns = new Image();
guns.src = 'guns.gif';


function Gun(x, y, type) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.type = type;
    this.alive = true;
    this.hitDistSq = 25 * 25;
}

Gun.prototype.render = function(ctx) {
    ctx.drawImage(
        guns,
        this.type * 18, 0, 18, 8,
        this.x, this.y, 18*2, 8*2
    );
};

Gun.prototype.touchPlayer = function() {
    this.alive = false;

    overlayWords.push({ x: player.x - 10, y: player.y - 30, lift: 0, text: weapons[this.type].name });

    if (player.availWeapons.indexOf(this.type) === -1) {
        player.availWeapons.push(this.type);
    }
};