//this code is an adaptation of: Colorful Coding: Coding Project #17: www.youtube.com/watch?v=uk96O7N1Yo0&t=515s
function WaveAndStars() {
  //vis name
  this.name = "waveandstars";

  var img;
  var particles = [];
  var partxframe;
  img = loadImage("figures/eye.jpg");

  this.draw = function () {
    //translate the circle to the center of the canvas
    translate(width / 2, height / 2);

    //get the fft values
    fourier.analyze();
    amplitude = fourier.getEnergy(20, 200);
    var wave = fourier.waveform();

    //responsive background
    push();
    if (amplitude > 180) {
      rotate(random(-0.5, 0.5));
    }
    image(img, 0, 0, width + 100, height + 100);
    pop();
    //transparency that will change depending on the size of the amplitude variable
    var alpha = map(amplitude, 0, 255, 240, 180);
    fill(0, alpha);
    noStroke();
    rect(0, 0, width, height);

    stroke(0, 180, 200);
    strokeWeight(3);
    noFill();

    //iterates the 2 halfs of the circle
    for (var t = -1; t <= 1; t += 2) {
      //drawing the circle
      beginShape();
      //iterates the waveform data to draw half circle
      for (var i = 0; i <= 180; i += 0.5) {
        //maps the circle with the data to an integer
        var index = floor(map(i, 0, 180, 0, wave.length - 1));
        //map the radius of the circle to the waveform
        var r = map(wave[index], -1, 1, 150, 350);
        //x and y coordinates of the circle
        var x = r * sin(i) * t;
        var y = r * cos(i);
        vertex(x, y);
      }
      endShape();
    }

    //create new particles for every frame
    partxframe = random(1, 20);
    for (i = 0; i < partxframe; i++) {
      var p = new this.particle();
      //push the particles to an array
      particles.push(p);
    }

    //call the show method to all the particles
    for (var i = particles.length - 1; i >= 0; i--) {
      //control which particles to show
      if (!particles[i].edges()) {
        particles[i].update(amplitude > 180);
        particles[i].show();
      } else {
        particles.splice(i, 1);
      }
    }
  };

  //method to create particles
  this.particle = function () {
    //vector to define the position of the particles
    this.pos = p5.Vector.random2D().mult(250);
    //variables for speed and acceleration of the particles
    this.speed = createVector(0, 0);
    this.acceleration = this.pos.copy().mult(random(0.002, 0.0002));

    //randomize the width of the particle
    this.w = random(3, 5);

    //adding color to the particle
    this.color = [random(0, 110), random(110, 255), random(110, 255)];

    //method to update the position of the particle and react to the energy
    this.update = function (cond) {
      this.speed.add(this.acceleration);
      this.pos.add(this.speed);
      if (cond) {
        this.pos.add(this.speed);
        this.pos.add(this.speed);
        this.pos.add(this.speed);
      }
    };

    //method to remove the particles from the array when they are no longer on the canvas
    this.edges = function () {
      if (
        this.pos.x < -width / 2 ||
        this.pos.x > width / 2 ||
        this.pos.y < -height / 2 ||
        this.pos.y > height / 2
      ) {
        return true;
      } else {
        return false;
      }
    };

    //method to show the particles on the canvas
    this.show = function () {
      noStroke();
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.w);
    };
  };
}
