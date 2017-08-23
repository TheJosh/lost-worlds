var TILE_SIZE = 32;
var PLAYER_SIZE = 20;
var HALF_PLAYER_SIZE = 10;

var canvas = document.getElementById('c');

var player;

var gravSource = [
	{ x: 4630, y: 70, dist: 0, strength: 0, dirY: 2 },
	{ x: 4110, y: 1030, dist: 0, strength: 0, dirY: 2 }
];

var universe = {
    spinAmount: 0.1,
    spinLimit: 10,

    unitAccel: 200,
    unitMax: 500,
    unitDeccel: 1.2,
};
