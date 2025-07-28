//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
  this.menuDisplayed = false;

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //make the window fullscreen or revert to windowed
  this.mousePressed = function () {
    if (
      !this.playbackButton.hitCheck() &&
      vis.selectedVisual.name != "noisyworm"
    ) {
      var fs = fullscreen();
      fullscreen(!fs);
    }
  };

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = function (keycode) {
    if (keycode == 32) {
      this.menuDisplayed = !this.menuDisplayed;
    }

    if (keycode > 48 && keycode < 58) {
      var visNumber = keycode - 49;
      vis.selectVisual(vis.visuals[visNumber].name);
    }

    if (this.playbackButton) {
      this.playbackButton.keyPressed(); // Call the keyPressed function of PlaybackButton
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);

    //playback button
    this.playbackButton.draw();
    textSize(34);
    //only draw the menu if menu displayed is set to true.
    if (this.menuDisplayed) {
      if (vis.selectedVisual.name == "waveandstars") {
        text("Select a visualisation:", 100 - width / 2, 70 - height / 2);
        text(
          "Select your song & press Play:",
          500 - width / 2,
          70 - height / 2
        );
      } else {
        text("Select a visualisation:", 100, 70);
        text("Select your song & press Play:", 500, 70);
      }
      this.menu();
    }
    pop();
  };

  this.menu = function () {
    //draw out menu items for each visualisation
    for (var i = 0; i < vis.visuals.length; i++) {
      var yLoc = 120 + i * 40;
      if (vis.selectedVisual.name == "waveandstars") {
        text(
          i + 1 + ":  " + vis.visuals[i].name,
          100 - width / 2,
          yLoc - height / 2
        );
      } else {
        text(i + 1 + ":  " + vis.visuals[i].name, 100, yLoc);
      }

      //draw the menu songs
      var songLabels = ["A", "B", "C", "D", "E"];
for (var j = 0; j < songLabels.length; j++) {
  var songLabel = songLabels[j];
  var songName = window["song" + songLabel];
  var songDisplayName = songName.substring(songName.lastIndexOf("/") + 1);
  songDisplayName = songDisplayName.replace(".mp3", "");
  songDisplayName = songDisplayName.replace(".wav", "");

  if (vis.selectedVisual.name == "waveandstars") {
    text(
      songLabel + ": " + songDisplayName,
      500 - width / 2,
      120 + j * 40 - height / 2
    );
  } else {
    text(songLabel + ": " + songDisplayName, 500, 120 + j * 40);
  }
}

// Add option F for custom song
var customLabel = "F";
var customText = "Custom song (upload)";
if (vis.selectedVisual.name == "waveandstars") {
  text(
    customLabel + ": " + customText,
    500 - width / 2,
    120 + songLabels.length * 40 - height / 2
  );
} else {
  text(customLabel + ": " + customText, 500, 120 + songLabels.length * 40);
}
      }
    }
  };
}
