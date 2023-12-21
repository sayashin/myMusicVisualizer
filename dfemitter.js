// Function to display fire
function Emitter(x, y, xSpeed, ySpeed, size, amplitude) {
  this.pos = createVector(x, y);
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = color(255, 230, 0, random(0, 255));

  this.startParticles = 0;
  this.lifetime = 0;

  this.particles = [];

  // method to display one new particle
  this.addParticle = function () {
    var p = new Particle(
      random(this.pos.x - 40, this.pos.x + 40),
      random(this.pos.y + 10, this.pos.y - 10),
      random(this.xSpeed - 1, this.xSpeed + 1),
      random(this.ySpeed - 5, this.ySpeed + 5),
      random(this.size - 2, this.size + 2),
      amplitude // Pass amplitude to the Particle constructor
    );
    return p;
  };

  //method to display the number of particles and lifetime
  this.startEmitter = function (startParticles, lifetime) {
    this.startParticles = startParticles;
    this.lifetime = lifetime;

    //start initial particles
    for (var i = 0; i < startParticles; i++) {
      this.particles.push(this.addParticle());
    }
  };

  // method to erase and add new particles 
  this.updateParticles = function () {
    var deadParticles = 0;
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].drawParticle();
      this.particles[i].updateParticle();
      if (this.particles[i].age > random(33, this.lifetime)) {
        this.particles.splice(i, 1);
        deadParticles++;
      }
    }
    if (deadParticles > 0) {
      for (var i = 0; i < deadParticles; i++) {
        this.particles.push(this.addParticle());
      }
    }
  };
}
