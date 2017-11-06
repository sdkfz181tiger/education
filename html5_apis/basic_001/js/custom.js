console.log("custom.js");

// ランダム値を生成する
function getRandom(min, max){
	var range = max + 1 - min;
	var result = Math.floor(Math.random() * range + min);
	return result;
}