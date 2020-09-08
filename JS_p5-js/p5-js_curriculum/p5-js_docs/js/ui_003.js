var sliderA, sliderB, sliderC;

function setup(){
	//console.log("setup");
	createCanvas(100, 100);
	background(200);
	frameRate(1);

	sliderA = createSlider(0, 256);
	sliderA.position(width+10, 5);

	sliderB = createSlider(0, 256);
	sliderB.position(width+10, 35);

	sliderC = createSlider(0, 256);
	sliderC.position(width+10, 65);
}

function draw(){
	//console.log("draw");
	var r = sliderA.value();
	var g = sliderB.value();
	var b = sliderC.value();
	background(r, g, b);
}