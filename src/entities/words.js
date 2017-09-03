function WordLift(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alive = true;
    this.age = 0;
}

WordLift.prototype.update = function(word, delta) {
    word.y -= 100 * delta;
    word.age += delta;
    if (word.age > 1) word.alive = false;
};

WordLift.prototype.render = function(word, ctx) {
    if (word.alive) {
        ctx.fillText(word.text, word.x, word.y);
    }
};


function WordStatic(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alive = true;
}

WordStatic.prototype.render = WordLift.prototype.render;



function WordGrowCenter(text) {
    this.text = text;
    this.alive = true;
    this.age = 0;
}

WordGrowCenter.prototype.update = function(word, delta) {
    word.age += delta;
    if (word.age > 1) word.alive = false;
};

WordGrowCenter.prototype.render = function(word, ctx) {
    if (!word.alive) return;

    var fontSize = (word.age * word.age * 250) + 12;
    var opacity = 1.0 - word.age;

    ctx.font = fontSize + 'px monospace';
    ctx.globalAlpha = opacity;

    var metrics = ctx.measureText(word.text);
    ctx.fillText(word.text, (canvas.width - metrics.width) / 2 - offset.x, (canvas.height - fontSize) / 2 - offset.y);

    ctx.font = '12px monospace';
    ctx.globalAlpha = 1.0;
};
