console.log("Hello p5.js!!");

let strs = ["Apple", "Banana", "Cat", "Game Clear!!"];
let imgs = [];

let ind = 0;

let spr = null;

function preload(){
	console.log("preload!!");

	let imgA = loadImage("./assets/a.png");
	imgs.push(imgA);
	let imgB = loadImage("./assets/b.png");
	imgs.push(imgB);
	let imgC = loadImage("./assets/c.png");
	imgs.push(imgC);
	let imgClear = loadImage("./assets/conguratulations.png");
	imgs.push(imgClear);
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	
	spr = createSprite(240, 200, 32, 32);
	spr.addImage(imgs[ind]);
	spr.position.x = 240;
	spr.position.y = 140;
	spr.scale = 0.8;
}

function draw(){
	background(33);
	drawSprites();
	
	fill(255);
	noStroke();
	textSize(32);
	textAlign(CENTER);
	text(strs[ind], 240, 220);

	textSize(18);
	textAlign(LEFT);
	text("SCORE:" + ind, 5, 23);
}

function keyTyped(){
	console.log("keyTyped:" + key);
	strs[ind] = strs[ind].trim();
	let answer = strs[ind].charAt(0);
	if(answer.toLowerCase() == key || answer.toUpperCase() == key){
		strs[ind] = strs[ind].slice(1);
	}
	if(strs[ind].length <= 0){
		if(ind < strs.length-1){
			ind++
			spr.addImage(imgs[ind]);
		}
	}
}