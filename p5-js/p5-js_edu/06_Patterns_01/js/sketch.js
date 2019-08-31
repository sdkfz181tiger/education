console.log("Hello p5.js!!");

// TODO: ランダムで100個
// TODO: 一列に並べる
// TODO: 全部埋める
// TODO: 格子状に並べる

function setup(){
	console.log("setup!!");

	createCanvas(480, 320);
	background(33, 33, 33);
	angleMode(DEGREES);
	
	// rect1();
	// rect2();
	// rect3();
	// rect4();

	// color1();
	//color2();

	// line1();
	// line2();
	// line3();
}

function rect1(){
	
	noStroke();
	for(let i=0; i<15; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		fill(r, g, b);
		let x = random(0, 480);
		let y = random(0, 320);
		rect(x, y, 32, 32);
	}
}

function rect2(){

	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		fill(r, g, b);
		rect(size*x, 160, 32, 32);
	}
}

function rect3(){

	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		for(let s=0; s<10; s++){
			let r = random(0, 255);
			let g = random(0, 255);
			let b = random(0, 255);
			fill(r, g, b);
			rect(size*i, size*s, 28, 28);
		}
	}
}

function rect4(){

	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		fill(r, g, b);
		rect(0, 0, 300-i*30, 300-i*30);
	}
}

function color1(){
	colorMode(HSB);// 色相 0~360

	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		fill(i*24, 100, 100);// 色相, 彩度, 明度
		rect(size*i, 160, 32, 32);
	}
}

function color2(){
	colorMode(HSB);// 色相 0~360

	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		for(let s=0; s<10; s++){
			fill(i*20, s*20, 100);
			rect(size*i, size*s, 28, 28);
		}
	}
}

function line1(){
	colorMode(RGB);

	for(let i=0; i<20; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		stroke(r, g, b);
		strokeWeight(3);
		let x = random(0, 480);
		let y = random(0, 320);
		line(240, 160, x, y);
	}
}

function line2(){
	colorMode(RGB);

	let cX = 240;
	let cY = 160;

	for(let i=0; i<20; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		stroke(r, g, b);
		strokeWeight(3);
		let x = random(0, 480);
		let y = random(0, 320);
		line(cX, cY, x, y);
		cX = x;
		cY = y;
	}
}

function line3(){
	colorMode(RGB);

	let cX = 240;
	let cY = 160;

	for(let i=0; i<40; i++){
		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		stroke(r, g, b);
		strokeWeight(3);
		let x = cX + random(0, 100) - 50;
		let y = cY + random(0, 100) - 50;
		line(cX, cY, x, y);
		cX = x;
		cY = y;
	}
}