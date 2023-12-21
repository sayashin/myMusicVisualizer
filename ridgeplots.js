function RidgePlots() {
  this.name = "ridgeplots";

  var output = [];
  var speed = 2;

  this.onResize = function () {
    this.startX = width / 5;
    this.endY = height / 5;
    this.startY = height - this.endY;
    this.spectrumWidth = (width / 5) * 3;
  };

  this.onResize();

  this.addWave = function () {
    var w = fourier.waveform();
    var outputWave = [];
    var smallScale = 20;
    var bigScale = 200;

    for (var i = 0; i < w.length; i++) {
      if (i % 10 == 0) {
        var x = map(i, 0, 1024, this.startX, this.startX + this.spectrumWidth);
        if (i < 1024 * 0.25 || i > 1024 * 0.75) {
          var y = map(w[i], -1, 1, -smallScale, smallScale);
          outputWave.push({ x: x, y: this.startY + y });
        } else {
          var y = map(w[i], -1, 1, -bigScale, bigScale);
          outputWave.push({ x: x, y: this.startY + y });
        }
      }
    }
    output.push(outputWave);
  };

  this.draw = function () {
    background(0);
    stroke(255);
    strokeWeight(2);
    noFill();
    if (frameCount % 5 == 0) {
      this.addWave();
    }
    for (var i = 0; i < output.length; i++) {
      var o = output[i];
      beginShape();
      for (var j = 0; j < o.length; j++) {
        o[j].y -= speed;
        vertex(o[j].x, o[j].y);
      }
      endShape();
      if (o[0].y < this.endY) {
        output.splice(i, 1);
      }
    }

    //re-center the position every time change the screen size
    if (this.startX != width / 5) {
      output.splice(0);
      this.startX = width / 5;
    }
  };
}
