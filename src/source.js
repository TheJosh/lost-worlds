var canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = document.getElementById('c').getContext('2d');

var player = { x: 400, y: 400 };
var gravSource = [
	{ x: 200, y: 200, dirY: 2 },
	{ x: 600, y: 200, dirY: 2 }
];

var mapTiles = [];


function frame(timestamp) {
	physics();
	render();
	requestAnimationFrame(frame);
}

load();
requestAnimationFrame(frame);


function physics() {
	var force = { x: 0.0, y: 0.0 }
	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		src.dist = Math.sqrt(Math.pow(player.x - src.x, 2) + Math.pow(player.y - src.y, 2));

		if (src.dist > 30) {
			src.strength = 1.0 / (src.dist * src.dist);
			src.strength *= 2000.0;
			force.x -= ((player.x - src.x) / 1.0 * src.strength);
			force.y -= ((player.y - src.y) / 1.0 * src.strength);
		}

		src.y += src.dirY;
		if (src.y > 600 || src.y < 200) {
			src.dirY = 0 - src.dirY;
		}
	}

	player.x += force.x;
	player.y += force.y;
}

function render() {
	ctx.fillStyle = '#180B00';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var y = 0; y <= 64; ++y) {
		for (var x = 0; x <= 256; ++x) {
			var tile = mapTiles[256 * y + x];
			switch (tile) {
				case 0: continue;
				case 1: ctx.fillStyle = '#34190A'; break;
				case 2: ctx.fillStyle = '#C0C8CF'; break;
				case 3: ctx.fillStyle = '#630E1B'; break;
			}
			ctx.fillRect(x * 32, y * 32, 32, 32);
		}
	}

	ctx.fillStyle = '#f00';
	ctx.beginPath();
	ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillText(player.x + ' ' + player.y, player.x - 50, player.y - 30);

	ctx.fillStyle = '#00f';
	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		ctx.beginPath();
		ctx.arc(src.x, src.y, 20, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillText(src.x + ' ' + src.y + ' ' + src.dist + ' ' + src.strength, gravSource[i].x - 50, gravSource[i].y - 30);
	}
}

function load() {
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
			var byte = pixels.data[i];

			var cell4 = (byte & 0b11000000) >>> 6;
			var cell3 = (byte & 0b00110000) >>> 4;
			var cell2 = (byte & 0b00001100) >>> 2;
			var cell1 = (byte & 0b00000011);

			mapTiles.push(cell4);
			mapTiles.push(cell3);
			mapTiles.push(cell2);
			mapTiles.push(cell1);
		}
	};

	img.crossOrigin = 'anonymous';
	img.src = 'map.png';
}
