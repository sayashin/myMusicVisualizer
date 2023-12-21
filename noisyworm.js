function NoisyWorm() {
  //vis name
  this.name = "noisyworm";

  var rot;
  var prog;
  var amplitude = new p5.Amplitude();
  prog = 0;
  rot = 0;

  //drawing method
  this.draw = function () {
    background(0);
    fill(255);
    noStroke();

    fourier.analyze();

    var b = fourier.getEnergy("bass");
    var t = fourier.getEnergy("treble");

    this.rotatingCircles(t);
    this.noiseLine(b, t);
  };

  //method to move the circles
  this.rotatingCircles = function (energy) {
    if (energy < rotThresh) {
      var l = fourier.getEnergy("treble");
      var k = map(l, 0, 255, -1, 5);
      rot += k * 10;
    }

    push();
    translate(width / 2, height / 2);
    rotate(rot);
    fill(255, 0, 0);

    //distance between circles
    var incr = width / (10 - 1);

    //iterate the number of circles
    for (var i = 0; i < 10; i++) {
      beginShape();
      stroke(255, 0, 0);
      strokeWeight(2);

      //change the fill of the circles with the treble energy
      if (l > 50) {
        fill(255, 255, 0, l + 110);
      } else {
        noFill();
      }

      //iterate the fft data with the degrees of the circle
      for (var j = 0; j < 360; j++) {
        var w = fourier.waveform();
        var v = map(w[j], -1, 1, -200, 250);
        var x = v * cos(j) * cirSize;
        var y = v * sin(j) * cirSize;
        vertex(x + i * incr - width / 2, y);
      }
      endShape();
    }
    pop();
  };

  // method to move the line
  this.noiseLine = function (energy, energy2) {
    push();
    translate(width / 2, height / 2);

    beginShape();
    noFill();
    stroke(0, 255, 0);
    strokeWeight(3);
    for (var i = 0; i < 100; i++) {
      var x = map(noise(i * stepNoise + prog), 0, 1, -250, 250);
      var y = map(noise(i * stepNoise + prog + 1), 0, 1, -250, 250);
      vertex(x, y);
    }
    endShape();

    //check the values of the energy with the GUI
    if (energy > progThresh) {
      prog += 0.05;
    }
    if (energy2 > seedThresh) {
      noiseSeed();
    }
    pop();
  };
}
