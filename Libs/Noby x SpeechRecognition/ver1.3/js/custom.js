console.log("custom.js");

//==========
// GoogleChromeからアクセス
// http://localhost:8888/education/jquery_api/WebSpeech/

const appUrl = "https://www.cotogoto.ai/webapi/noby.json";
const appKey = "2162b705a12b3356ac7a7488c9adc6c2";

window.onload = function(){
	console.log("onload!!");

	let rec = new webkitSpeechRecognition();
	rec.continuous = true;
	rec.interimResults = false;
	rec.lang = "ja-JP";

	rec.onresult = function(e){
		for(let i = e.resultIndex; i<e.results.length; ++i){
			if(e.results[i].isFinal){
				let text = e.results[i][0].transcript;
				console.log("Recognised:" + text);
				append("You:" + text);
				recognise(text);
			}
		}
	}

	$("#btnStart").click(function() {
		rec.start();
	});

	$("#btnStop").click(function() {
		rec.stop();
	});

	// Voice
	let utter = new SpeechSynthesisUtterance();
	let voices = window.speechSynthesis.getVoices();
	utter.voice  = voices[7]; // 7:Google 日本人 ja-JP ※他は英語のみ（次項参照）
	utter.volume = 1.0; // 音量 min 0 ~ max 1
	utter.rate   = 0.5; // 速度 min 0 ~ max 10
	utter.pitch  = 1.0; // 音程 min 0 ~ max 2
	utter.lang   = "ja-JP";
	utter.onend = function(e){
		console.log("Time:" + e.elapsedTime);
	}

	function recognise(text){

		let keywords = ["赤", "青", "黄色", "緑"];
		for(keyword of keywords){
			if(text.indexOf(keyword) > -1){
				console.log("発見:" + keyword);
			}
		}

		let getData = {"text": text, "appkey": appKey};
		$.get(appUrl, getData, (data)=>{
			let text = data.text;
			//console.log("text:" + text);
			let emotionList = data.emotionList;
			//console.log(emotionList);
			let negaposiList = data.negaposiList;
			//console.log(negaposiList);
			append("Noby:" + text);
			utter.text = text;
			speechSynthesis.speak(utter);
		});
	}
}

function append(text){
	$("#myChat").append("<li>" + text + "</li>");
}