//==========
// p5.js

w=400;c=w/2;x=0;y=0;
setup=()=>{
	createCanvas(w,w);angleMode(DEGREES);
	frameRate(2);
	background(0);
}
draw=()=>{
	for(a=0;a<9;a++){
		push();
		translate(c,c);
		rotate(a*40);
		circle(x=10*cos(a*40), y=10*sin(a*40), 5);
		pop();
	}
}

/*
w=400;d=w;
setup=()=>{createCanvas(w,w);angleMode(DEGREES)}
draw=()=>{background(0);u(w/2)}
u=(c)=>{d-=5;beginShape();for(r=0;r<960;r++)vertex(c+r/2*cos(d+r),c+r/2*sin(d+r));for(r=960;0<=r;r--)vertex(c+r/2*cos(d+r-60),c+r/2*sin(d+r-60));endShape()}
*/

/*
w=400;d=w;
setup=()=>{createCanvas(w,w);angleMode(DEGREES)}
draw=()=>{background(0);u(w/2,w/2,d-=5)}
u=(x,y,d)=>{beginShape();
for(r=0;r<960;r++)vertex(x+r/2*cos(d+r),y+r/2*sin(d+r));
for(r=960;0<=r;r--)vertex(x+r/2*cos(d+r-60),y+r/2*sin(d+r-60));
endShape()}
*/

/*
w=400;d=w;
setup=()=>{
	createCanvas(w,w);angleMode(DEGREES);
	//initGIF(canvas, true, 1, 200, 64);// Init!!
}
draw=()=>{
	background(0);
	u(w/2,w/2,d-=5);
	//recordGIF();// Record!!
}
u=(x,y,d)=>{beginShape();
for(r=0;r<960;r++)vertex(x+r/2*cos(d+r),y+r/2*sin(d+r));
for(r=960;0<=r;r--)vertex(x+r/2*cos(d+r-60),y+r/2*sin(d+r-60));
endShape();}
*/

/*
w=400;d=w;
setup=()=>{
	createCanvas(w,w);
	angleMode(DEGREES);
	background(0);
	//initGIF(canvas, true, 1, 200, 16);// Init!!
}
draw=()=>{
	background(0);
	uzu(w/2, w/2, d--);
	//recordGIF();// Record!!
}

function uzu(x, y, d){
	beginShape();
	for(r=0; r<960; r++){
		vertex(x+r/2*cos(d+r),y+r/2*sin(d+r));
	}
	for(r=960; 0<=r; r--){
		vertex(x+r/2*cos(d+r-60),y+r/2*sin(d+r-60));
	}
	endShape(CLOSE);
}
*/

/*
let cX, cY;
let deg = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noStroke();

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(33);

	deg-=5;
	if(deg < 0) deg+=360;

	uzu(cX, cY, deg);
	//uzu(cX, cY, deg-30);
	//uzu(cX, cY, deg-60);
}

function uzu(x, y, d){
	beginShape();
	for(let r=0; r<960; r++){
		vertex(x+r/2*cos(d+r),y+r/2*sin(d+r));
	}
	for(let r=960; 0<=r; r--){
		vertex(x+r/2*cos(d+r-60),y+r/2*sin(d+r-60));
	}
	endShape(CLOSE);
}
*/