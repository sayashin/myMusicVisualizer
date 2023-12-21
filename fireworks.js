function Fireworks() {
  var fireworks = [];

  this.addFirework = function () {
    var f_colour = color(random(0, 255), random(0, 255), random(0, 255));
    var f_x = random(width * 0.2, width * 0.8);
    var f_y = random(height * 0.2, height * 0.8);

    fireworks.push(new Firework(f_colour, f_x, f_y));
  };

  this.update = function () {
    for (var i = 0; i < fireworks.length; i++) {
      fireworks[i].draw();
      if (fireworks[i].depleted) {
        fireworks.splice(i, 1);
      }
    }
  };
}
