window.onresize = resizeRenderCanvas;


var lastTs = 0;
var running = false;
function tick(timestamp) {
	var delta = timestamp - lastTs;
	lastTs = timestamp;

	// If the GC causes too much time delay, just throw the excess
	// time away because the physics engine goes spaz on big deltas
	if (delta > (2 * 16.66)) {
		delta = (2 * 16.66);
	}

	if (blackHoleAnim < 0) {
		physics(delta / 1000);
	} else {
		blackHoleAnimation(delta / 1000);
	}

	render();

	requestAnimationFrame(tick);
}


resizeRenderCanvas();
astarCreateGrid(100, 100);
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
