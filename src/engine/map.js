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

	universe.mapWidth = 64;
	universe.mapHeight = 64;

	mapBuffer = new ArrayBuffer(universe.mapWidth * universe.mapHeight);
	mapTiles = new Uint8Array(mapBuffer);
	mapTiles.fill(1);

	var spawnX = Math_floor(getRandom(10, universe.mapWidth - 20));
	var spawnY = Math_floor(getRandom(10, universe.mapHeight - 20));

	player.spawn(spawnX, spawnY);
	generateCircle(spawnX, spawnY, 9, 0);

	// TODO: Eventually the procedural generator goes here

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
