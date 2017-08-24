var keys = { x: 0, y: 0, jump: 0, fire: 0 };
var mouse = { x: 0, y: 0 };

function mousemove(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

function keydown(e) {
	switch (e.key) {
		case 'w': case 'ArrowUp': keys.y = -1; break;
		case 's': case 'ArrowDown': keys.y = 1; break;
		case 'a': case 'ArrowLeft': keys.x = -1; break;
		case 'd': case 'ArrowRight': keys.x = 1; break;
		case ' ': keys.jump = 1; break;
		case 'Shift': keys.fire = 1; break;
	}
}

function keyup(e) {
	switch (e.key) {
		case 'w': case 'ArrowUp':
		case 's': case 'ArrowDown': keys.y = 0; break;
		case 'a': case 'ArrowLeft':
		case 'd': case 'ArrowRight': keys.x = 0; break;
		case ' ': keys.jump = 0; break;
		case 'Shift': keys.fire = 0; break;
	}
}
