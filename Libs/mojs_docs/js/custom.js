console.log("Hello mojs!!");

var shape = new mojs.Shape({
	shape:        "circle",
	isShowStart:  true
});

window.onload = function(){
	console.log("onload");

	// Audioファイルを用意する
	createAudio(65, "./sounds/coin.mp3");// a
	createAudio(66, "./sounds/cat.mp3");// b
}

document.onkeydown = function(e){
	console.log("KeyCode:" + e.keyCode);
	// "a"が押されたら...
	if(e.keyCode == 65){
		console.log("This is a!!");
		playAudio(65);// Audioファイルを再生する
		// Do something...
	}
	// "b"が押されたら...
	if(e.keyCode == 66){
		console.log("This is b!!");
		playAudio(66);// Audioファイルを再生する
		// Do something...
	}
}

function createAudio(id, src){
	var audio = document.createElement("audio");
	audio.id = id;
	audio.src = src;
	document.body.appendChild(audio);
}

function playAudio(id){
	document.getElementById(id).currentTime = 0;
	document.getElementById(id).play();
}