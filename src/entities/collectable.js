var elec = new Image();
elec.src = 'e.gif';


function Collectable(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.alive = true;
    this.hitDistSq = 35 * 35;
}

Collectable.prototype.render = function(ctx) {
    ctx.drawImage(elec, this.x, this.y);
};

Collectable.prototype.touchPlayer = function() {
    this.alive = false;
    overlayWords.push(new WordGrowCenter('+' + SCORE_COLLECT, '#08621E'));
    player.collected++;
};
