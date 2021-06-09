let imgPlt;
let imgSmp;

let pxFrom = [];
let pxTo = [];

function preload(){
	imgPlt = loadImage("assets/palette.png");
	imgSmp = loadImage("assets/test01.png");
}

function setup(){
	createCanvas(imgSmp.width, imgSmp.height);
	angleMode(DEGREES);
	noLoop();

	//image(img, 0, 0);

	for(let c=0; c<imgPlt.width; c++){
		pxFrom.push(imgPlt.get(c, 0));
		pxTo.push(imgPlt.get(c, 1));
	}

	for(let y=0; y<imgSmp.height; y++){
		for(let x=0; x<imgSmp.width; x++){
			checkColor(x, y, imgSmp.get(x, y));
		}
	}
	updatePixels();
	saveCanvas();
}

function checkColor(x, y, p){
	if(p[3] == 0) return;
	for(let i=0; i<pxFrom.length; i++){
		if(pxFrom[i][0] != p[0]) continue;
		if(pxFrom[i][1] != p[1]) continue;
		if(pxFrom[i][2] != p[2]) continue;
		set(x, y, pxTo[i]);
	}
}