// Function to create fire
function Particle(x, y, xSpeed, ySpeed, size, amplitude) {
  this.pos = createVector(x, y);
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = color(255, 230, 0, 0);
  this.age = 0;
  this.blend = 230;
  this.amplitude = amplitude;

  //method to create one particle
  this.drawParticle = function () {
    // Map amplitude to opacity range
    this.opacity = map(this.amplitude.getLevel(), 0, 0.1, 40, 240);
    fill(red(this.colour), green(this.colour), blue(this.colour), this.opacity);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  };

  //method to update position and color of the particle
  this.updateParticle = function () {
    this.blend -= 3;
    this.colour = color(this.blend + 150, this.blend, 0, this.blend - 5);
    this.pos.x += this.xSpeed;
    this.pos.y += this.ySpeed;
    this.age++;
  };
}
