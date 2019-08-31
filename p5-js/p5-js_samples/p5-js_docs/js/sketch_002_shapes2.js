
const DELAY_MAX = 5;
var delay = DELAY_MAX;

function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Rectmode
	rectMode(CENTER);
}

function draw(){
	console.log("draw");

	// Stroke(RGBA)
	stroke(255, 255, 255, 255);
	strokeWeight(1);
	fill(255);

	var size = random(5, 10);

	// Mouse down
	if(mouseIsPressed == true){

		// Line
		//line(mouseX, mouseY, pmouseX, pmouseY);

		if(delay < 0){
			var rdm = Math.floor(random(0, 5));
			console.log("rdm:" + rdm);
			switch(rdm){
				case 0:
					point(mouseX, mouseY);
					break;
				case 1:
					rect(mouseX, mouseY, 5, 5);
					break;
				case 2:
					ellipse(mouseX, mouseY, size, size);
					break;
				case 3:
					triangle(
						mouseX - size, mouseY + size,
						mouseX, mouseY - size,
						mouseX + size, mouseY + size);
					break;
				case 4:
					quad(
						mouseX - size, mouseY,
						mouseX, mouseY - size,
						mouseX + size, mouseY,
						mouseX, mouseY + size);
					break;
			}
			delay = DELAY_MAX;
		}
		delay--;
	}

	// Mouse up
	if(mouseIsPressed == false){
		//background(0);
	}
}