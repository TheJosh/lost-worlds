function physics(delta) {
	var force = { x: 0.0, y: 0.0 }

	if (keys.x != 0) {
		accel.x += (keys.x * 0.5);
		if (accel.x > 10) accel.x = 10;
		if (accel.x < -10) accel.x = -10;
	} else {
		accel.x /= 1.2;
	}

	if (keys.y != 0) {
		accel.y += (keys.y * 0.5);
		if (accel.y > 10) accel.y = 10;
		if (accel.y < -10) accel.y = -10;
	} else {
		accel.y /= 1.2;
	}

	force.x += accel.x;
	force.y += accel.y;

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

	collidePlayer(-1.0, 0.0);
	collidePlayer(+1.0, 0.0);
	collidePlayer(0.0, -1.0);
	collidePlayer(0.0, +1.0);
}


function collidePlayer(xSign, ySign) {
	var tileX = Math.floor((player.x + HALF_PLAYER_SIZE * xSign) / TILE_SIZE);
	var tileY = Math.floor((player.y + HALF_PLAYER_SIZE * ySign) / TILE_SIZE);

	var tileType = getTile(tileX, tileY);

	if (tileType > 0) {
		if (xSign != 0) {
			var tileXpx = tileX * TILE_SIZE;
			if (xSign < 0) tileXpx += TILE_SIZE;
			player.x =  tileXpx - (HALF_PLAYER_SIZE * xSign);
		}

		if (ySign != 0) {
			var tileYpx = tileY * TILE_SIZE;
			if (ySign < 0) tileYpx += TILE_SIZE;
			player.y =  tileYpx - (HALF_PLAYER_SIZE * ySign);
		}
	}
}
