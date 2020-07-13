
w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
setup=()=>{createCanvas(w,w);background(0)}
draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}
#つぶやきProcessing

// w=300;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
// setup=()=>{createCanvas(w,w);background(0)}
// draw=()=>{h=1+i*2;l=(h-2)**2;r=h**2;fill(random(99,200),255,255);square(x,y,s);if(r-l<=++n){n=0;i++;c=w/2-s*i;x=y=c;a=0}else{x+=s*cos(a);y+=s*sin(a);a+=(n%(h-1)==0)?HALF_PI:0}}


w=400;s=10;i=n=a=0;c=w/2-s*i;x=y=c;
setup=()=>{
	createCanvas(w,w);
	background(0);
	//initGIF(canvas, true, 1, 200, 16);// Init!!
}
draw=()=>{
	h=1+i*2;l=(h-2)**2;r=h**2;
	fill(random(99,200),255,255);
	square(x,y,s);
	if(r-l<=++n){
		n=0;i++;c=w/2-s*i;x=y=c;a=0
	}else{
		x+=s*cos(a);y+=s*sin(a);
		a+=(n%(h-1)==0)?HALF_PI:0
	}
	//recordGIF();// Record!!
}

/*
w=300;s=30;i=n=a=0;c=w/2-s*i;x=y=c;
setup=()=>{
	createCanvas(w,w);
	background(0);
	// Initialize
	initGIF(canvas, true, 1, 128, 32);
}
draw=()=>{
	h=1+i*2;
	l=(h-2)**2;
	r=h**2;
	fill(random(180,255));
	square(x,y,s);
	if(r-l<=++n){
		n=0;i++;
		c=w/2-s*i;
		x=y=c;
		a=0;
	}else{
		x+=s*cos(a);
		y+=s*sin(a);
		if(n%(h-1)==0) a+=HALF_PI;
	}
	recordGIF();// Record!!
}
*/