var ctx = canvas.getContext('2d');
var offset = { x: 0, y: 0 };

var cachedTiles;
var cachedTileEdges;
var cachedCrosshair;


function resizeRenderCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmouseenter = window.onmousemove;
	canvas.style.cursor = 'none';
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
	
	cachedTileEdges = canvasCache(256 * universe.tileSize, 64 * universe.tileSize, drawTileEdges);
	
	cachedCrosshair = canvasCache(30, 30, function(ctx, canv) {
		var grad = ctx.createRadialGradient(15, 15, 0, 15, 15, 15);
		grad.addColorStop(0.0, 'rgba(255,0,0,0)');
		grad.addColorStop(0.5, 'rgba(240,8,8,1)');
		grad.addColorStop(1.0, 'rgba(120,4,4,1)');

		ctx.lineWidth = 3;
		ctx.strokeStyle = grad;
		ctx.beginPath();
		ctx.arc(15, 15, 10, 0, 2 * Math_PI);
		ctx.moveTo(0, 15);
		ctx.lineTo(30, 15);
		ctx.moveTo(15, 0);
		ctx.lineTo(15, 30);
		ctx.stroke();
	});
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
		ctx.drawImage(cachedTileEdges, 0, 0);
	}

	if (player !== null) {
		player.render(ctx);
	}

	for (var i = 0; i < gravSource.length; ++i) {
		gravSource[i].render(ctx);
	}

	for (var i = 0; i < enemies.length; ++i) {
		enemies[i].render(ctx);
	}

	for (var i = 0; i < collectables.length; ++i) {
		collectables[i].render(ctx);
	}

	for (var i = 0; i < bullets.length; ++i) {
		bullets[i].render(ctx);
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.drawImage(cachedCrosshair, mouse.x - 15, mouse.y - 15);


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

	for (var y = 0; y < 64; ++y) {
		for (var x = 0; x < 256; ++x) {
			var tile = getTile(x, y);
			switch (tile.type) {
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

function drawTileEdges(ctx, canvas) {
	var width = 3;

	ctx.fillStyle = universe.colors[-1];
	for (var y = 0; y < 64; ++y) {
		for (var x = 0; x < 256; ++x) {
			var tile = getTile(x, y);
			if (tile.type != 0) continue;

			if (tile.wallLeft) {
				ctx.fillRect(x * universe.tileSize, y * universe.tileSize, width, universe.tileSize);
			}
			if (tile.wallRight) {
				ctx.fillRect(x * universe.tileSize + universe.tileSize - width, y * universe.tileSize, width, universe.tileSize);
			}
			if (tile.wallUp) {
				ctx.fillRect(x * universe.tileSize, y * universe.tileSize, universe.tileSize, width);
			}
			if (tile.wallDown) {
				ctx.fillRect(x * universe.tileSize, y * universe.tileSize + universe.tileSize - width, universe.tileSize, width);
			}
		}
	}
}
