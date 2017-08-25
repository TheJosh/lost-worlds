
var PLAYER_SIZE = 30;
var HALF_PLAYER_SIZE = 15;

var canvas = document.getElementById('c');

var player = null;

var universeRot = 0;
var universeRotDir = 0.0;

var gravSource = [];
var enemies = [];
var bullets = [];


var universe = {
	orientation: 1,   // 1 is top, 2 is side

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
		'3': '#630E1B'
	}
};

// Closure compiler will replace these vars with names like B and X
var Math_PI = Math.PI;
var Math_round = Math.round;
var Math_floor = Math.floor;
var Math_random = Math.random;
var Math_sin = Math.sin;
var Math_cos = Math.cos;
var Math_atan2 = Math.atan2;
var Math_pow = Math.pow;
var Math_sqrt = Math.sqrt;
var Math_abs = Math.abs;
