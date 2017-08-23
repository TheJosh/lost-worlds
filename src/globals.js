
var PLAYER_SIZE = 20;
var HALF_PLAYER_SIZE = 10;

var canvas = document.getElementById('c');

var player;

var universeRot = 0;
var universeRotDir = 0.0;

var gravSource = [
	{ x: 4630, y: 70, dist: 0, strength: 0, dirY: 2 },
	{ x: 4110, y: 1030, dist: 0, strength: 0, dirY: 2 }
];

var universe = {
	tileSize: 32,

    spinAmount: 1,    // degrees/second
    spinLimit: 2,

    unitAccel: 200,   // pixels/sec/sec
    unitMax: 500,     // pixels/second
    unitDeccel: 1.2,

	colors: {
		'-1': '#2E1602',
		'0': '#180B00',
		'1': '#34190A',
		'2': '#D3D7DB',
		'3': '#630E1B',
	},
};
