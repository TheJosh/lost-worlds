function initUniverse() {
    universeRot = getRandom(-universe.spinAmount, universe.spinLimit);
    universeRotDir = universe.spinAmount;

    if (getRandom(1, 2) > 1.5) {
        universeRotDir = -universeRotDir;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor(min, max) {
    return '#'
        + Math.floor(getRandom(min, max)).toString(16)
        + Math.floor(getRandom(min, max)).toString(16)
        + Math.floor(getRandom(min, max)).toString(16);
}

function newUniverse() {
    with (universe) {
        orientation = Math.round(getRandom(1, 2));

        tileSize = Math.floor(getRandom(24, 64));

        spinAmount = getRandom(0, 10);

        if (getRandom(1, 10) <= 2) {
            spinLimit = 0;   // spin forever
        } else {
            spinLimit = getRandom(2, 50);
        }

        unitAccel = getRandom(150, 300);
        unitMax = unitAccel * getRandom(1.0, 3.0);
        unitDeccel = getRandom(1.1, 1.3);

        colors[-1] = getRandomColor(100, 150);
        colors[0] = getRandomColor(0, 80);
        colors[1] = getRandomColor(150, 250);
        colors[2] = getRandomColor(150, 250);
        colors[3] = getRandomColor(150, 250);
    }

    loadMap();
}
