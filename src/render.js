var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var rot = 0;
var rotDir = 0.1;

function resizeRenderCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function render() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.fillStyle = '#34190A';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	rot += rotDir;
	if (rot >= 10 || rot <= -10) {
		rotDir = 0 - rotDir;
	}

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(rot * Math.PI / 180);
	ctx.translate(0 - canvas.width/2, 0 - canvas.height/2);

	var offset = {
		x: 0 - player.x + (canvas.width / 2),
		y: 0 - player.y + (canvas.height / 2)
	};
	offset.x = Math.round(offset.x);
	offset.y = Math.round(offset.y);

	for (var y = 0; y <= 64; ++y) {
		for (var x = 0; x <= 256; ++x) {
			var tile = getTile(x, y);
			switch (tile) {
				case -1: ctx.fillStyle = '#2E1602'; break;   // dirt edge
				case  0: ctx.fillStyle = '#180B00'; break;   // none
				case  1: continue;
				case  2: ctx.fillStyle = '#D3D7DB'; break;   // steel
				case  3: ctx.fillStyle = '#630E1B'; break;   // lava
			}
			ctx.fillRect(x * TILE_SIZE + offset.x, y * TILE_SIZE + offset.y, TILE_SIZE, TILE_SIZE);
		}
	}

	ctx.fillStyle = '#f00';
	ctx.fillRect(player.x + offset.x - HALF_PLAYER_SIZE, player.y + offset.y - HALF_PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
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

	var fps = fpsRingBuf.reduce(function(x,y) {
		return x + y;
	}) / fpsRingBuf.length;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = '#fff';
	ctx.fillText(fps.toFixed(1) + ' fps', 20, 20);
}
