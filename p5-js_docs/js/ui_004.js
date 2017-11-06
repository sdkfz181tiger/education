
function setup(){
	//console.log("setup");
	createCanvas(100, 100);
	background(200);
	frameRate(1);

	var dDown = createSelect();
	dDown.option("Large", 1);
	dDown.option("Mid", 2);
	dDown.option("Small", 3);
	dDown.selected(2);
	dDown.position(10, height+10);
	dDown.changed(function(){
		console.log("Answer:" + this.selected());
	});
}

function draw(){
	//console.log("draw");
}