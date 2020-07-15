"use strict";

function setup(){
	let canvas = createCanvas(windowWidth, windowHeight).canvas;
	noLoop();
	background(33);
	fill(100);
	stroke(255);
	strokeWeight(1);

	//blendMode(DIVIDE);
}

function draw(){
	background(33);

	let s = 50;

	// for(let a=0; a<5; a++){
	// 	fill(99, 33, 33);
	// 	rect(a*s*2, 0, s, height);
	// }

	// for(let a=0; a<5; a++){
	// 	fill(33, 99, 33);
	// 	rect(0, a*s*2, width, s);
	// }

	for(let a=0; a<5; a++){
		let odd = a % 2;
		if(odd == 0){
			fill(33, 99, 33);
			rect(0, a*s, width, s);
		}
	}

	for(let a=0; a<5; a++){
		let odd = a % 2;
		if(odd == 0){
			fill(33, 99, 33);
			rect(0, a*s, width, s);
		}else{
			fill(99, 33, 33);
			rect(0, a*s, width, s);
		}
	}

	// for(let a=0; a<5; a++){
	// 	if(a%2==0){
	// 		fill(99, 33, 33);
	// 	}else{
	// 		fill(33, 33, 99);
	// 	}
	// 	rect(a*s, 0, s, height);
	// }

	// for(let a=0; a<5; a++){
	// 	for(let b=0; b<5; b++){
	// 		if(a%2 == 0){
	// 			if(b%2 == 0){
	// 				fill(99, 33, 33);
	// 			}else{
	// 				fill(33, 99, 33);
	// 			}
	// 		}else{
	// 			if(b%2 == 0){
	// 				fill(33, 99, 33);
	// 			}else{
	// 				fill(99, 33, 33);
	// 			}
	// 		}
	// 		square(a*s, b*s, s);
	// 	}
	// }

	// fill(33, 99, 33);
	// for(let a=0; a<5; a++){
	// 	for(let b=0; b<5; b++){
	// 		if(b%2 == 0){
	// 			square(a*s*2, b*s, s);
	// 		}else{
	// 			square(a*s*2+s, b*s, s);
	// 		}
	// 	}
	// }

	// for(let a=0; a<5; a++){
	// 	for(let b=0; b<3; b++){
	// 		if((a+b)%2 == 0){
	// 			fill(99, 33, 99);
	// 		}else{
	// 			fill(33, 99, 99);
	// 		}
	// 		square(a*s, b*s, s);
	// 	}
	// }
}