var black_hole_particles = [];


function BlackHole(x, y) {
    this.x = x * universe.tileSize;
    this.y = y * universe.tileSize;

    this.dist = 0;
    this.strength = 0;

    this.render = function(ctx) {
        ctx.translate(this.x, this.y);

        var x, y, p;
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = '#fff';
        for (var i = 0; i < black_hole_particles.length; ++i) {
            p = black_hole_particles[i];

            x = Math_cos(p.rot) * (p.dist + 37);
            y = Math_sin(p.rot) * (p.dist + 37);

            ctx.globalAlpha = 1.0 - (p.dist / 100);

            if (p.dist < 25) {
                ctx.fillRect(x, y, 1, 1);
            } else {
                ctx.beginPath();
                ctx.moveTo(x, y);

                x = Math_cos(p.rot + 0.05) * (p.dist + 35);
                y = Math_sin(p.rot + 0.05) * (p.dist + 35);
                ctx.lineTo(x, y);

                ctx.stroke();
            }
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


BlackHole.setupParticles = function() {
    for (var i = 0; i < 250; ++i) {
        black_hole_particles.push({
            rot: getRandom(0, Math_PI * 2),
            dist: getRandom(0, 98)
        });
    }
};


BlackHole.updateParticles = function(delta) {
    for (var i = 0; i < black_hole_particles.length; ++i) {
        var p = black_hole_particles[i];

        p.rot += (1.0 / p.dist * 70) * delta;    // spin
        p.dist -= 20.0 * delta;   // fall inwards

        if (p.dist <= 0) {
            p.rot = getRandom(0, Math_PI * 2),
            p.dist = 100;
        }
    }
};
