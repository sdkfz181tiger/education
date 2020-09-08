
function setup(){
	//console.log("setup");
	noCanvas();
	var fInput = createFileInput(function(file){
		if(file.type == "image"){
			createImg(file.data);
		}
	});
}