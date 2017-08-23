function initUniverse() {
    universeRot = 0;
    universeRotDir = universe.spinAmount;

    player = { x: 550, y: 550, rot: 0.5 * Math.PI };
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function newUniverse() {
    with (universe) {
        spinAmount = getRandom(0.0, 0.2);
        spinLimit = getRandom(0, 30);
        unitAccel = getRandom(150, 300);
        unitMax = unitAccel * getRandom(1.0, 3.0);
        unitDeccel = getRandom(1.1, 1.3);
    }

    loadMap();
}
