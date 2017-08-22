var mapTiles = [];


function getTile(x, y) {
	return mapTiles[256 * y + x];
}


function setTile(x, y, val) {
	mapTiles[256 * y + x] = val;
}


function loadMap() {
	var img = document.createElement('img');

	img.onload = function() {
		console.log('onload');

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

			mapTiles.push(cell4);
			mapTiles.push(cell3);
			mapTiles.push(cell2);
			mapTiles.push(cell1);
		}

		for (var y = 0; y <= 64; ++y) {
			for (var x = 0; x <= 256; ++x) {
				var tile = getTile(x, y);
				if (tile == 1) {
					if (getTile(x - 1, y) == 0 || getTile(x + 1, y) == 0 || getTile(x, y - 1) == 0 || getTile(x, y + 1) == 0) {
						setTile(x, y, -1);
					}
				}
			}
		}
	};

	img.crossOrigin = 'anonymous';
	img.src = 'map.png';
}
