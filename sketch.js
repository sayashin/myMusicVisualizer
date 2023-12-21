//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

var gui;
var rotThresh;
var stepNoise;
var progThresh;
var seedThresh;

// Global variables for the songs
var songA = "assets/Stomper reggae bit.mp3";
var songB = "assets/Til the money runs out - Tom Waits.mp3";
var songC = "assets/Ariadne - Dead Can Dance.wav";
var songD = "assets/La sin corazon - El Chaqueño Palavecino.mp3";
var songE = "assets/You drive me nuts - Relax Trio.mp3";
// Variable to store the currently selected song filename (initialize with songA)
var selectedSong = songA;

function preload() {
  sound = loadSound(selectedSong);
}

function setup() {
  rotThresh = 67;
  stepNoise = 0.01;
  progThresh = 180;
  seedThresh = 100;
  cirSize = 1;

  createCanvas(windowWidth, windowHeight);
  background(0);
  controls = new ControlsAndInput();

  //instantiate the fft object
  fourier = new p5.FFT();

  //create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
  vis.add(new RidgePlots());
  vis.add(new NoisyWorm());
  vis.add(new RidgePlots2());
  vis.add(new WaveAndStars());
  vis.add(new DancingFire());
  vis.add(new FireworksExt());

  gui = createGui("Audio Visualizer").setPosition(20, 270);
  sliderRange(0.001, 1, 0.001);
  gui.addGlobals("stepNoise");
  sliderRange(0, 255, 1);
  gui.addGlobals("rotThresh");
  gui.addGlobals("progThresh");
  gui.addGlobals("seedThresh");
  sliderRange(0.1, 5, 0.1);
  gui.addGlobals("cirSize");
}

function draw() {
  background(0);
  //draw the selected visualisation
  vis.selectedVisual.draw();
  //draw the controls on top.
  controls.draw();

  //show and hide the GUI
  if (vis.selectedVisual.name != "noisyworm") {
    gui.hide();
  } else {
    gui.show();
  }

  //change the angleMode depend the visualization
  if (
    vis.selectedVisual.name != "noisyworm" &&
    vis.selectedVisual.name != "ridgeplots2" &&
    vis.selectedVisual.name != "waveandstars" &&
    vis.selectedVisual.name != "fireworks"
  ) {
    angleMode(RADIANS);
  } else {
    angleMode(DEGREES);
  }

  //change the image and rect modes for the waveandstars visualization
  if (vis.selectedVisual.name == "waveandstars") {
    imageMode(CENTER);
    rectMode(CENTER);
  } else {
    imageMode(CORNER);
    rectMode(CORNER);
  }
}

function mouseClicked() {
  controls.mousePressed();
}

function keyPressed() {
  controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty("onResize")) {
    vis.selectedVisual.onResize();
  }
}
