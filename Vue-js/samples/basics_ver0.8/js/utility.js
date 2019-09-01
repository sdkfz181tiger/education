console.log("utility.js!!");

//==========
// Sound
function testSound(){
	// Howler
	let howl = new Howl({src: ["./sounds/minuet_bach.mp3"]});

	howl.on("load", ()=>{
		console.log("onLoad!!");
		howl.play();
	});

	howl.on("play", ()=>{
		console.log("onPlay!!");
	});

	howl.on("end",  ()=>{
		console.log("onEnd!!");
	});
}