console.log("Hello p5.js!!");

let tAnimOff;
let tAnimOn;
let tSprite;

let tMan;
let aIn;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(32);
	textFont(font);
	textAlign(CENTER);
	rectMode(CENTER);

	// Sound
	soundFormats("mp3", "ogg");
	pSnd = loadSound("assets/bgm.mp3");

	// SpriteSheet
	var ssOff = loadSpriteSheet("assets/talkman.png", [
		{"name":"off", "frame":{"x":0,  "y": 0, "width": 45, "height": 50}},
		{"name":"off", "frame":{"x":45, "y": 0, "width": 45, "height": 50}},
		{"name":"off", "frame":{"x":90, "y": 0, "width": 45, "height": 50}}]);
	var ssOn = loadSpriteSheet("assets/talkman.png", [
		{"name":"on", "frame":{"x":0,  "y": 50, "width": 45, "height": 50}},
		{"name":"on", "frame":{"x":45, "y": 50, "width": 45, "height": 50}},
		{"name":"on", "frame":{"x":90, "y": 50, "width": 45, "height": 50}}]);
	tAnimOff = loadAnimation(ssOff);
	tAnimOn  = loadAnimation(ssOn);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);

	// Amp
	myAmp = new p5.Amplitude();

	// FFT
	myFft = new p5.FFT();

	// Talkman
	tMan = new Talkman();
	tMan.x = width / 2;
	tMan.y = height / 2;
	tMan.scale = 3.0;
	tMan.addAnimation("off", tAnimOff);
	tMan.addAnimation("on", tAnimOn);

	// Audio in
	aIn = new p5.AudioIn();
	aIn.start();
}

function draw(){
	//console.log("draw");
	background(0);

	// Draw
	drawSprites();

	// マイクからの音声
	let level = Math.floor(aIn.getLevel() * 10000);
	let str = "";
	if(999 < level) str = "999";
	if(level < 100) str = "0" + level;
	if(level < 10)  str = "00" + level;

	// Text
	noStroke();
	fill(255, 255, 255);
	text(str, width/2 - 20, height/2 - 80);

	// Talkman
	tMan.level = level;
}

class Talkman{

	constructor(x = 0, y = 0){
		this._sprite = createSprite(x, y, 10, 10);
		this._vLevel      = 0;
		this._vThreshould = 50;
		this._vFlg        = false;
		this._vInterval   = 2000;
	}

	set x(v){
		this._sprite.position.x = v;
	}

	set y(v){
		this._sprite.position.y = v;
	}

	set scale(v){
		this._sprite.scale = v;
	}

	set level(v){
		this._vLevel = v;
		if(this._vThreshould < this._vLevel){
			if(this._vFlg == true) return;
			this._vFlg = true;
			this.changeAnimation("on");
			setTimeout(()=>{
				this._vFlg = false
				this.changeAnimation("off");
			}, this._vInterval);
		}
	}

	addAnimation(anim, tag){
		this._sprite.addAnimation(anim, tag);
	}

	changeAnimation(tag){
		this._sprite.changeAnimation(tag);
	}
}