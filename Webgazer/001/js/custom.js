console.log("custom.js");

window.onload = function(){

	console.log("onload");

	webgazer.setGazeListener(function(data, elapsedTime){
		if(data == null) return;
		var xprediction = data.x; //these x coordinates are relative to the viewport 
		var yprediction = data.y; //these y coordinates are relative to the viewport
		console.log(elapsedTime); //elapsed time is based on time since begin was called
	}).begin();

	// var prediction = webgazer.getCurrentPrediction();
	// if (prediction) {
	//     var x = prediction.x;
	//     var y = prediction.y;
	// }

}


//webgazer.resume();