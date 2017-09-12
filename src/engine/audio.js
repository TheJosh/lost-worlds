var playSound;

var audioCtx = window.AudioContext || window.webkitAudioContext;
if (audioCtx) {
    audioCtx = new audioCtx();
    playSound = playSound_AudioAPI;
} else {
    playSound = playSound_Legacy;
}


// Preload sounds
(function() {
	var sounds = '47acx';
	for (i = 0; i < sounds.length; ++i) {
		new Audio(sounds.charAt(i) + '.mp3');
	}
})();


function playSound_AudioAPI(name, rate)
{
    playSound_Legacy(name, rate);
}


function playSound_Legacy(name, rate)
{
    var snd = new Audio(name + '.mp3');
    snd.playbackRate = rate;
    snd.play();
}
