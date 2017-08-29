var mapTiles = [];


function getTile(x, y) {
	return mapTiles[universe.mapWidth * y + x];
}


function setTile(x, y, val) {
	mapTiles[universe.mapWidth * y + x] = val;
}


function loadMap() {
	
	// TODO: Eventually the procedural generator goes here
	loadInitMap();

}
