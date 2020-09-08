//==========
// p5.js

w=500;s=64;d=2;x=0;
function setup(){createCanvas(w,w);}
function draw(){
stroke(33,33,200);
strokeWeight(5);
for(r=0;r<30;r++){
for(c=0;c<10;c++){
p=x+c*s;q=r*s/3;
if(r%2!=0)p+=s/2;
circle(p,q,s);
circle(p,q,s*0.7);
circle(p,q,s*0.4);}}
if(0<x)x=d-s;
x+=d;}

/*
w=500;
s=64;
d=2;
x=0;
function setup(){createCanvas(w,w);}
function draw(){
	stroke(33,33,200);
	strokeWeight(5);
	for(r=0;r<30;r++){
		for(c=0;c<10;c++){
			p=x+c*s;
			q=r*s/3;
			if(r%2!=0)p+=s/2;
			circle(p,q,s);
			circle(p,q,s*0.7);
			circle(p,q,s*0.4);
		}
	}
	if(0<x)x=d-s;
	x+=d;
}
*/

/*
const s = 64;
const d = 4;
let x = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	//frameRate(32);
}

function draw(){
	background(150);
	stroke(33, 33, 200);
	strokeWeight(5);

	for(let r=0; r<30; r++){
		for(let c=0; c<10; c++){
			let p = x + c * s;
			let q = r*s/3;
			if(r%2!=0) p+=s/2;
			circle(p, q, s);
			circle(p, q, s*0.7);
			circle(p, q, s*0.4);
		}
	}

	if(0 < x) x = d-s;
	x += d;
}
*/


