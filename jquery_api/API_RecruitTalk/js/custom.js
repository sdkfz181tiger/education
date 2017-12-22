console.log("custom.js");

// curl -X POST https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk \
//-F "apikey=k5nqBMOn1Jz74WhMUooI2d0G3NnRqDkz" \
//-F "query=おはよう"

const apiUrl = "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk";
const apiKey = "k5nqBMOn1Jz74WhMUooI2d0G3NnRqDkz";

window.onload = function(){
	console.log("onload!!");

	let query = "好きな食べ物は？";
	var postData = {"apikey":apiKey, "query":query};
	$.post(apiUrl, postData, (data)=>{
		if(data.status == 0){
			let message = data.message;
			let reply = data.results[0].reply;
			console.log("message:" + message);
			console.log("reply:" + reply);
		}else{
			console.log("Error:" + data.status);
		}
	});
}