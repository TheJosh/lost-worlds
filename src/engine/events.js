var keys = { x: 0, y: 0, fire: 0 };
var mouse = { x: 0, y: 0 };


window.onmousemove = function(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

window.onmousedown = function(e) {
	keys.fire = 1;
};

window.onmouseup = function(e) {
	keys.fire = 0;
};

window.onkeydown = function(e) {
	switch (e.key) {
		case 'w': keys.y = -1; break;
		case 's': keys.y = 1; break;
		case 'a': keys.x = -1; break;
		case 'd': keys.x = 1; break;
	}
};

window.onkeyup = function(e) {
	switch (e.key) {
		case 'w':
		case 's': keys.y = 0; break;
		case 'a':
		case 'd': keys.x = 0; break;
	}
};
