console.log("Hello p5.js!!");

let animation;
let analyzer = new p5.Amplitude();
let sounds = new Array();

function preload(){
	console.log("preload");
	sounds["a"] = loadSound("assets/s_coin.mp3");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	fill(255);
	noStroke();
}

function draw(){
	if(animation){
		animation.draw();
	}
}

function mouseClicked(){
	background(200);
	animation = new AnimA();

	let sound = sounds["a"];
	if(sound.isPlaying()) sound.stop();
	sound.play();
}