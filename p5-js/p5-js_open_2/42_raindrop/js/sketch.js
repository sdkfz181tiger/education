
// w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
// setup=()=>{createCanvas(w,w);background(0)}
// draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}
// #つぶやきProcessing

// w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
// setup=()=>{createCanvas(w,w);background(0)}
// draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}

let palette = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

setup=()=>{
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(0);
}

draw=()=>{
	
	drawGradiation();

	noStroke(255);
	for(let i=0; i<200; i++){
		let x = width * random();
		let y = height * random();
		let s = 90 * random() + 10;
		let r = floor(random(palette.length));
		fill(palette[r]);
		drawRaindrop(x, y, s, 5);
	}
}

function drawGradiation(){

	let c2 = color("#CAF0F8");
	let c1 = color("#90E0EF");
	for(let v=0; v<height; v++){
		let inter = map(v, 0, height, 0, 1);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(0, v, width, v);
	}
}

function drawRaindrop(x, y, r, a){
	push();
	translate(x, y);
	rotate(-90);
	beginShape();
	for(let t=0; t<360; t++){
		let R = r / (a*sin(t/2)+1);
		vertex(R*cos(t), R*sin(t));
	}
	endShape(CLOSE);
	pop();
}