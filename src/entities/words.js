function Word(x, y, text, update) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.update = update;
    this.alive = true;
}

var wordsUpdate = {
    lift: function(word, delta) {
        word.y -= 20 * delta;
        word.age += delta;
        if (word.age > 50) word.alive = false;
    }
};
