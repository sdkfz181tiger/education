var osc;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	fill(255);
	noStroke();

	osc = new p5.Oscillator("sine");
	osc.start();
	osc.amp(0);
}

function mousePressed(){
	background(230);
	var midiValue = 60;// Do
	var freq = midiToFreq(midiValue);
	osc.freq(freq);
	osc.fade(0.5, 0.2);
}

function mouseReleased(){
	background(170);
	osc.fade(0, 0.5);
}