console.log("custom.js");

//==========
// GoogleChromeからアクセス
// http://localhost:8888/education/jquery_api/WebSpeech/

window.onload = function(){
	console.log("onload!!");

	let rec = new webkitSpeechRecognition();
	rec.continuous = true;
	rec.interimResults = false;
	rec.lang = "ja-JP";

	rec.onresult = function(e){
		for(let i = e.resultIndex; i<e.results.length; ++i){
			if(e.results[i].isFinal){
				let str = e.results[i][0].transcript;
				console.log("Recognised:" + str);
				recognise(str);
				append(str);
			}
		}
	}

	$("#btnStart").click(function() {
		rec.start();
	});

	$("#btnStop").click(function() {
		rec.stop();
	});
}

function recognise(str){

	let keywords = ["赤", "青", "黄色", "緑"];
	for(keyword of keywords){
		if(str.indexOf(keyword) > -1){
			console.log("発見:" + keyword);
		}
	}
}

function append(str){
	$("#myChat").append("<li>" + str + "</li>");
}