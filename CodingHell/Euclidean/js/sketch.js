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

// ユークリッドの互除法

console.log("Hello Euclidean!!");

let numA = 1071;
let numB = 1029;

let result = calc(numA, numB);
console.log(result);

function calc(a, b){

	while(true){
		let q = Math.floor(a / b);
		let r = a % b;
		console.log(a + " / " + b + " = " + q + " ..." + r);
		if(r == 0) return b;
		a = b;
		b = r;
	}
	return -1;
}

