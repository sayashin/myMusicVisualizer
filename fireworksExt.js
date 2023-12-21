function FireworksExt() {
  //name of the visualisation
  this.name = "fireworks";

  var beatDetect;
  var fireworks;

  frameRate(60);
  beatDetect = new BeatDetect();
  fireworks = new Fireworks();

  this.draw = function () {
    var spectrum = fourier.analyze();
    if (beatDetect.detectBeat(spectrum)) {
      fireworks.addFirework();
    }
    fireworks.update();
  };
}
