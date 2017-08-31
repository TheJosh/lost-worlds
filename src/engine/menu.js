var MENU_WIDTH = 700;
var MENU_HEIGHT = 500;


function menu()
{
	var raf = requestAnimationFrame(render);

	var buttons = [
		{
			x: 225, y: 330,
			w: 250, h: 50,
			b: '#555',
			t: 'FULLSCREEN',
			f: enterFullscreen
		},
		{
			x: 225, y: 400,
			w: 250, h: 50,
			b: '#333',
			t: 'START',
			f: startGame
		}
	];

	var menuGrad = ctx.createLinearGradient(0, 0, MENU_WIDTH, MENU_HEIGHT);
	menuGrad.addColorStop(0, '#DAE9C9');
	menuGrad.addColorStop(1, '#C8E3A8');

	function render() {
		var metrics;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		ctx.fillStyle = '#404E4C';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.translate((canvas.width - MENU_WIDTH) / 2, (canvas.height - MENU_HEIGHT) / 2);

		ctx.fillStyle = menuGrad;
		ctx.shadowColor = '#333';
		ctx.shadowBlur = 10;
		ctx.fillRect(0, 0, MENU_WIDTH, MENU_HEIGHT);
		ctx.shadowBlur = 0;

		ctx.font = '40px serif';
		ctx.fillStyle = '#000';
		metrics = ctx.measureText('LOST WORLDS');
		ctx.fillText('LOST WORLDS', (MENU_WIDTH - metrics.width) / 2, 75);

		ctx.font = '24px sans';
		for (var i = 0; i < buttons.length; ++i) {
			var btn = buttons[i];
			ctx.fillStyle = btn.b;
			ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
			ctx.fillStyle = '#fff';
			metrics = ctx.measureText(btn.t);
			ctx.fillText(btn.t, btn.x + (btn.w - metrics.width) / 2, btn.y + btn.h / 2 + 10);
		}

		raf = requestAnimationFrame(render);
	}


	window.onclick = function(e) {
		var clickX = e.clientX - (canvas.width - MENU_WIDTH) / 2;
		var clickY = e.clientY - (canvas.height - MENU_HEIGHT) / 2;

		for (var i = 0; i < buttons.length; ++i) {
			var btn = buttons[i];
			if (clickX >= btn.x && clickY >= btn.y && clickX <= (btn.x + btn.w) && clickY <= (btn.y + btn.h)) {
				btn.f(btn);
				return;
			}
		}
	};


	function enterFullscreen(btn) {
		canvas.webkitRequestFullscreen && canvas.webkitRequestFullscreen();
		canvas.mozRequestFullScreen && canvas.mozRequestFullScreen();
		canvas.msRequestFullscreen && canvas.msRequestFullscreen();
		canvas.requestFullscreen && canvas.requestFullscreen();
		btn.t = 'WINDOW';
		btn.f = cancelFullscreen;
	}


	function cancelFullscreen(btn) {
		document.webkitExitFullscreen && document.webkitExitFullscreen();
		document.mozCancelFullScreen && document.mozCancelFullScreen();
		document.msExitFullscreen && document.msExitFullscreen();
		document.exitFullscreen && document.exitFullscreen();
		btn.t = 'FULLSCREEN';
		btn.f = enterFullscreen;
	}


	function startGame() {
		cancelAnimationFrame(raf);
		loadInitMap();
	}
}
