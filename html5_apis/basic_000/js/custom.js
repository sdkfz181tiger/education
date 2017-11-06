console.log("custom.js");

// Ready
$(document).ready(function(){
	console.log("ready");

	// Search
	$("#myBtn").click(function(){
		console.log("submit!!");
		// 1~6までのランダムを生成
		var rdm = getRandom(1, 6);
		$("#myResult").text(rdm);
		// 画像のパス
		var path = "images/dice_" + rdm + ".png";
		$("#myImg").attr("src", path);
	});
});

// ランダム値を生成する
function getRandom(min, max){
	var range = max + 1 - min;
	var result = Math.floor(Math.random() * range + min);
	return result;
}