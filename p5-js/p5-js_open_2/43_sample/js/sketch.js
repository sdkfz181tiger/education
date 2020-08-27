
// w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
// setup=()=>{createCanvas(w,w);background(0)}
// draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}
// #つぶやきProcessing

// w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
// setup=()=>{createCanvas(w,w);background(0)}
// draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}

/*
w=400;
setup=()=>{
	createCanvas(w,w);
	angleMode(DEGREES);
	noLoop();
	background(0);
}

draw=()=>{
	noFill();
	stroke(255);
	strokeWeight(1);
}
*/

let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let rot = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	fill(255);
	noStroke();
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;
}

function drawPattern(x, y, rot, size){
	push();
	translate(x, y);
	rotate(rot);
	let num = 10;
	let pad = 360 / num;
	for(let i=0; i<num; i++){
		fill(palette[floor(i%palette.length)]);
		rect(i*size, 20*sin(i*pad-rot*4), size*0.6);
	}
	pop();
}