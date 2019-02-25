console.log("custom.js");

let utter;

window.onload = function(){
	console.log("onload!!");

	// Preload
	utter = new SpeechSynthesisUtterance();
	let voices = window.speechSynthesis.getVoices();
	utter.lang     = "ja-JP";
	utter.voiceURI = "Google 日本人";
	utter.volume   = 0.5; // 音量 min 0 ~ max 1
	utter.rate     = 1.0; // 速度 min 0 ~ max 3
	utter.pitch    = 1.0; // 音程 min 0 ~ max 2
	utter.onend = function(e){
		console.log("Time:" + e.elapsedTime);
	}

	$("#btnStart").click(function() {
		speech("こんにちわ", 0.5, 2, 2);
	});
}

function speech(text, volume, rate, pitch){
	console.log(utter);
	// Speech
	utter.text   = text;
	utter.volume = volume; // 音量 min 0 ~ max 1
	utter.rate   = rate;   // 速度 min 0 ~ max 3
	utter.pitch  = pitch;  // 音程 min 0 ~ max 2
	speechSynthesis.speak(utter);
}