var guns = new Image();
guns.src = 'g.gif';


function Gun(x, y, type) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.type = type;
    this.alive = true;
    this.hitDistSq = 40 * 40;
}

Gun.prototype.render = function(ctx) {
    ctx.drawImage(
        guns,
        this.type * 18, 0, 18, 8,
        this.x-18, this.y-18, 18*2, 8*2
    );
};

Gun.prototype.touchPlayer = function() {
    this.alive = false;

    overlayWords.push(new WordGrowCenter(weapons[this.type].name.toUpperCase(), Color_White));

    if (player.availWeapons.indexOf(this.type) === -1) {
        player.availWeapons.push(this.type);
    }

    player.setWeapon(this.type);
};
