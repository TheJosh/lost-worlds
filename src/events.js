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
