"use strict";
//==========
// p5.js

let strs = ["CURRY", "SPAGHETTI", "PIZZA"];
let size = 32;
let rects = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	background(0);
	fill(255);
	noStroke();
}

function draw(){
	
	textSize(size);
	let index = floor(random(strs.length));
	let str = strs[index];
	let w = textWidth(str);
	let h = size;
	let r = {x:0, y:0, w:w, h:h};
	r.x = random(0, width-r.w);
	r.y = random(0, height-r.h);

	if(intersectRect(r)){
		return;
	}
	rects.push(r);
	fill(100);
	rect(r.x, r.y, r.w, r.h);
	fill(200);
	text(str, r.x, r.y+r.h);
}

function intersectRect(r){
	for(let j=0; j<rects.length; j++){
		let rect = rects[j];
		if(r.x+r.w < rect.x) return false;
		if(rect.x+rect.w < r.x) return false;
		if(r.y+r.h < rect.y) return false;
		if(rect.y+rect.h < r.y) return false;
		return true;
	}
	return false;
}

