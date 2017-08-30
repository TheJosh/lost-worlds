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
}


function blackHoleAnimation(delta) {
    blackHoleAnim += delta;

    if (blackHoleAnim < 5) {
        BlackHole.updateParticles(delta);

        universeScale += 12 * delta;
        universeRot += universeRotDir * delta;
        universeRotDir += 10;
        blackOverlay += 0.2 * delta;

    } else {
        blackOverlay -= 0.5 * delta;
        newUniverse();
    }
}


function newUniverse() {
    universeScale = 1.0;
    universeRotDir = 0;
    universeRot = 0;

    universe.tileSize = Math_floor(getRandom(20, 70));

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

    universe.colors[0] = getRandomColor(100, 250);
    universe.colors[1] = getRandomColor(50, 200);
    universe.colors[2] = getRandomColor(50, 200);
    universe.colors[3] = getRandomColor(50, 200);

    generateNewMap();

    blackHoleAnim = -1;
}
