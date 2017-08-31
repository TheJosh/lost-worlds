window.onresize = resizeRenderCanvas;


var lastTs = 0;
var running = false;
function tick(timestamp) {
	var delta = timestamp - lastTs;
	lastTs = timestamp;

	if (blackHoleAnim < 0) {
		physics(delta / 1000);
	} else {
		blackHoleAnimation(delta / 1000);
	}

	render();

	requestAnimationFrame(tick);
}

resizeRenderCanvas();
BlackHole.setupParticles();
player = new Player();
menu();


function postMapLoad() {
	initUniverse();
	initRender();

	if (!running) {
		lastTs = performance.now();
		requestAnimationFrame(tick);
	}

	running = true;
}
