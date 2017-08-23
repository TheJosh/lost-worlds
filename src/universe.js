function initUniverse() {
    universeRot = 0;
    universeRotDir = universe.spinAmount;

    player = { x: 550, y: 550, rot: 0.5 * Math.PI };
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
        spinAmount = getRandom(0.0, 0.2);
        spinLimit = getRandom(0, 30);
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
