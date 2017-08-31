var weapons = [
    {
        name: 'Shotgun',
        vel: 400,
        delay: 0.8
    },
    {
        name: 'Machine gun',
        vel: 500,
        delay: 0.1
    },
    {
        name: 'Pistol',
        vel: 700,
        delay: 0.4
    }
];


function Player() {
    this.weapon = 2;
    this.availWeapons = [2];
    this.health = 10;
    this.lives = 3;
    this.heartAnim = null;
    this.collected = 0;
    this.kills = 0;

    var fireWait = 0;
    var invincWait = 0;

    var walkWobbleRot = 0;
    var walkWobbleDir = 0.01;


    var img = new Image();
    img.src = 'player.png';

    this.spawn = function(x, y) {
        this.x = x * universe.tileSize;
        this.y = y * universe.tileSize;
        this.rot = 0;
        this.vel = 0;
    };

    this.render = function(ctx) {
        ctx.translate(player.x, player.y);
        ctx.rotate(player.rot + walkWobbleRot);

        ctx.drawImage(
            img,
            this.weapon * 52, 0, 52, 31,
            -HALF_PLAYER_SIZE - 22, -HALF_PLAYER_SIZE, 52, 31
        );

        ctx.rotate(-player.rot - walkWobbleRot);
        ctx.translate(-player.x, -player.y);

        if (player.heartAnim) {
            ctx.globalAlpha = player.heartAnim.alpha;
            ctx.drawImage(
                heart,
                18, 0, 18, 14,
                player.heartAnim.x, player.heartAnim.y, 18, 14
            );
            ctx.globalAlpha = 1.0;
        }
    };

    this.update = function(delta) {
        if (fireWait > 0) fireWait -= delta;
        if (invincWait > 0) invincWait -= delta;

        if (keys.y != 0) {
            walkWobbleRot += walkWobbleDir;
            if (Math_abs(walkWobbleRot) > 0.05) {
                walkWobbleDir = -walkWobbleDir;
            }
        }

        if (this.heartAnim) {
            this.heartAnim.y -= 10 * delta;
            this.heartAnim.alpha -= 0.2 * delta;
            if (this.heartAnim.alpha < 0.1) {
                this.heartAnim = null;
            }
        }
    };

    this.changeWeapon = function() {
        var index = player.availWeapons.indexOf(this.weapon);
        index++;
        if (index == player.availWeapons.length) {
            index = 0;
        }
        this.weapon = player.availWeapons[index];
    };

    this.fire = function(delta) {
        if (fireWait > 0) return;

        var aheadPx = 40;
        var sidePx = 8;     // weapon is off-centre

        var x = this.x - (Math_cos(this.rot) * aheadPx) - (Math_cos(this.rot - Math_PI / 2) * sidePx);
        var y = this.y - (Math_sin(this.rot) * aheadPx) - (Math_sin(this.rot - Math_PI / 2) * sidePx);

        if (this.weapon == 0) {
            // Shotgun gets 4x extra bullets
            for (var i = -2; i <= 2; ++i) {
                bullets.push(
                    new Bullet(x, y, this.rot + Math_PI + (i * 0.1), weapons[this.weapon].vel + player.vel)
                );
            }
        } else {
            bullets.push(
                new Bullet(x, y, this.rot + Math_PI, weapons[this.weapon].vel + player.vel)
            );
        }

        fireWait = weapons[this.weapon].delay;
    };


    this.takeDamage = function(enemy) {
        if (invincWait > 0) return;

        this.health -= enemy.damage;
        if (this.health <= 0) {
            this.lives--;
            this.health = 10;

            this.heartAnim = { x: this.x, y: this.y, alpha: 1.0 };

            if (this.lives == 0) {
                cleanupExistingMap();
                heavenUniverse();
            }
        }

        overlayWords.push({ x: player.x, y: player.y - 30, lift: 0, text: 'OUCH' });

        invincWait = 1;
    };
}
