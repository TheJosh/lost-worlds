var keys = { y: 0, fire: 0 };
var mouse = { x: 0, y: 0 };
var touchId = { move: null, aim: null };
var hasTouchEvents = ('createTouch' in document);


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
		case 'c': player.changeWeapon(); break;
	}
};

window.onkeyup = function(e) {
	switch (e.key) {
		case 'w':
		case 's': keys.y = 0; break;
	}
};



function determineTouchType(t) {
	if (t.clientY > (canvas.height - 150) && t.clientY < (canvas.height - 50)) {
		if (t.clientX > 50 && t.clientX < 150) {
			return 'move';
		} else if (t.clientX > (canvas.width - 150) && t.clientX < (canvas.width - 50)) {
			return 'aim';
		}
	}
}

window.ontouchstart = function(e) {
	var type = determineTouchType(e.changedTouches[0]);
	if (!type) return;

	touchId[type] = e.changedTouches[0].identifier;
	
	// Tapping the move joystick fires the weapon
	if (type == 'move') {
		keys.fire = 1;
	}
};

window.ontouchend = function(e) {
	for (type in touchId) {
		if (touchId[type] == e.changedTouches[0].identifier) {
			touchId[type] = null;
		}
	}

	if (touchId.move === null) {
		keys.y = 0;
	}
};


window.ontouchmove = function(e) {
	e.preventDefault();

	for (i = 0; i < e.changedTouches.length; ++i) {
		var t = e.changedTouches.item(i);

		if (touchId.aim === t.identifier) {
			// Aim - virtual joystick
			var x = canvas.width - t.clientX - 100;
			var y = canvas.height - t.clientY - 100;

			mouse.x = (canvas.width / 2) - (x * 2);
			mouse.y = (canvas.height / 2) - (y * 2);

		} else if (touchId.move === t.identifier) {
			// Move - virtual joystick
			var y = canvas.height - t.clientY - 100;
			if (y > 25) {
				keys.y = -1;
			} else if (y < -25) {
				keys.y = 1;
			} else {
				keys.y = 0;
			}
		}
	}
};
