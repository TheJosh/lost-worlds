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


function generateRect3x3(x, y, val)
{
	--x; --y; i = 9;
	while (i-- != 0) {
		setTile(x, y, val);
		x++;
		if (i % 3 == 0) { x -= 3; ++y; }
	}
}


/**
 * Bresenham's line algorithm
 */
function generateLine(x0, y0, x1, y1, val) {
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var sx = (x0 < x1) ? 1 : -1;
	var sy = (y0 < y1) ? 1 : -1;
	var err = dx - dy;

	while (true) {
		generateRect3x3(x0, y0, val);

		if ((x0 == x1) && (y0 == y1)) {
			break;
		}

		var e2 = 2 * err;
		if (e2 > -dy){
			err -= dy;
			x0 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y0  += sy;
		}
	}
}
