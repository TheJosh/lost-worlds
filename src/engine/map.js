var mapTiles = [];


function getTile(x, y) {
	return mapTiles[256 * y + x];
}


function setTile(x, y, val) {
	mapTiles[256 * y + x] = val;
}


function loadMap() {
	player = new Player(16, 16);

	gravSource = [
		new BlackHole(144, 2),
		new BlackHole(128, 32)
	];

	enemies = [
		new Enemy(38, 15),
		new Enemy(39, 16),
		new Enemy(40, 17)
	];


	var img = document.createElement('img');

	img.onload = function() {
		var canvas = document.createElement('canvas');
		canvas.width = canvas.height = 64;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var pixels = ctx.getImageData(0, 0, 64, 64);

		mapTiles = [];
		var x = 0;
		var y = 0;
		for (var i = 0; i < pixels.data.length; i += 4) {
			var pxl = pixels.data[i];

			var cell4 = (pxl & parseInt('11000000', 2)) >>> 6;
			var cell3 = (pxl & parseInt('00110000', 2)) >>> 4;
			var cell2 = (pxl & parseInt('00001100', 2)) >>> 2;
			var cell1 = (pxl & parseInt('00000011', 2));

			mapTiles.push({ type: cell4 });
			mapTiles.push({ type: cell3 });
			mapTiles.push({ type: cell2 });
			mapTiles.push({ type: cell1 });
		}

		for (var y = 0; y < 64; ++y) {
			for (var x = 0; x < 256; ++x) {
				var t, tile = getTile(x, y);
				if (tile.type == 0) {
					t = getTile(x - 1, y);
					if (t && t.type != 0) tile.wallLeft = 1;
					
					t = getTile(x + 1, y);
					if (t && t.type != 0) tile.wallRight = 1;
					
					t = getTile(x, y - 1);
					if (t && t.type != 0) tile.wallUp = 1;
					
					t = getTile(x, y + 1);
					if (t && t.type != 0) tile.wallDown = 1;
				}
			}
		}

		postMapLoad();
	};

	img.crossOrigin = 'anonymous';
	img.src = 'map.png';
}
