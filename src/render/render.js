var ctx = canvas.getContext('2d');
var offset = { x: 0, y: 0 };
var renderBounds = { x1: 0, y1: 0, x2: 0, y2: 0, size: 0 };

var cachedTiles;
var cachedCrosshair;

var heart = new Image();
heart.src = 'heart.gif';


function resizeRenderCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function canvasCache(width, height, func) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	func(canvas.getContext('2d'), canvas);

	return canvas;
}


function initRender() {
	ctx.font = '12px monospace';
	canvas.style.cursor = 'none';

	cachedTiles = canvasCache(universe.mapWidth * universe.tileSize, universe.mapHeight * universe.tileSize, drawTiles);

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

	// Major performance boost
	ctx.imageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
}


function render() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.globalAlpha = 1.0;
	ctx.fillStyle = universe.colors[1];
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(universeRot * Math.PI / 180);
	ctx.scale(universeScale, universeScale);
	ctx.translate(0 - canvas.width/2, 0 - canvas.height/2);

	if (player !== null) {
		offset.x = Math_round(
			0 - player.x + (canvas.width / 2)
		);
		offset.y = Math_round(
			0 - player.y + (canvas.height / 2)
		);
		ctx.translate(offset.x, offset.y);
	}

	// Only entities fully within these bounds should be rendered
	var maxExtent = (canvas.width ? canvas.width : canvas.height) * 1.2;
	renderBounds.x1 = Math_round(player.x - (maxExtent / 2));
	renderBounds.y1 = Math_round(player.y - (maxExtent / 2));
	renderBounds.x2 = Math_round(player.x + (maxExtent / 2));
	renderBounds.y2 = Math_round(player.y + (maxExtent / 2));
	renderBounds.size = maxExtent;

	drawBG();
	drawEntities();

	if (blackOverlay > 0.01) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = '#000';
		ctx.globalAlpha = blackOverlay;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	drawHUD();
}


function drawBG()
{
	if (!cachedTiles) return;

	ctx.drawImage(
		cachedTiles,
		renderBounds.x1, renderBounds.y1, renderBounds.size, renderBounds.size,
		renderBounds.x1, renderBounds.y1, renderBounds.size, renderBounds.size
	);
}


function drawEntities()
{
	if (player !== null) {
		player.render(ctx);
	}

	for (var i = 0; i < gravSource.length; ++i) {
		if (pointInBounds(gravSource[i], renderBounds)) {
			gravSource[i].render(ctx);
		}
	}

	for (var i = 0; i < enemies.length; ++i) {
		if (enemies[i].alive) enemies[i].render(ctx);
	}

	for (var i = 0; i < collectables.length; ++i) {
		if (collectables[i].alive) collectables[i].render(ctx);
	}

	ctx.fillStyle = '#000';
	for (var i = 0; i < bullets.length; ++i) {
		bullets[i].render(ctx);
	}
}


function drawHUD()
{
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#fff';
	for (var i = 0; i < overlayWords.length; ++i) {
		overlayWords[i].render(overlayWords[i], ctx);
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.drawImage(cachedCrosshair, mouse.x - 15, mouse.y - 15);

	if (player.lives == 0) {
		ctx.font = '40px serif';
		ctx.fillStyle = '#000';
		var metrics = ctx.measureText('GAME OVER');
		ctx.fillText('GAME OVER', (canvas.width - metrics.width) / 2, 75);
		ctx.font = '12px monospace';
	} else {
		for (var i = 0; i < player.lives; ++i) {
			ctx.drawImage(
				heart,
				0, 0, 18, 14,
				20 + (22 * i), 20, 18, 14
			);
		}

		if (player.heartAnim && ~~(player.heartAnim.y) % 2 == 0) {
			ctx.drawImage(
				heart,
				18, 0, 18, 14,
				20 + (22 * i), 20, 18, 14
			);
		}
	}

	ctx.drawImage(elec, 20, 50);
	ctx.fillText('\u00D7 ' + player.collected, 50, 61);

	ctx.drawImage(bug,  0, 0, 18, 22,  20, 80, 18, 22);
	ctx.fillText('\u00D7 ' + player.kills, 50, 92);
}


function drawTiles(ctx, canvas) {
	ctx.fillStyle = universe.colors[1];
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var y = 0; y < universe.mapHeight; ++y) {
		for (var x = 0; x < universe.mapWidth; ++x) {
			var tile = getTile(x, y);
			switch (tile) {
				case  0: ctx.fillStyle = universe.colors[0]; break;   // none
				case  1: continue;
				case  2: ctx.fillStyle = universe.colors[2]; break;   // steel
				case  3: ctx.fillStyle = universe.colors[3]; break;   // lava
			}
			ctx.fillRect(x * universe.tileSize, y * universe.tileSize, universe.tileSize, universe.tileSize);
		}
	}
}
