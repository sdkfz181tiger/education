var sliderA, sliderB, sliderC;

function setup(){
	//console.log("setup");
	createCanvas(100, 100);
	background(200);
	frameRate(1);

	// Input
	var input = createInput("What are you doing?");
	input.position(10, height+10);

	// Button
	var btn = createButton("Submit");
	btn.position(input.width+10, height+10);
	btn.mousePressed(function(){
		var text = input.value();
		console.log("Answer:" + text);
	});

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