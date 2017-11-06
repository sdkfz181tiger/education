function setup(){
	//console.log("setup");
	createCanvas(100, 100);
	background(200);
	frameRate(1);

	var btn = createButton("Click!!");
	btn.mousePressed(function(){
		console.log("Hello UI!!");
	});
}

function draw(){
	//console.log("draw");
	background(200);	
}