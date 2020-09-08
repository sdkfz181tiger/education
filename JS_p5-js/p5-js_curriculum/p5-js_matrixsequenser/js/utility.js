console.log("Hello utility.js!!");

function showWaves(){

	let waveform = myFft.waveform();
	let data = new Array();
	for(let i=0; i<waveform.length; i+=32){
		data.push(waveform[i]);
	}

	stroke(100, 255, 100);
	strokeWeight(1);
	noFill();

	beginShape();
	for(let i=0; i<data.length; i++){
		let posX = map(i, 0, data.length-1, 0, width);
		let posY = map(data[i], -1, 1, 0, height);
		vertex(posX, posY);
	}
	endShape();
}

class MyNote{

	constructor(x, y, size, midi){
		this.x = x;
		this.y = y;
		this.size = size;
		this.midi = midi;
		this.myOsc = new p5.SinOsc();
		this.myOsc.freq(midiToFreq(midi));
		this.myEnv = new p5.Env();
		this.myEnv.setADSR(0.001, 0.5, 0.1, 0.5);
		this.myEnv.setRange(1, 0);
		this.activeFlg = false;
	}

	get active(){
		return this.activeFlg;
	}

	set active(flg){
		this.activeFlg = flg;
	}

	mousePressed(e){
		if(e.clientX < this.x) return;
		if(this.x + this.size < e.clientX) return;
		if(e.clientY < this.y) return;
		if(this.y + this.size < e.clientY) return;
		this.activeFlg ? this.activeFlg = false : this.activeFlg = true;
		if(this.activeFlg) this.play();
	}

	play(){
		if(this.activeFlg == false) return;
		this.myOsc.start();
		this.myEnv.play(this.myOsc, 0, 0.1);
	}

	draw(){

		// Rect
		if(this.activeFlg == true){
			fill(255, 255, 255);
		}else{
			fill(100, 100, 100);
		}
		stroke(33, 33, 33);
		strokeWeight(1);
		rect(this.x, this.y, this.size, this.size);

		// Text
		fill(33, 33, 33);
		noStroke();
		strokeWeight(0);
		text(this.midi, this.x + this.size / 2, this.y + this.size / 2);
	}
}