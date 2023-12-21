function RidgePlots2() {
  //vis name
  this.name = "ridgeplots2";
  this.startX = width / 2;

  var output = [];
  var speed = 2;
  var incr = 10;
  var p = 0;

  //method to create each circle
  this.addCircle = function () {
    var outputWave = [];
    var w = fourier.waveform();

    //iterates the fft data with the grades of the circle and pushed to the outputWave array
    for (var i = 0; i < w.length; i++) {
      if (i % 3 == 0) {
        var j = int(map(i, 0, 1024, 0, 360));
        var v = map(w[j], -1, 1, 0, 6);
        var l = v * incr * cos(j) + width / 2;
        var k = v * incr * sin(j) + height / 2;
        outputWave.push({ x: l, y: k });
      }
    }
    //push the circle to the output array
    output.push(outputWave);
  };

  //method to draw the circles
  this.draw = function () {
    //add a circle to the canvas
    if (frameCount % 2 == 0) {
      this.addCircle();
      //increment the circle size
      incr = incr + 11;
      //control the number of circles
      p++;
      if (p > 16) {
        p = 0;
        incr = 10;
      }
    }

    //draw the background circle
    if (output.length >= 17) {
      noStroke();
      fill(random(0, 255), random(0, 255), random(0, 255), random(20, 60));
      beginShape();
      var u = fourier.waveform();
      for (var i = 0; i < u.length; i++) {
        if (i % 6 == 0) {
          var q = int(map(i, 0, 1024, 0, 360));
          var r = map(u[q], -1, 1, 0, 1200);
          var s = r * cos(q) + width / 2;
          var t = r * sin(q) + height / 2;
          vertex(s, t);
        }
      }
      endShape(CLOSE);
    }

    stroke(255);
    strokeWeight(2);
    noFill();

    //iterates the output array to draw all the circles
    for (var i = 0; i < output.length; i++) {
      var o = output[i];
      beginShape();
      for (var j = 0; j < o.length; j++) {
        vertex(o[j].x, o[j].y);
      }
      endShape(CLOSE);
    }

    //remove 1 circle from the arrray after 17 circles, every iteration
    if (output.length > 17) {
      output.splice(0, 1);
    }

    //re-center the position every time change the screen size
    if (this.startX != width / 2) {
      output.splice(0);
      this.startX = width / 2;
    }
  };
}
