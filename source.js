var ctx = document.getElementById('c').getContext('2d');

function frame(timestamp) {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, 800, 800);

	ctx.fillStyle = '#fff';
	ctx.fillText(timestamp, 20, 20);

	requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

