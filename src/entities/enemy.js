var ENEMY_BEHAVE_VERT = 0;
var ENEMY_BEHAVE_HORIZ = 1;
var ENEMY_BEHAVE_CHASE = 2;

var bug = new Image();
bug.src = 'b.gif';


function Enemy(x, y, behaviour) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;
    this.rot = 0;
    this.alive = true;
    this.hitDistSq = 25 * 25;
    this.health = 3;
    this.damage = 5;
    this.behaviour = behaviour;
    this.animTime = 0;

    if (enemy_behave_setup[behaviour]) {
        enemy_behave_setup[behaviour](this);
    }
};


Enemy.prototype.render = function(ctx) {
    if (this.alive == false) {
        return;
    }

    var frame = Math_floor(this.animTime / 0.25);

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.drawImage(
        bug,
        frame * 18, 0, 18, 22,
        -9, -11, 18, 22
    );
    ctx.rotate(-this.rot);
    ctx.translate(-this.x, -this.y);
};


Enemy.prototype.update = function(delta) {
    enemy_behave_update[this.behaviour](this, delta);

    this.animTime += delta;
    if (this.animTime > 0.5) this.animTime -= 0.5;
};


enemy_behave_setup = [
    function(e) {
        e.dirY = universe.enemySpeed;
        e.rot = Math_PI;
    },
    function(e) {
        e.dirX = universe.enemySpeed;
        e.rot = Math_PI / 2;
    }
];

enemy_behave_update = [
    function(e, delta) {
        e.y += e.dirY * delta;
        checkCollide(e, 10, function(axis, sign) {
            e.dirY = -e.dirY;
            e.rot += Math_PI;
        });
        clasePlayerIfClose(e);
    },
    function(e, delta) {
        e.x += e.dirX * delta;
        checkCollide(e, 10, function(axis, sign) {
            e.dirX = -e.dirX;
            e.rot += Math_PI;
        });
        clasePlayerIfClose(e);
    },
    function(e, delta) {
        e.pathAge += delta;
        if (e.pathAge > 1) {
            e.path = astarSearch(getTileFromCoords(player), getTileFromCoords(e));
            e.pathAge = 0;
        }

        if (e.path.length == 0) {
            return;
        }

        var coords = getCoordsFromTile(e.path[0]);

        var dirX = (coords.x - e.x);
        var dirY = (coords.y - e.y);

        e.rot = Math_atan2(dirY, dirX) + Math_PI/2;

        dirX = (dirX == 0 ? 0 : (dirX > 0 ? universe.enemySpeed : -universe.enemySpeed));
        e.x += dirX * delta;

        dirY = (dirY == 0 ? 0 : (dirY > 0 ? universe.enemySpeed : -universe.enemySpeed));
        e.y += dirY * delta;

        checkCollide(e, 10);
    }
];


function clasePlayerIfClose(enemy)
{
    var theshSq = universe.enemyChaseDist * universe.enemyChaseDist;

    var distSq = Math_pow(player.x - enemy.x, 2) + Math_pow(player.y - enemy.y, 2);
    if (distSq < theshSq) {
        enemy.behaviour = ENEMY_BEHAVE_CHASE;
        enemy.pathAge = 2;
    }
}


Enemy.prototype.takeDamage = function(bullet) {
    this.health -= bullet.strength;

    if (this.health < 0 && this.alive) {
        this.alive = false;
        player.kills += 1;
        (new Audio('7.mp3')).play();
        overlayWords.push(new WordLift(this.x, this.y, '+' + SCORE_KILL));
    }

    this.x += bullet.dir.x * bullet.strength / 300;
    this.y += bullet.dir.y * bullet.strength / 300;
};
