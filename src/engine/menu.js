var MENU_WIDTH = 700;
var MENU_HEIGHT = 500;


function drawMenu()
{
	var metrics;

	ctx.translate((canvas.width - MENU_WIDTH) / 2, (canvas.height - MENU_HEIGHT) / 2);

	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, MENU_WIDTH, MENU_HEIGHT);

	ctx.font = '36px sans';
	ctx.fillStyle = '#000';
	metrics = ctx.measureText('Lost Worlds');
	ctx.fillText('Lost Worlds', (MENU_WIDTH - metrics.width) / 2, 75);

	ctx.fillStyle = '#333';
	ctx.fillRect(200, 200, 300, 100);
	ctx.fillStyle = '#fff';
	metrics = ctx.measureText('GOGOGOGOGO');
	ctx.fillText('GOGOGOGOGO', 200 + (300 - metrics.width) / 2, 260);
	
	ctx.font = '12px monospace';
}