console.log("Hello utility.js!!");

//==========
// Utility(Voice)

let sUtterance = null;

function initSpeechSynthesis(){
	if(!window.speechSynthesis) return;
	sUtterance = new SpeechSynthesisUtterance();
	let repeat = setInterval(()=>{
		if(sUtterance != null){
			let voices = speechSynthesis.getVoices();
			for(let i=0; i<voices.length; i++){
				if(voices[i].name == "Kyoko"){
					sUtterance.voice = voices[i];// 音声オブジェクト
					sUtterance.rate  = 1.0;      // 速度(0.1-10.0)
					sUtterance.pitch = 1.0;      // ピッチ(0.0-2.0)
					sUtterance.lang  = "ja-JP";  // 日本語に設定
				}
			}
			clearInterval(repeat);
		}
	}, 500);
}

function startSpeech(text){
	if(sUtterance == null) return;
	sUtterance.text = text;
	speechSynthesis.cancel();
	speechSynthesis.speak(sUtterance);
}

function stopSpeech(){
	speechSynthesis.cancel();
}