console.log("Hello p5.js!!");

let title = "= 伝説の占い =";
let results = ["大吉です!!", "吉です!!", "大凶です!!"];

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);

	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(title, 240, 40);

	uranai();
}

function uranai(){
	console.log("uranai!!");

	let rdm   = random(0, results.length);
	let index = floor(rdm);
	let str   = results[index];
	console.log(str);

	if(index == 0){
		fill(66, 66, 200);
	}

	if(index == 1){
		fill(66, 200, 66);
	}

	if(index == 2){
		fill(200, 66, 66);
	}

	rect(0, 120, 480, 90);

	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(str, 240, 180);
}

function rainbow(){
	console.log("rainbow!!");

	colorMode(RGB);
	background(33, 33, 33);

	colorMode(HSB);// 色相 0~360
	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		for(let s=0; s<10; s++){
			let sat = (i * 20) % 360;
			fill(sat, s*10, 100);
			rect(size*i, size*s, size-2, size-2);
		}
	}
}