var ctx = canvas.getContext('2d');
var offset = { x: 0, y: 0 };
var renderBounds = { x1: 0, y1: 0, x2: 0, y2: 0, size: 0 };

var cachedTiles;
var cachedCrosshair;

var heart = new Image();
heart.src = 'h.gif';


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
	canvas.style.cursor = 'none';

	cachedTiles = canvasCache(universe.mapWidth, universe.mapHeight, drawTiles);

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

	// Major performance boost + makes levels look correct
	ctx['imageSmoothingEnabled'] = false;
	ctx['msImageSmoothingEnabled'] = false;

	// Reset env
	ctx.font = '12px monospace';
	ctx.globalAlpha = 1.0;
	ctx.shadowColor = Color_White;

	// Fill background
	ctx.fillStyle = universe.colors[1];
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Rotation and scaling
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(universeRot * Math_PI / 180);
	ctx.scale(universeScale, universeScale);
	ctx.translate(0 - canvas.width/2, 0 - canvas.height/2);

	// Center world around the player
	offset.x = Math_round(
		0 - player.x + (canvas.width / 2)
	);
	offset.y = Math_round(
		0 - player.y + (canvas.height / 2)
	);
	ctx.translate(offset.x, offset.y);

	// Only entities fully within these bounds should be rendered
	var maxExtent = Math_max(canvas.width, canvas.height) * 1.4;
	renderBounds.x1 = Math_round(player.x - (maxExtent / 2));
	renderBounds.y1 = Math_round(player.y - (maxExtent / 2));
	renderBounds.x2 = Math_round(player.x + (maxExtent / 2));
	renderBounds.y2 = Math_round(player.y + (maxExtent / 2));
	renderBounds.x1 = Math_max(renderBounds.x1, 0);
	renderBounds.y1 = Math_max(renderBounds.y1, 0);
	renderBounds.x2 = Math_min(renderBounds.x2, universe.mapWidth * universe.tileSize);
	renderBounds.y2 = Math_min(renderBounds.y2, universe.mapHeight * universe.tileSize);

	drawBG();
	drawEntities();
	drawHUD();

	if (blackOverlay > 0.01) {
		ctx.fillStyle = Color_Black;
		ctx.globalAlpha = blackOverlay;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1.0;
	}

	if (player.lives == 0) {
		drawFinishedScore();
	} else {
		drawScore();
	}

	if (hasTouchEvents) {
		drawVirtualJoysticks();
	}
}


function drawBG()
{
	var width = renderBounds.x2 - renderBounds.x1;
	var height = renderBounds.y2 - renderBounds.y1;

	ctx.drawImage(
		cachedTiles,
		renderBounds.x1/universe.tileSize, renderBounds.y1/universe.tileSize,
		width/universe.tileSize, height/universe.tileSize,
		renderBounds.x1, renderBounds.y1,
		width, height
	);
}


function drawEntities()
{
	var i;

	player.render(ctx);

	for (i = 0; i < gravSource.length; ++i) {
		if (pointInBounds(gravSource[i], renderBounds)) {
			gravSource[i].render(ctx);
		}
	}

	for (i = 0; i < enemies.length; ++i) {
		if (enemies[i].alive) enemies[i].render(ctx);
	}

	for (i = 0; i < collectables.length; ++i) {
		if (collectables[i].alive) collectables[i].render(ctx);
	}

	ctx.fillStyle = Color_Black;
	for (i = 0; i < bullets.length; ++i) {
		bullets[i].render(ctx);
	}
}


function drawHUD()
{
	ctx.globalAlpha = 1;
	ctx.fillStyle = Color_White;
	for (var i = 0; i < overlayWords.length; ++i) {
		overlayWords[i].render(overlayWords[i], ctx);
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.drawImage(cachedCrosshair, mouse.x - 15, mouse.y - 15);
}


function drawScore()
{
	for (i = 0; i < player.lives; ++i) {
		ctx.drawImage(heart, 20 + (22 * i), 20);
	}

	ctx.fillStyle = Color_White;
	ctx.font = '12px monospace';

	ctx.drawImage(elec, 20, 50);
	ctx.fillText('\u00D7 ' + player.collected, 50, 61);

	ctx.drawImage(bug,  0, 0, 18, 22,  20, 80, 18, 22);
	ctx.fillText('\u00D7 ' + player.kills, 50, 92);

	ctx.fillText(Math_floor(player.score) + ' pts', 20, 130);
}


function drawFinishedScore()
{
	var ctr = function(txt, y) {
		var metrics = ctx.measureText(txt);
		ctx.fillText(txt, (canvas.width - metrics.width) / 2, y);
	};

	ctx.fillStyle = Color_Black;

	ctx.font = '40px serif';
	ctr('GAME OVER', 75);

	ctx.font = '20px sans';
	ctr('Collected ' + player.collected + ' circuit board' + (player.collected == 1 ? '' : 's'), 150);
	ctr('Killed ' + player.kills + ' bug' + (player.kills == 1 ? '' : 's'), 180);
	ctr('Survived ' + totalGameTime.toFixed(1) + ' seconds', 210);
	ctr('CLICK ANYWHERE TO START OVER', canvas.height - 100);

	ctx.font = '26px sans';
	ctr((player.collected * SCORE_COLLECT + player.kills * SCORE_KILL) + ' points', 260);
}


function drawVirtualJoysticks() {
	ctx.fillStyle = Color_White;

	ctx.beginPath();
	ctx.arc(100, canvas.height - 100, 50, 0, Math_PI * 2);
	ctx.arc(180, canvas.height - 100, 25, 0, Math_PI * 2);
	ctx.arc(canvas.width - 100, canvas.height - 100, 50, 0, Math_PI * 2);
	ctx.fill();

	ctx.fillStyle = Color_Black;
	ctx.font = '12px monospace';
	ctx.fillText('C', 176, canvas.height - 95);
	ctx.font = '28px monospace';
	ctx.fillText('F', 90, canvas.height - 90);
	ctx.fillText('M', canvas.width - 110, canvas.height - 90);
}


function drawTiles(ctx, canvas)
{
	ctx.fillStyle = universe.colors[0];
	for (var y = 0; y < universe.mapHeight; ++y) {
		for (var x = 0; x < universe.mapWidth; ++x) {
			if (!getTile(x, y)) {
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
}
