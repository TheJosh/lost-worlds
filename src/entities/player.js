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


var HALF_PLAYER_SIZE = 15;


function Player() {
    this.availWeapons = [2];
    this.lives = 3;
    this.collected = 0;
    this.kills = 0;
    this.score = 0;

    var weapon = 2;
    var health = 10;

    var fireWait = 0;
    var invincWait = 0;

    var walkWobbleRot = 0;
    var walkWobbleDir = 0.01;


    var img = new Image();
    img.src = 'p.png';

    this.spawn = function(x, y) {
        this.x = x * universe.tileSize;
        this.y = y * universe.tileSize;
        this.rot = 0;
        this.vel = 0;
        invincWait = 3;
    };

    this.setWeapon = function(i) {
        weapon = i;
    };

    this.render = function(ctx) {
        ctx.translate(player.x, player.y);
        ctx.rotate(player.rot + walkWobbleRot);

        ctx.drawImage(
            img,
            weapon * 52, 0, 52, 31,
            -HALF_PLAYER_SIZE - 22, -HALF_PLAYER_SIZE, 52, 31
        );

        ctx.rotate(-player.rot - walkWobbleRot);
        ctx.translate(-player.x, -player.y);
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

        if (health < 10) {
            health += 0.1 * delta;
        }
    };

    this.changeWeapon = function() {
        var index = player.availWeapons.indexOf(weapon);
        index++;
        if (index == player.availWeapons.length) {
            index = 0;
        }
        weapon = player.availWeapons[index];
    };

    this.fire = function(delta) {
        if (fireWait > 0) return;

        var aheadPx = 40;
        var sidePx = 8;     // weapon is off-centre

        var x = this.x - (Math_cos(this.rot) * aheadPx) - (Math_cos(this.rot - Math_PI / 2) * sidePx);
        var y = this.y - (Math_sin(this.rot) * aheadPx) - (Math_sin(this.rot - Math_PI / 2) * sidePx);

        if (weapon == 0) {
            // Shotgun gets 4x extra bullets
            for (var i = -2; i <= 2; ++i) {
                bullets.push(
                    new Bullet(x, y, this.rot + Math_PI + (i * 0.1), weapons[weapon].vel + player.vel)
                );
            }
            (new Audio('a.mp3')).play();
        } else {
            bullets.push(
                new Bullet(x, y, this.rot + Math_PI, weapons[weapon].vel + player.vel)
            );
            var p = new Audio('c.mp3');
            p.playbackRate = (weapon == 2 ? 0.8 : 2.0);
            p.play();
        }

        fireWait = weapons[weapon].delay;
    };


    this.takeDamage = function(enemy) {
        if (invincWait > 0) return;

        health -= enemy.damage;
        if (health <= 0) {
            player.lives--;
            health = 10;

            if (player.lives == 0) {
                cleanupExistingMap();
                heavenUniverse();
            }

            (new Audio('4.mp3')).play();
            overlayWords.push(new WordGrowCenter('DEAD', '#620A08'));
        }

        invincWait = 1;
    };
}
