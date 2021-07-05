console.log("custom.js");

// Noby API
// https://webapi.cotogoto.ai/

const appUrl = "https://www.cotogoto.ai/webapi/noby.json";
const appKey = "2162b705a12b3356ac7a7488c9adc6c2";

window.onload = function(){
	console.log("onload!!");

	$("#myBtn").click(()=>{
		console.log("Hello!!");

		let text = $("#myText").val();
		appendChat("You:" + text);

		let getData = {"text": text, "appkey": appKey};
		$.get(appUrl, getData, (data)=>{
			let text = data.text;
			//console.log("text:" + text);
			let emotionList = data.emotionList;
			//console.log(emotionList);
			let negaposiList = data.negaposiList;
			//console.log(negaposiList);
			appendChat("Noby:" + text);
		});
	});

	function appendChat(str){
		$("#myChat").append("<li>" + str + "</li>");
	}
}