var ENEMY_BEHAVE_VERT = 0;
var ENEMY_BEHAVE_HORIZ = 1;

var bug = new Image();
bug.src = 'bug.gif';


function Enemy(x, y, behaviour) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.alive = true;
    this.hitDistSq = 25 * 25;
    this.health = 3;
    this.damage = 5;
    this.behaviour = behaviour;

    if (enemy_behave_setup[behaviour]) {
        enemy_behave_setup[behaviour](this);
    }
};


Enemy.prototype.render = function(ctx) {
    if (this.alive == false) {
        return;
    }

    ctx.translate(this.x, this.y);
    if (this.dirY > 0) ctx.rotate(Math_PI);
    ctx.drawImage(bug, -9, -11);
    if (this.dirY > 0) ctx.rotate(-Math_PI);
    ctx.translate(-this.x, -this.y);
};


Enemy.prototype.update = function(delta) {
    enemy_behave_update[this.behaviour](this, delta);
};


enemy_behave_setup = [
    function(e) {
        e.dirY = 100;
    },
    function(e) {
        e.dirX = 100;
    },
];

enemy_behave_update = [
    function(e, delta) {
        e.y += e.dirY * delta;
        checkCollide(e, 10, function(axis, sign) {
            e.dirY = -e.dirY;
        });
    },
    function(e, delta) {
        e.x += e.dirX * delta;
        checkCollide(e, 10, function(axis, sign) {
            e.dirX = -e.dirX;
        });
    },
];


Enemy.prototype.takeDamage = function(bullet) {
    this.health -= bullet.strength;

    if (this.health < 0) {
        this.alive = false;
    }

    this.x += bullet.dir.x * bullet.strength / 300;
    this.y += bullet.dir.y * bullet.strength / 300;
};
