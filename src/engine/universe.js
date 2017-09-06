function initUniverse() {
    universeRot = getRandom(-universe.spinAmount, universe.spinLimit);
    universeRotDir = universe.spinAmount;

    if (getRandom(1, 2) > 1.5) {
        universeRotDir = -universeRotDir;
    }
}


function enteredBlackHole(blackHole) {
    blackHoleAnim = 0.0;
    blackOverlay = 0.0;
    universeRotDir = 10;

    player.x = blackHole.x;
    player.y = blackHole.y;

    overlayWords.length = 0;

    var snd = new Audio('x.mp3');
    snd.playbackRate = 0.5;
    snd.play();
}


function blackHoleAnimation(delta) {
    blackHoleAnim += delta;

    if (blackHoleAnim < 3) {
        BlackHole.updateParticles(delta);

        universeScale += 12 * delta;
        universeRot += universeRotDir * delta;
        universeRotDir += 10;
        blackOverlay += 0.5 * delta;

    } else {
        blackOverlay -= 0.5 * delta;
        newUniverse();
    }
}


function newUniverse() {
    universeScale = 1.0;
    universeRotDir = 0;
    universeRot = 0;

    universe.tileSize = getRandomInt(20, 70);

    universe.spinAmount = getRandom(0, 15);
    if (universe.spinAmount < 1) {
        universe.spinAmount = 0;
    }

    if (getRandom(1, 10) <= 2) {
        universe.spinLimit = 0;   // spin forever
    } else {
        universe.spinLimit = getRandom(2, 80);
    }

    universe.unitAccel = getRandom(150, 300);
    universe.unitMax = universe.unitAccel * getRandom(1.0, 3.0);
    universe.unitDeccel = getRandom(1.1, 1.3);

    universe.colors = [
        getRandomColor(100, 250),
        getRandomColor(50, 200)
    ];

    // Increase difficulty
    if (universe.numEnemies < 30) {
        universe.numEnemies += 2;
    }
    if (universe.enemySpeed < 150) {
        universe.enemySpeed += 5;
        universe.enemyChaseDist += 5;
    }
    universe.weaponSpawnChance += 5;

    cleanupExistingMap();
    generateNewMap();

    blackHoleAnim = -1;
}


function heavenUniverse() {
    universeScale = 1.0;
    universeRotDir = 0;
    universeRot = 0;

    universe.tileSize = 32;
    universe.spinAmount = 10;
    universe.spinLimit = 0;

    universe.unitAccel = 200;
    universe.unitMax = 300;
    universe.unitDeccel = 1.2;

    universe.colors = [Color_White, '#95EDEC'];

    generateHeavenMap();

    // Done on a delay so the player will have a chance to stop shooting
    window.setTimeout(setupReloadEvents, 2000);
}


function setupReloadEvents() {
    window.onclick = function() {
        location.reload();
    };
    window.ontouchstart = function() {
        location.reload();
    };
}
