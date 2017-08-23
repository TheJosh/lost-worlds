var universe = {
    spinAmount: 0.1,
    spinLimit: 10,

    unitAccel: 0.5,
    unitMax: 10,
    unitDeccel: 1.2,
};

function initUniverse() {
    universeRot = 0;
    universeRotDir = universe.spinAmount;
}
