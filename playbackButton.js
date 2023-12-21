//displays and handles clicks on the playback button.
function PlaybackButton() {
  this.x = 20;
  this.y = 20;
  this.width = 20;
  this.height = 20;

  //flag to determine whether to play or pause after button click and
  //to determine which icon to draw
  this.playing = false;

  // Store selected song names and their corresponding volume levels in an object
  var songData = {
    a: { song: songA, volume: 1.0 },
    b: { song: songB, volume: 0.55 },
    c: { song: songC, volume: 0.3 },
    d: { song: songD, volume: 0.15 },
    e: { song: songE, volume: 0.25 },
  };

  var self = this;

  this.draw = function () {
    if (vis.selectedVisual.name == "waveandstars") {
      this.x = 20 - width / 2;
      this.y = 20 - height / 2;
    } else {
      this.x = 20;
      this.y = 20;
    }

    text("Press space to show-hide Menu", this.x + 70, this.y + 10);

    if (this.playing) {
      rect(this.x, this.y, this.width / 2 - 2, this.height);
      rect(
        this.x + (this.width / 2 + 2),
        this.y,
        this.width / 2 - 2,
        this.height
      );
      textSize(12);
      text("Click", this.x, this.y + 35);
      text("to Pause", this.x, this.y + 50);
    } else {
      triangle(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x,
        this.y + this.height
      );
      textSize(12);
      text("Click", this.x, this.y + 35);
      text("to Play", this.x, this.y + 50);
    }
  };

  //method to select a song by pressing a key
  this.keyPressed = function () {
    var selectedKey = key.toLowerCase();
    if (songData[selectedKey]) {
      var { song, volume } = songData[selectedKey];
      sound.pause();
      sound = loadSound(song);
      sound.setVolume(volume);
      self.playing = false;
    }
  };

  //checks for clicks on the button, starts or pauses playabck.
  //@returns true if clicked false otherwise.
  this.hitCheck = function () {
    if (
      mouseX > 10 &&
      mouseX < 30 + this.width &&
      mouseY > 10 &&
      mouseY < 30 + this.height
    ) {
      if (sound.isPlaying()) {
        sound.pause();
      } else {
        sound.loop();
      }
      this.playing = !this.playing;
      return true;
    }
    return false;
  };
}
