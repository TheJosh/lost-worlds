var MENU_WIDTH = 700;
var MENU_HEIGHT = 500;


function menu()
{
	var raf = requestAnimationFrame(render);

	var buttons = [
		{
			x: 50, y: 400,
			w: 250, h: 50,
			b: '#555',
			t: 'FULLSCREEN',
			f: enterFullscreen
		},
		{
			x: 400, y: 400,
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
		ctx.fillStyle = Color_Black;
		metrics = ctx.measureText('LOST WORLDS');
		ctx.fillText('LOST WORLDS', (MENU_WIDTH - metrics.width) / 2, 75);

		ctx.font = '16px sans';
		ctx.fillText('W = forwards   S = backwards   LMB = shoot   C = change weapon', 50, 115);
		ctx.fillText('Your player moves forwards towards the mouse', 50, 140);

		ctx.font = '24px sans';
		for (var i = 0; i < buttons.length; ++i) {
			var btn = buttons[i];
			ctx.fillStyle = btn.b;
			ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
			ctx.fillStyle = Color_White;
			metrics = ctx.measureText(btn.t);
			ctx.fillText(btn.t, btn.x + (btn.w - metrics.width) / 2, btn.y + btn.h / 2 + 10);
		}

		player.rot = Math_atan2(
			(mouse.y - canvas.height/2-25), (mouse.x - canvas.width/2)
		) + Math_PI;

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(canvas.width/2, canvas.height/2+25);

		ctx.beginPath();
		ctx.arc(0, 0, 100, 0, 2 * Math_PI);
		ctx.fill();

		player.render(ctx);

		ctx.font = '16px monospace';
		ctx.fillStyle = Color_Black;
		ctx.rotate(player.rot - Math_PI/2);
		ctx.fillText('W', -5, -30);
		ctx.fillText('S', -5, 32);
		
		ctx.beginPath();
		ctx.moveTo(0, -55);
		ctx.lineTo(0, -80);
		ctx.lineTo(-5, -75);
		ctx.moveTo(5, -75);
		ctx.lineTo(0, -80);
		ctx.stroke();

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
		window.onclick = null;
		cancelAnimationFrame(raf);
		loadInitMap();
	}
}
