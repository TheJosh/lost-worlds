var accel = { x: 0, y: 0 };
var totalGameTime = 0;

function physics(delta)
{
	if (player.lives > 0) {
		totalGameTime += delta;
	}

	universeRot += universeRotDir * delta;
	if (universe.spinLimit > 0.2 && Math_abs(universeRot) >= universe.spinLimit) {
		universeRotDir = 0 - universeRotDir;
	}

	if (blackOverlay > 0.01) {
		blackOverlay -= 0.5 * delta;
	}

	for (var i = 0; i < overlayWords.length; ++i) {
		if (overlayWords[i].update) {
			overlayWords[i].update(overlayWords[i], delta);
		}
	}
	for (var i = 0; i < enemies.length; ++i) {
		if (enemies[i].alive) enemies[i].update(delta);
	}
	for (var i = 0; i < bullets.length; ++i) {
		bullets[i].update(delta);
	}

	BlackHole.updateParticles(delta);

	checkBulletsHitEnemies();

	bullets = bullets.filter(function(b){
		return b.alive;
	});

	var force = { x: 0.0, y: 0.0 }
	movePlayer_TopView(force, delta);
	applyGravityPull(force, delta);
	
	player.x += force.x;
	player.y += force.y;

	checkCollide(player, HALF_PLAYER_SIZE);

	for (var i = 0; i < enemies.length; ++i) {
		if (!enemies[i].alive) continue;
		var distSq = Math_pow(player.x - enemies[i].x, 2) + Math_pow(player.y - enemies[i].y, 2);
		if (distSq < enemies[i].hitDistSq) {
			player.takeDamage(enemies[i]);
		}
	}

	for (var i = 0; i < collectables.length; ++i) {
		if (!collectables[i].alive) continue;
		var distSq = Math_pow(player.x - collectables[i].x, 2) + Math_pow(player.y - collectables[i].y, 2);
		if (distSq < collectables[i].hitDistSq) {
			collectables[i].touchPlayer();
		}
	}

	player.update(delta);

	if (keys.fire) {
		player.fire(delta);
	}

	var desiredScore = (player.collected * SCORE_COLLECT + player.kills * SCORE_KILL);
	if (player.score < desiredScore) {
		player.score += 20 * delta;
	}
}


function movePlayer_TopView(force, delta)
{
	// Point player towards the mouse
	if (mouse.x && mouse.y) {
		player.rot = Math_atan2(
			(mouse.y - canvas.height/2), (mouse.x - canvas.width/2)
		) + Math_PI;
		
		player.rot -= (universeRot * Math.PI / 180);
	}

	// Forwards and backwards
	if (keys.y != 0) {
		accel.y += (keys.y * universe.unitAccel * delta);
		if (accel.y > universe.unitMax) accel.y = universe.unitMax;
		if (accel.y < 0 - universe.unitMax) accel.y = 0 - universe.unitMax;
	} else {
		accel.y /= universe.unitDeccel;
	}
	force.x += Math_cos(player.rot) * accel.y * delta;
	force.y += Math_sin(player.rot) * accel.y * delta;

	player.vel = -accel.y;
}


function applyGravityPull(force, delta)
{
	var maxDist = universe.tileSize * 14;

	for (var i = 0; i < gravSource.length; ++i) {
		var src = gravSource[i];
		var dist = Math_sqrt(Math_pow(player.x - src.x, 2) + Math_pow(player.y - src.y, 2));

		if (dist > maxDist) {
			continue;
		}

		if (dist < 30) {
			enteredBlackHole(gravSource[i]);
			continue;
		}

		var strength = 1.0 / (dist * dist) * 1000.0;
		force.x -= ((player.x - src.x) / 1.0 * strength);
		force.y -= ((player.y - src.y) / 1.0 * strength);
	}
}


function checkBulletsHitEnemies() {
	var ei, el, bi, bl;

	// This is a dirty dirty double-linear search. YUK.
	for (ei = 0, el = enemies.length; ei < el; ++ei) {
		for (bi = 0, bl = bullets.length; bi < bl; ++bi) {
			var distSq = Math_pow(bullets[bi].x - enemies[ei].x, 2) + Math_pow(bullets[bi].y - enemies[ei].y, 2);
			if (distSq < enemies[ei].hitDistSq) {
				enemies[ei].takeDamage(bullets[bi]);
			}
		}
	}
}


function checkCollide(entity, halfSize, hit) {
	collideDir(entity, halfSize, -1.0, 0.0, hit);
	collideDir(entity, halfSize, +1.0, 0.0, hit);
	collideDir(entity, halfSize, 0.0, -1.0, hit);
	collideDir(entity, halfSize, 0.0, +1.0, hit);
	repairBrokenPosition(entity);
}

function collideDir(entity, halfSize, xSign, ySign, hit) {
	var tileX = Math_floor((entity.x + halfSize * xSign) / universe.tileSize);
	var tileY = Math_floor((entity.y + halfSize * ySign) / universe.tileSize);

	var tile = getTile(tileX, tileY);

	if (tile > 0) {
		if (xSign != 0) {
			var tileXpx = tileX * universe.tileSize;
			if (xSign < 0) tileXpx += universe.tileSize;
			entity.x =  tileXpx - (halfSize * xSign);
			hit && hit.call(entity, 'x', xSign);
		}

		if (ySign != 0) {
			var tileYpx = tileY * universe.tileSize;
			if (ySign < 0) tileYpx += universe.tileSize;
			entity.y =  tileYpx - (halfSize * ySign);
			hit && hit.call(entity, 'y', ySign);
		}
	}
}

function repairBrokenPosition(entity) {
	var tileX = Math_floor(entity.x / universe.tileSize);
	var tileY = Math_floor(entity.y / universe.tileSize);
	var tile = getTile(tileX, tileY);
	if (tile == 0) return;

	var valid = findValidTiles(tileX, tileY, 3);
	if (valid.length) {
		valid.sort(function(a,b) {
			return (b[2] - a[2]);
		});
		valid = valid.pop();
		entity.x = valid[0] * universe.tileSize;
		entity.y = valid[1] * universe.tileSize;
	}
}

function findValidTiles(x, y, radius) {
	var tx, sx = x - radius; mx = x + radius;
	var ty, sy = y - radius; my = y + radius;

	var valid = [];
	for (ty = sy; ty <= my; ++ty) {
		for (tx = sx; tx <= mx; ++tx) {
			var tile = getTile(tx, ty);
			if (tile == 0) {
				var manHatDist = Math_abs(x - tx) + Math_abs(y - ty);
				valid.push([tx, ty, manHatDist]);
			}
		}
	}

	return valid;
}


function checkCollideTiny(entity, hit) {
	var tileX = Math_floor(entity.x / universe.tileSize);
	var tileY = Math_floor(entity.y / universe.tileSize);

	var tile = getTile(tileX, tileY);

	if (tile > 0) {
		hit.apply(entity);
	}
}
