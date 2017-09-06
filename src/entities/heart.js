function Heart(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.alive = true;
    this.hitDistSq = 40 * 40;
}

Heart.prototype.render = function(ctx) {
    ctx.shadowBlur = 10;
    ctx.drawImage(heart, this.x, this.y);
    ctx.shadowBlur = 0;
};

Heart.prototype.touchPlayer = function() {
    this.alive = false;
    player.lives += 1;
    overlayWords.push(new WordGrowCenter('+1', '#08621E'));
};
