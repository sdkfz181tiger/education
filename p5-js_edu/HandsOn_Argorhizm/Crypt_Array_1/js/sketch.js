//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

//==========
// Scratch -> JavaScript
// -> http://ozateck.sakura.ne.jp/wordpress/category/js-x-scratch/

// 添字変換

const tableA = ["あ", "い", "う", "え", "お"];
const tableB = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];

var msg  = "あいうえお";
var str1 = encrypt(msg);
console.log(str1);
var str2 = decrypt(str1);
console.log(str2);

// 暗号化
function encrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var index = tableA.indexOf(str[i], 0);
		result += tableB[index];
	}
	return result;
}

// 復号化
function decrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var index = tableB.indexOf(str[i], 0);
		result += tableA[index];
	}
	return result;
}