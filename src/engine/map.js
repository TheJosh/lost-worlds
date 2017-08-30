var mapBuffer, mapTiles;


function getTile(x, y) {
	return mapTiles[universe.mapWidth * y + x];
}


function setTile(x, y, val) {
	mapTiles[universe.mapWidth * y + x] = val;
}


function generateNewMap() {
	gravSource.length = 0;
	enemies.length = 0;
	collectables.length = 0;
	bullets.length = 0;
	overlayWords.length = 0;

	universe.mapWidth = 100;
	universe.mapHeight = 100;

	mapBuffer = new ArrayBuffer(universe.mapWidth * universe.mapHeight);
	mapTiles = new Uint8Array(mapBuffer);
	mapTiles.fill(1);

	var pois = [];

	var spawnX = Math_floor(getRandom(10, universe.mapWidth - 20));
	var spawnY = Math_floor(getRandom(10, universe.mapHeight - 20));
	player.spawn(spawnX, spawnY);
	generateCircle(spawnX, spawnY, 8, 0);
	pois.push({ x: spawnX, y: spawnY });

	for (var i = 0; i < 7; ++i) {
		var x = Math_floor(getRandom(10, universe.mapWidth - 20));
		var y = Math_floor(getRandom(10, universe.mapHeight - 20));
		generateCircle(x, y, 8, 0);
		pois.push({ x: x, y: y });
	}

	while (pois.length >= 2) {
		var a = pois.pop();
		var b = pois.pop();
		generateLine(a.x, a.y, b.x, b.y, 0);
	}

	postMapLoad();
}


function generateCircle(originX, originY, radius, val)
{
	var x, y;
	var radiusSquared = radius * radius;

	// Brute force circle drawing
	for(y = -radius; y <= radius; ++y) {
		for(x = -radius; x <= radius; ++x) {
			if ((x * x + y * y) <= radiusSquared) {
				setTile(originX + x, originY + y, val);
			}
		}
	}
}


function generateLine(x0, y0, x1, y1, val)
{
	if (x1 < x0) x1 = [x0, x0 = x1][0];
	if (y1 < y0) y1 = [y0, y0 = y1][0];

	// Bresenham cannot handle vertical lines
	if (x0 == x1) {
		for (var y = y0; y <= y1; ++y) {
			setTile(x0, y, val);
		}
		return;
	}

	var deltax = x1 - x0;
	var deltay = y1 - y0;
	var deltaerr = Math_abs(deltay / deltax);
	var error = deltaerr - 0.5;

	var y = y0;
	for (var x = x0; x <= x1; ++x) {
		setTile(x, y, val);

		error += deltaerr;
		if (error >= 0.5) {
			y += 1;
			error -= 1.0;
		}
	}
}
