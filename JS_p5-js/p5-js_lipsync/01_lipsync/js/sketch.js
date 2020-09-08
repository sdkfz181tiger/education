"use strict";
//==========
// p5.js

const DISP_W = 480;
const DISP_H = 320;

let replayer;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	colorMode(HSB, 100);

	// Replayer
	replayer = new Replayer();
}

function draw(){
	background(66, 66, 33);
}

function mousePressed(){
	replayer.startRecord();
}

function mouseReleased(){
	replayer.stopRecord();
	replayer.playSound();
}

class Replayer{

	constructor(){
		this._mic = new p5.AudioIn();
		this._mic.start();
		this._sndFile = null;
		this._sndRecorder = null;
	}

	startRecord(){
		if(!this._mic.enabled) return;
		// File
		this._sndFile = new p5.SoundFile();
		// Recorder
		this._sndRecorder = new p5.SoundRecorder();
		this._sndRecorder.setInput(this._mic);
		this._sndRecorder.record(this._sndFile);
	}

	stopRecord(){
		if(!this._sndRecorder) return;
		this._sndRecorder.stop();
	}

	playSound(){
		if(!this._sndFile) return;
		setTimeout(()=>{
			if(this._sndFile.isLoaded()){
				this._sndFile.play();
				return;
			}
			this.playSound();
		}, 200);
	}
}