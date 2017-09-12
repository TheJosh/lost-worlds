var playSound;

var soundsPCM = {};

var soundsMP3 = {
    '4': '/+MYxAALMG5kAUIAAP///U4GLcmIAQWDgIO/BwEP6fBB0QAmD7/yhzrB8/KO//B//B//xOH/WCDo'
        + 'ffbZv/epboKZNQszBbhQ/+MYxA4Qgta8AY04AYKQ5D5X7FvVf5V0KEFewSHuD8gfPPcaGeYXEUVD'
        + 'h6m4PjFOKzE/////////8wz/msp5AxVWsA1JQNB//+MYxAcO8SbWWc1IALKTdDp369PXOjUBRU2S'
        + 'ZJJFF0/S99P//oAUVtpvk4UARGCDDgCGbAr4Z4SS7////BS33H+lPQUOBqd2/+MYxAYOQR7lmAKG'
        + 'Em0un02PBfAOFo4kZ4hFZvf//65cI7pRDIIGFA19YVLohWfQ956K////y31tSc/+rpNLjAIADAKA'
        + 'KOZA/+MYxAgMSQ7mWABMJO4HpMlZYIu4t8de9kMtCdIJkEwUq5bfOyzm6JQ356sgg1//////5WgK'
        + 'Kh6QACIAMP//+zVsGIpySLqv/+MYxBENAJbqWUYQAJ4++2nugmRQCQRB4aBhit+JHCywCTcl1Tf/'
        + '//////iMHwsbQEAoCgcFAoFAgFUkf8eBuiMb/EbNA7g+/+MYxBgTOnrqWY04An+IwpMdWQ4d0/MC'
        + 'oSA5EoSQBRalDlKJ/y6hCBUalj1dv//+x9zHazt////Rd3SynCMS//wNTEFNRTMu/+MYxAYAAANI'
        + 'AcAAADk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
        + 'VVVVVVVV'
};

var audioCtx = window.AudioContext || window.webkitAudioContext;
if (audioCtx) {
    audioCtx = new audioCtx();
    playSound = playSound_AudioAPI;

    // Load all sounds
    (function() {
        for (i in soundsMP3) {
            audioCtx.decodeAudioData(soundsMP3[i], function(buffer) {
                soundsPCM[i] = buffer;
            });
        }
    })();

} else {
    playSound = playSound_Legacy;
}


function playSound_AudioAPI(code, rate)
{
    console.log(name, rate);

    var snd = new Audio(name + '.mp3');
    var source = audioCtx.createBufferSource();

    source.buffer = soundsPCM[code];

    source.connect(audioCtx.destination);
}


function playSound_Legacy(code, rate)
{
    var snd = new Audio(name + '.mp3');
    snd.playbackRate = rate;
    snd.play();
}
