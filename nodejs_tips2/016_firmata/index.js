console.log("Hello Node JS!!");

// Johnny-five
let j5 = require("johnny-five");

// Arduino
let arduino = new j5.Board(); 
arduino.on("ready", function(){
	var led = new j5.Led({
		pin: 8
	});
	led.strobe(200);
});