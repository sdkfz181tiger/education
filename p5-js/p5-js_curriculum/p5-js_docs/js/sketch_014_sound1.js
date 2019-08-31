var sound;

function preload(){
	console.log("preload");
	sound = loadSound("assets/coin.mp3");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	fill(255);
	noStroke();
}

function mouseClicked(){
	background(200);
	if(sound.isPlaying()){
		sound.stop();
	}else{
		sound.play();
	}
}