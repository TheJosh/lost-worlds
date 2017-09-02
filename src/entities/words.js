function WordLift(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alive = true;
    this.age = 0;
}

WordLift.prototype.update = function(word, delta) {
    word.y -= 20 * delta;
    word.age += delta;
    if (word.age > 5) word.alive = false;
};


function WordStatic(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alive = true;
}
