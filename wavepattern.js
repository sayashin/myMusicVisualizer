function WavePattern() {
  //vis name
  this.name = "wavepattern";

  this.draw = function () {
    noStroke();
    fourier.analyze();

    //call the draw BackgroundRect function to draw the background rectangles and labels
    drawBackgroundRect("bass", 255, 0, 0, height * 0.63, 50, 50);
    drawBackgroundRect("lowMid", 0, 255, 0, height * 0.48, 50, 40);
    drawBackgroundRect("highMid", 0, 255, 255, height * 0.33, 50, 30);
    drawBackgroundRect("treble", 255, 255, 0, height * 0.18, 50, 20);

    //call the drawWaveform to draw the waves
    drawWaveform("bass", 0, 230, 255, 0, 0, 1.3);
    drawWaveform("lowMid", 260, 500, 0, 255, 0, 1);
    drawWaveform("highMid", 520, 750, 0, 255, 255, 0.7);
    drawWaveform("treble", 750, 1024, 255, 255, 0, 0.4);
  };

  //function to process the background rectangles and captions to change the alpha channel with the different energies
  function drawBackgroundRect(label, r, g, b, rectY, rectHeight, alphaOffset) {
    var energy = fourier.getEnergy(label);
    var alpha = energy - alphaOffset;
    fill(r, g, b, alpha);
    rect(0, rectY, width, rectHeight);
    fill(r, g, b);
    text(label, 25, rectY);
  }

  //function to process the 4 waves
  function drawWaveform(label, freqRangeBegin, freqRangeEnd, r, g, b, yMultiplier) {
    push();
    noFill();
    strokeWeight(2);
    var wave = fourier.waveform();

    beginShape();
    stroke(r, g, b);
    for (var i = 0; i < width; i++) {
      //for each element of the waveform map it to screen
      //coordinates and make a new vertex at the point.
      var index = Math.floor(map(i, 0, width, freqRangeBegin, freqRangeEnd));
      var y = map(wave[index], -1, 1, 0, height);
      vertex(i, y * yMultiplier);
    }
    endShape();
    pop();
  }
}
