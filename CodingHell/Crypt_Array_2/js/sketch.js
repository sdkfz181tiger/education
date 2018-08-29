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

const table = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];

var msg  = "あいうえおかきくけこ";
var str1 = encrypt(msg);
console.log(str1);
var str2 = decrypt(str1);
console.log(str2);

// 暗号化
function encrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var index = table.indexOf(str[i], 0);
		if(index < 10) index = "0" + index;
		result += index;
	}
	return result;
}

// 復号化
function decrypt(str){
	var result = "";
	for(var i=0; i<str.length; i+=2){
		var index = Number(str[i] + str[i+1]);
		result += table[index];
	}
	return result;
}