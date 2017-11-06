function setup(){
	console.log("setup");
	createCanvas(480, 320);// キャンバスを用意
	background(230);// 背景色を指定

	var size = 32;

	var centerX = width * 0.5;
	var centerY = height * 0.5;

	// Line
	line(0, centerY, width, centerY);

	// Ellipse
	fill(255, 200, 200);
	stroke(180, 100, 100);
	ellipse(centerX, centerY, size, size);

	// Rect
	fill(200, 255, 200);
	stroke(100, 180, 100);
	rectMode(CENTER);// 中心を基準に
	rect(centerX + 50, centerY, size, size);

	// Triangle
	fill(200, 200, 255);
	stroke(100, 100, 180);
	triangle(
	centerX + 100 - size * 0.5, centerY + size * 0.5,
	centerX + 100,              centerY - size * 0.5,
	centerX + 100 + size * 0.5, centerY + size * 0.5);

	// Quad
	fill(255, 255, 200);
	stroke(180, 180, 100);
	quad(
		centerX + 150 - size * 0.5, centerY,
		centerX + 150,              centerY - size * 0.5,
		centerX + 150 + size * 0.5, centerY,
		centerX + 150,              centerY + size * 0.5);
}

function draw(){
	console.log("draw");
}