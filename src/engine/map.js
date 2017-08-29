var mapTiles = [];


function getTile(x, y) {
	return mapTiles[universe.mapWidth * y + x];
}


function setTile(x, y, val) {
	mapTiles[universe.mapWidth * y + x] = val;
}


function loadMap() {
	gravSource.length = 0;
	enemies.length = 0;
	collectables.length = 0;
	bullets.length = 0;
	overlayWords.length = 0;

	// TODO: Eventually the procedural generator goes here
	loadInitMap();

}
