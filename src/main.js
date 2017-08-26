window.onresize = resizeRenderCanvas;


var lastTs = 0;
var fpsRingBuf = [];
var running = false;
function tick(timestamp) {
	var delta = timestamp - lastTs;
	lastTs = timestamp;

	fpsRingBuf.push(1000 / delta);
	if (fpsRingBuf.length > 100) {
		fpsRingBuf.shift();
	}

	physics(delta / 1000);
	render();

	requestAnimationFrame(tick);
}

resizeRenderCanvas();
loadMap();

function postMapLoad() {
	initUniverse();
	initRender();

	if (!running) {
		requestAnimationFrame(tick);
	}

	running = true;
}
