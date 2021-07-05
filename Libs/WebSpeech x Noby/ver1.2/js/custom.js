console.log("custom.js");

const APP_URL = "https://www.cotogoto.ai/webapi/noby.json";
const APP_KEY = "2162b705a12b3356ac7a7488c9adc6c2";

// SpeechRecognition
// https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition

// SpeechSynthesis
// https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesis

let synthe = null;
let voices = [];

window.onload = (event)=>{
	console.log("onload!!");

	let btnSpeech = document.getElementById("btnSpeech");
	btnSpeech.addEventListener("click", ()=>{
		console.log("SpeechSynthesys");
		let text = document.getElementById("my-input").value;
		startSpeech(text);
	});

	let btnSend = document.getElementById("btnSend");
	btnSend.addEventListener("click", ()=>{
		console.log("Send");
		let text = document.getElementById("my-input").value;
		startNoby(text);
	});

	synthe = window.speechSynthesis;
	console.log(synthe.onvoiceschanged);
	if(synthe.onvoiceschanged == null){
		synthe.onvoiceschanged = ()=>{
			console.log("onvoiceschanged");
			voices = synthe.getVoices();// Chrome
			for(let i = 0; i < voices.length; i++){
				console.log(i, voices[i].lang, voices[i].name)
			}
		}
	}else{
		voices = synthe.getVoices();// Firefox
		for(let i = 0; i < voices.length; i++){
			console.log(i, voices[i].lang, voices[i].name)
		}
	}
}

function startNoby(text){

	// Option
	let option = {
		params:{text: text, appkey: APP_KEY}
	}
	axios.get(APP_URL, option).then((res)=>{
		let reply = res.data.text;
		startSpeech(reply);
		appendChat(reply);
	}).catch((err)=>{
		console.log(err);
	});
}

function startSpeech(text){
	console.log("startSpeech");
	let utter = new SpeechSynthesisUtterance(text);
	utter.voice = voices[50];// Japanese
	//utter.volume = 1.0; // 音量 min 0 ~ max 1
	utter.pitch  = 1.5; // 音程 min 0 ~ max 2
	utter.rate   = 0.5; // 速度 min 0.1 ~ max 10

	synthe.speak(utter);// Speak
}

function appendChat(text){
	let li = document.createElement("li");
	li.innerHTML = text;
	let chat = document.getElementById("my-chat");
	chat.appendChild(li);
}