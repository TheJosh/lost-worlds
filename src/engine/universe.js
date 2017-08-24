function initUniverse() {
    universeRot = getRandom(-universe.spinAmount, universe.spinLimit);
    universeRotDir = universe.spinAmount;

    if (getRandom(1, 2) > 1.5) {
        universeRotDir = -universeRotDir;
    }
}

function getRandom(min, max) {
    return Math_random() * (max - min) + min;
}

function getRandomColor(min, max) {
    return '#'
        + Math_floor(getRandom(min, max)).toString(16)
        + Math_floor(getRandom(min, max)).toString(16)
        + Math_floor(getRandom(min, max)).toString(16);
}

function newUniverse() {
    universe.orientation = Math_round(getRandom(1, 2));

    universe.tileSize = Math_floor(getRandom(24, 64));

    universe.spinAmount = getRandom(0, 10);

    if (getRandom(1, 10) <= 2) {
        universe.spinLimit = 0;   // spin forever
    } else {
        universe.spinLimit = getRandom(2, 50);
    }

    universe.unitAccel = getRandom(150, 300);
    universe.unitMax = universe.unitAccel * getRandom(1.0, 3.0);
    universe.unitDeccel = getRandom(1.1, 1.3);

    universe.colors[-1] = getRandomColor(100, 150);
    universe.colors[0] = getRandomColor(0, 80);
    universe.colors[1] = getRandomColor(150, 250);
    universe.colors[2] = getRandomColor(150, 250);
    universe.colors[3] = getRandomColor(150, 250);

    loadMap();
}
