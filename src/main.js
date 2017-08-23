window.onresize = resizeRenderCanvas;
window.onmousemove = mousemove;
window.onkeydown = keydown;
window.onkeyup = keyup;


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

function startGame() {
	initUniverse();
	initRender();
	requestAnimationFrame(tick);
}
