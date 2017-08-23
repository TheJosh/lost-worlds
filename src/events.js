var keys = { x: 0, y: 0 };
var mouse = { x: 0, y: 0 };

function mousemove(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

function keydown(e) {
	switch (e.key) {
		case 'w': keys.y = -1; break;
		case 's': keys.y = 1; break;
		case 'a': keys.x = -1; break;
		case 'd': keys.x = 1; break;
	}
}

function keyup(e) {
	switch (e.key) {
		case 'w':
		case 's': keys.y = 0; break;
		case 'a':
		case 'd': keys.x = 0; break;
	}
}
