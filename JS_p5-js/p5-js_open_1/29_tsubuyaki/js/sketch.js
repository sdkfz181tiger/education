function s(){
	let a=randomGaussian(10,5);
	for(j=5;j--;)rotate(TWO_PI/5),stroke(255),strokeWeight(4),line(0,0,0,a);
	a>2&&(translate(random(W),random(W)),s())
}

setup=()=>createCanvas(W=600,W);
draw=()=>{background(0,3),s()}