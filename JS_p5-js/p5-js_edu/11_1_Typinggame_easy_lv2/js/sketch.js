console.log("Hello p5.js!!");

let strs = ["Apple", "Banana", "Cat", "Game Clear!!"];

let ind = 0;

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
}

function draw(){
	background(33);
	
	fill(255);
	noStroke();
	textSize(32);
	textAlign(CENTER);
	text(strs[ind], 240, 180);

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
		}
	}
}