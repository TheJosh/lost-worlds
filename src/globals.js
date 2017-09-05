
var PLAYER_SIZE = 30;
var HALF_PLAYER_SIZE = 15;

var canvas = document.getElementById('c');

var player = null;

var universeRot = 0;
var universeRotDir = 0.0;

var blackHoleAnim = -1;
var universeScale = 1.0;

var blackOverlay = 0;

var gravSource = [];
var enemies = [];
var collectables = [];
var bullets = [];
var overlayWords = [];

var hasTouchEvents = ('ontouchstart' in window);


var universe = {
	tileSize: 32,

	spinAmount: 1,    // degrees/second
	spinLimit: 2,

	unitAccel: 200,   // pixels/sec/sec
	unitMax: 500,     // pixels/second
	unitDeccel: 1.2,

	mapWidth: 49,
	mapHeight: 39,

	numEnemies: 10,
	enemyChaseDist: 250,
	enemySpeed: 100,

	weaponSpawnChance: 2,

	colors: ['#87643E', '#221409']
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

var Color_Black = '#000';
var Color_White = '#fff';
