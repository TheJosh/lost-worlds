var mapTiles = [];


function getTile(x, y) {
	return mapTiles[universe.mapWidth * y + x];
}


function setTile(x, y, val) {
	mapTiles[universe.mapWidth * y + x] = val;
}


function loadMap() {
	player = new Player(10, 7);

	gravSource = [
		new BlackHole(144, 2),
		new BlackHole(128, 32)
	];

	enemies = [
		new Enemy(37, 9),
		new Enemy(38, 16)
	];

	collectables = [
		new Collectable(29, 27)
	];


	universe.mapWidth = 49;
	universe.mapHeight = 31;

	for (i = 0; i < init_map.length; ++i) {
		var c = init_map.charAt(i);
		var val = parseInt(c, 10);
		if (!isNaN(val)) {
			mapTiles.push({ type: val });
		}
	}

	if (mapTiles.length != (universe.mapWidth * universe.mapHeight)) {
		alert('nope');
	}


		postMapLoad();
}
