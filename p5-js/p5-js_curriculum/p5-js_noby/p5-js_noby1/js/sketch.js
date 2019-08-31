console.log("Hello p5.js!!");

const appUrl = "https://www.cotogoto.ai/webapi/noby.json";
const appKey = "2162b705a12b3356ac7a7488c9adc6c2";

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);
}

function setup(){
	console.log("setup");
	let canvas = createCanvas(480, 320);
	canvas.parent("myCanvas");
	frameRate(8);
	clear();
	background(33, 33, 33);
	fill(255, 255, 255);
	noStroke();

}

function draw(){
	//console.log("draw");
	background(33, 33, 33);
	drawSprites();
	textAlign(CENTER);
}

function appendChat(str){
	$("#myChat").append("<li>" + str + "</li>");
}