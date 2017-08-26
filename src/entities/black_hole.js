function BlackHole(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;

    this.dist = 0;
    this.strength = 0;

    var particles = [];
    for (var i = 0; i < 250; ++i) {
        particles.push({
            rot: getRandom(0, Math_PI * 2),
            dist: getRandom(0, 98)
        });
    }


    this.update = function(delta) {
        for (var i = 0; i < particles.length; ++i) {
            var p = particles[i];

            p.rot += 1.0 * delta;    // spin
            p.dist -= 20.0 * delta;   // fall inwards

            if (p.dist <= 0) {
                p.rot = getRandom(0, Math_PI * 2),
                p.dist = 100;
            }
        }
    };


    this.render = function(ctx) {
        ctx.translate(this.x, this.y);

        var x, y, p;
        ctx.strokeStyle = '#fff';
        for (var i = 0; i < particles.length; ++i) {
            p = particles[i];

            ctx.beginPath();

            x = Math_cos(p.rot) * (p.dist + 37);
            y = Math_sin(p.rot) * (p.dist + 37);
            ctx.moveTo(x, y);

            x = Math_cos(p.rot + 0.05) * (p.dist + 35);
            y = Math_sin(p.rot + 0.05) * (p.dist + 35);
            ctx.lineTo(x, y);

            ctx.globalAlpha = 1.0 - (p.dist / 100);
            ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, 2 * Math_PI);
        ctx.fill();
        ctx.stroke();

        ctx.translate(-this.x, -this.y);
    };
}
