var canvas;

function size() {
	canvas = document.getElementById('c');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
size();
window.onresize = size;
window.onkeydown = keydown;
window.onkeyup = keyup;

var ctx = document.getElementById('c').getContext('2d');

var player = { x: 550, y: 550 };
var gravSource = [
	{ x: 200, y: 200, dist: 0, strength: 0, dirY: 2 },
	{ x: 600, y: 200, dist: 0, strength: 0, dirY: 2 }
];

var mapTiles = [];

var keys = {
	x: 0,
	y: 0
};


function frame(timestamp) {
	movePlayer();
	//physics();
	render();
	requestAnimationFrame(frame);
}

load();
requestAnimationFrame(frame);


function movePlayer() {
	player.x += (keys.x * 10);
	player.y += (keys.y * 10);
}

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

function keydown(e) {
	switch (e.key) {
		case 'ArrowDown': keys.y = 1; break;
		case 'ArrowUp': keys.y = -1; break;
		case 'ArrowLeft': keys.x = -1; break;
		case 'ArrowRight': keys.x = 1; break;
	}
}

function keyup(e) {
	switch (e.key) {
		case 'ArrowDown':
		case 'ArrowUp': keys.y = 0; break;
		case 'ArrowLeft':
		case 'ArrowRight': keys.x = 0; break;
	}
}

function render() {
	ctx.fillStyle = '#180B00';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var offset = {
		x: 0 - player.x + (canvas.width / 2),
		y: 0 - player.y + (canvas.height / 2),
	};

	for (var y = 0; y <= 64; ++y) {
		for (var x = 0; x <= 256; ++x) {
			var tile = mapTiles[256 * y + x];
			switch (tile) {
				case 0: continue;
				case 1: ctx.fillStyle = '#34190A'; break;
				case 2: ctx.fillStyle = '#C0C8CF'; break;
				case 3: ctx.fillStyle = '#630E1B'; break;
			}
			ctx.fillRect(x * 32 + offset.x, y * 32 + offset.y, 32, 32);
		}
	}

	ctx.fillStyle = '#f00';
	ctx.beginPath();
	ctx.arc(player.x + offset.x, player.y + offset.y, 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillText(
		player.x.toFixed(2) + 'x' + player.y.toFixed(2),
		player.x - 35 + offset.x, player.y - 30 + offset.y
	);

	ctx.fillStyle = '#fff';
	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		ctx.beginPath();
		ctx.arc(src.x + offset.x, src.y + offset.y, 20, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillText(
			src.x.toFixed(2) + 'x' + src.y.toFixed(2) + ' -- ' + src.dist.toFixed(2) + ' -- ' + src.strength.toFixed(2),
			gravSource[i].x - 80 + offset.x, gravSource[i].y - 30 + offset.y
		);
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
