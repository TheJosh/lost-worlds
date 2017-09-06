var elec = new Image();
elec.src = 'e.gif';


function Collectable(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.alive = true;
    this.hitDistSq = 25 * 25;

    this.render = function(ctx) {
        ctx.shadowBlur = 10;
        ctx.drawImage(elec, this.x, this.y);
        ctx.shadowBlur = 0;
    };

    this.touchPlayer = function() {
        this.alive = false;
        player.collected++;
        overlayWords.push(new WordGrowCenter('+1', '#08621E'));
    };
}
