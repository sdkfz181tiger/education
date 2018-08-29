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

// シーザー暗号

const SHIFT = 3;
const table = ["あ", "い", "う", "え", "お"];

var msg  = "あいうえお";
var str1 = encrypt(msg);
console.log(str1);
var str2 = decrypt(str1);
console.log(str2);

// 暗号化
function encrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var index = table.indexOf(str[i], 0);
		if(index < 0) continue;
		var n = index + SHIFT;
		if(table.length <= n){
			n -= Math.floor(n / table.length) * table.length;
		}
		result += table[n];
	}
	return result;
}

// 復号化
function decrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var index = table.indexOf(str[i], 0);
		if(index < 0) continue;
		var n = index - SHIFT;
		if(n < 0){
			n -= Math.floor(n / table.length) * table.length;
		}
		result += table[n];
	}
	return result;
}