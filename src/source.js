var ctx = document.getElementById('c').getContext('2d');

var player = { x: 400, y: 400 };
var gravSource = [
	{ x: 200, y: 200, dirY: 2 },
	{ x: 600, y: 200, dirY: 2 }
];

function frame(timestamp) {
	physics();
	render();
	requestAnimationFrame(frame);
}
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
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, 800, 800);

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
		var ctx = $canvas[0].getContext('2d');
		ctx.drawImage(img, 0, 0);
		var pixels = ctx.getImageData(0, 0, mapWidth / 4, mapHeight);

		var data = [];
		var x = 0;
		var y = 0;
		for (var i = 0; i < pixels.data.length; i += 4) {
			var byte = pixels.data[i];

			var cell4 = (byte & 0b11000000) >>> 6;
			var cell3 = (byte & 0b00110000) >>> 4;
			var cell2 = (byte & 0b00001100) >>> 2;
			var cell1 = (byte & 0b00000011);

			data.push(cell4);
			data.push(cell3);
			data.push(cell2);
			data.push(cell1);
		}

		// TODO: Actually use the data array!
	};

	img.crossOrigin = 'anonymous';
	img.src = 'map.png';
}
