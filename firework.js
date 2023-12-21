function Firework(colour, x, y) {
  var colour = colour;
  var x = x;
  var y = y;

  var particles = [];
  this.depleted = false;

  for (var i = 0; i < 360; i += 18) {
    particles.push(new FireworkParticle(x, y, colour, i, 10));
  }

  this.draw = function () {
    for (var i = 0; i < particles.length; i++) {
      particles[i].draw();
    }

    if (particles[0].speed <= 0) {
      this.depleted = true;
    }
  };
}
