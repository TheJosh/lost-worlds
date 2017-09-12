// Preload sounds
(function() {
	var sounds = '47acx';
	for (i = 0; i < sounds.length; ++i) {
		new Audio(sounds.charAt(i) + '.mp3');
	}
})();


function playSound(name, rate)
{
    var snd = new Audio(name + '.mp3');
    snd.playbackRate = rate;
    snd.play();
}
