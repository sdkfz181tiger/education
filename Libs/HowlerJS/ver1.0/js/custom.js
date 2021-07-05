console.log("custom.js");

//==========
// GoogleChromeからアクセス
// http://localhost:8888/education/jquery_api/WebSpeech/

window.onload = function(){
	console.log("onload!!");


	let snd = new Howl({
		src: ['audio/sample.mp3'],
		onend: function(){
			console.log("onend!!");
		}
	});

	// snd.on("load", function(){
	// 	console.log("load");
	// 	snd.play();
	// });

	// snd.on("play", function(){
	// 	console.log("play");
	// });

	// snd.on("end", function(){
	// 	console.log("end");
	// });

	$("#btnStart").click(function() {
		snd.play();
	});

	$("#btnStop").click(function() {
		snd.stop();
	});
}