var TILE_SIZE = 32;
var PLAYER_SIZE = 20;
var HALF_PLAYER_SIZE = 10;

window.onresize = resizeRenderCanvas;
window.onkeydown = keydown;
window.onkeyup = keyup;

var player = { x: 550, y: 550, rot: 0.5 * Math.PI };
var accel = { x: 0, y: 0 };
var keys = { x: 0, y: 0 };
var gravSource = [
	{ x: 4630, y: 70, dist: 0, strength: 0, dirY: 2 },
	{ x: 4110, y: 1030, dist: 0, strength: 0, dirY: 2 }
];


var lastTs = 0;
var fpsRingBuf = [];
function tick(timestamp) {
	var delta = timestamp - lastTs;
	lastTs = timestamp;

	fpsRingBuf.push(1000 / delta);
	if (fpsRingBuf.length > 100) {
		fpsRingBuf.shift();
	}

	physics(delta);
	render();

	requestAnimationFrame(tick);
}

resizeRenderCanvas();
loadMap();
requestAnimationFrame(tick);
