console.log("Hello utility.js!!");

//==========
// SpeechSynthesisUtterance

function startSpeech(text, name="Kyoko", rate=1.0, pitch=3.0, lang="ja-JP"){
	if(!window.speechSynthesis) return;
	let sUtterance = new SpeechSynthesisUtterance();
	let repeat = setInterval(()=>{
		if(sUtterance != null){
			let voices = speechSynthesis.getVoices();
			for(let i=0; i<voices.length; i++){
				if(voices[i].name == name){
					sUtterance.voice = voices[i];// 音声オブジェクト
					sUtterance.rate  = rate;     // 速度(0.1-10.0)
					sUtterance.pitch = pitch;    // ピッチ(0.0-2.0)
					sUtterance.lang  = lang;     // 言語
				}
			}
			sUtterance.text = text;
			speechSynthesis.cancel();
			speechSynthesis.speak(sUtterance);
			clearInterval(repeat);
		}
	}, 100);
}