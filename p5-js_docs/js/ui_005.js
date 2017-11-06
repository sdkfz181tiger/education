
function setup(){
	//console.log("setup");
	createCanvas(100, 100);
	background(200);
	frameRate(1);

	var cBoxA = createCheckbox("Earth");
	cBoxA.changed(checked);

	var cBoxB = createCheckbox("Moon");
	cBoxB.changed(checked);

	var cBoxC = createCheckbox("Sun");
	cBoxC.changed(checked);
}

function checked(){
	if(this.checked()){
		console.log("checked:" + this.value());
	}
}

function draw(){
	//console.log("draw");
}