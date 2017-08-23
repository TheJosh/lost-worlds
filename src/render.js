var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var universeRot = 0;
var universeRotDir = 0.0;
var offset = { x: 0, y: 0 };

function resizeRenderCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmouseenter = mousemove;
}


function render() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.fillStyle = '#34190A';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	universeRot += universeRotDir;
	if (universe.spinLimit > 0 && Math.abs(universeRot) >= universe.spinLimit) {
		universeRotDir = 0 - universeRotDir;
	}

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(universeRot * Math.PI / 180);
	ctx.translate(0 - canvas.width/2, 0 - canvas.height/2);

	offset.x = Math.round(
		0 - player.x + (canvas.width / 2)
	);
	offset.y = Math.round(
		0 - player.y + (canvas.height / 2)
	);
	ctx.translate(offset.x, offset.y);

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
			ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
	}

	ctx.translate(player.x, player.y);
	ctx.rotate(player.rot);
	ctx.fillStyle = '#f00';
	ctx.fillRect(-HALF_PLAYER_SIZE, -HALF_PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
	ctx.fillRect(-HALF_PLAYER_SIZE - 5, -3, 6, 6);
	ctx.rotate(-player.rot);
	ctx.translate(-player.x, -player.y);

	ctx.fillStyle = '#fff';
	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		ctx.beginPath();
		ctx.arc(src.x, src.y, 20, 0, 2 * Math.PI);
		ctx.fill();
	}

	var fps = fpsRingBuf.reduce(function(x,y) {
		return x + y;
	}) / fpsRingBuf.length;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = '#fff';
	ctx.fillText(fps.toFixed(1) + ' fps', 20, 20);
}
