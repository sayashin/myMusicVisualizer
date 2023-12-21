function DancingFire() {
  // vis name
  this.name = "dancingfire";

  var emit;
  var emit2;
  var emit3;
  var direction = "right";

  var amplitude = new p5.Amplitude();

  var beatDetect;
  beatDetect = new BeatDetect();

  var frameCount = 0;

  //call Emitter function and give values to the emitter parameters
  emit = new Emitter(width / 2, height / 2 + 120, 0, -5, 11, amplitude);
  emit.startEmitter(1000, 200);

  emit2 = new Emitter(width * 0.25 - 60, height / 2 + 60, 1, -6, 10, amplitude);
  emit2.startEmitter(300, 100);

  emit3 = new Emitter(
    width * 0.75 + 60,
    height / 2 + 60,
    -1,
    -6,
    10,
    amplitude
  );
  emit3.startEmitter(300, 100);

  this.draw = function () {
    frameCount++;
    emit.updateParticles();
    emit2.updateParticles();
    emit3.updateParticles();

    // check & update direction
    if (direction == "right" && emit.pos.x > width * 0.55) {
      direction = "left";
    } else if (direction == "left" && emit.pos.x < width * 0.45) {
      direction = "right";
    }
    // Update emitter position based on direction
    if (direction == "right") {
      emit.pos.x += 2;
      emit2.pos.x += 2;
      emit3.pos.x += 2;
    } else {
      emit.pos.x -= 2;
      emit2.pos.x -= 2;
      emit3.pos.x -= 2;
    }

    fourier.analyze();
    var spectrum = fourier.analyze();

    // change the particle size base on amplitude
    var a = amplitude.getLevel();
    var s = map(a, 0, 0.1, 1, 30);
    emit.size = s;
    emit2.size = s / 1.25;
    emit3.size = s / 1.25;

    // change the lifetime of the particle base on energy levels
    var energyT = fourier.getEnergy("treble");
    var energyB = fourier.getEnergy("bass");
    var energyM = fourier.getEnergy("highMid");
    var bass = map(energyB, 100, 200, 5, 100);
    var treble = map(energyT, 5, 65, 10, 400);
    var medium = map(energyM, 40, 85, 10, 125);
    emit.lifetime = treble;
    emit2.lifetime = bass;
    emit3.lifetime = medium;

    //change the position and speed of the particles base on beat detection
    if (beatDetect.detectBeat(spectrum)) {
      if (direction == "right") {
        emit3.pos.x += 10;
        emit2.pos.x += 10;
        emit.pos.x += 10;
      } else {
        emit3.pos.x -= 10;
        emit2.pos.x -= 10;
        emit.pos.x -= 10;
      }
      emit.size = s * 1.5;
      emit.pos.y += 20;
      emit2.size = s * 2;
      emit2.pos.y += 10;
      emit3.pos.y += 10;
      emit3.size = s * 2;
      if (frameCount % 4 == 0 && energyB > 180) {
        emit.pos.y -= 100;
        emit2.pos.y -= 60;
        emit3.pos.y -= 60;
        emit.size = s * 4;
        emit2.size = s * 4;
        emit3.size = s * 4;
        emit.ySpeed = -15;
        emit2.ySpeed = -15;
        emit3.ySpeed = -15;
      }
    } else if (emit.pos.y != height / 2 + 120) {
      emit.pos.y = height / 2 + 120;
      emit2.pos.y = height / 2 + 60;
      emit3.pos.y = height / 2 + 60;
      emit.ySpeed = -5;
      emit2.ySpeed = -6;
      emit3.ySpeed = -6;
    }
  };
}
