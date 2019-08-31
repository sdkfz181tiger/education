console.log("Hello Node JS!!");

let jsnes = require("jsnes");

// Initialize and set up outputs
var nes = new jsnes.NES({
  onFrame: function(frameBuffer) {
    // ... write frameBuffer to screen
  },
  onAudioSample: function(left, right) {
    // ... play audio sample
  }
});

// Read ROM data from disk (using Node.js APIs, for the sake of this example)
const fs = require('fs');
var romData = fs.readFileSync('rom/1942.nes', {encoding: 'binary'});

// Load ROM data as a string or byte array
nes.loadROM(romData);

// Run frames at 60 fps, or as fast as you can.
// You are responsible for reliable timing as best you can on your platform.
nes.frame();
nes.frame();
// ...

// Hook up whatever input device you have to the controller.
nes.buttonDown(1, jsnes.Controller.BUTTON_A);
nes.frame();
nes.buttonUp(1, jsnes.Controller.BUTTON_A);
nes.frame();
// ...
