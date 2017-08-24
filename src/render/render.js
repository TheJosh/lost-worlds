var ctx = canvas.getContext('2d');
var offset = { x: 0, y: 0 };
var cachedTiles;


function resizeRenderCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmouseenter = mousemove;
}

function canvasCache(width, height, func) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	func(canvas.getContext('2d'), canvas);

	return canvas;
}

function initRender() {
	cachedTiles = canvasCache(256 * universe.tileSize, 64 * universe.tileSize, drawTiles);
}

function render() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.fillStyle = universe.colors[1];
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(universeRot * Math.PI / 180);
	ctx.translate(0 - canvas.width/2, 0 - canvas.height/2);

	if (player !== null) {
		offset.x = Math.round(
			0 - player.x + (canvas.width / 2)
		);
		offset.y = Math.round(
			0 - player.y + (canvas.height / 2)
		);
	}

	ctx.translate(offset.x, offset.y);

	if (cachedTiles) {
		ctx.drawImage(cachedTiles, 0, 0);
	}

	if (player !== null) {
		player.render(ctx);
	}

	ctx.fillStyle = '#fff';
	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		ctx.beginPath();
		ctx.arc(src.x, src.y, 20, 0, 2 * Math.PI);
		ctx.fill();
	}

	ctx.fillStyle = '#00f';
	for (var i = 0; i < enemies.length; ++i) {
		enemies[i].render(ctx);
	}

	var fps = fpsRingBuf.reduce(function(x,y) {
		return x + y;
	}) / fpsRingBuf.length;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = '#fff';
	ctx.fillText(fps.toFixed(1) + ' fps', 20, 20);
}


function drawTiles(ctx, canvas) {
	ctx.fillStyle = universe.colors[1];
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var y = 0; y <= 64; ++y) {
		for (var x = 0; x <= 256; ++x) {
			var tile = getTile(x, y);
			switch (tile) {
				case -1: ctx.fillStyle = universe.colors[-1]; break;   // dirt edge
				case  0: ctx.fillStyle = universe.colors[0]; break;   // none
				case  1: continue;
				case  2: ctx.fillStyle = universe.colors[2]; break;   // steel
				case  3: ctx.fillStyle = universe.colors[3]; break;   // lava
			}
			ctx.fillRect(x * universe.tileSize, y * universe.tileSize, universe.tileSize, universe.tileSize);
		}
	}
}
