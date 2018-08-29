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

// デジタル時計を作る

console.log("Hello JavaScript!!");

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

//==========
// タイマーイベントを使う

// 1秒おきにプログラムを動作させる
setInterval(function(){
	// 時計を表示
	showClock();
}, 1000);

// 時計を表示
function showClock(){
	// コンソールをクリアする(オシャレポイント)
	console.clear();

	// 日付オブジェクト
	let dObj  = new Date();

	// 年月日
	let year  = dObj.getYear() + 1900;
	let month = dObj.getMonth() + 1;
	let date  = dObj.getDate();
	let day   = dObj.getDay();
	console.log(year + "年" + month + "月" + date + "日(" + DAYS[day] + ")");

	// 時分秒
	let hours   = dObj.getHours();
	let minutes = dObj.getMinutes();
	let seconds = dObj.getSeconds();
	console.log(hours + "時" + minutes + "分" + seconds + "秒");
}

