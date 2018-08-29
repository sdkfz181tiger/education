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

// 誕生日は何曜日?

// 誕生日から何秒?
// 誕生日から何日?
// 誕生日から何ヶ月?
// 誕生日から何年?

// 「地球が何回回った時?」と聞かれたら即答する
// 1, 地球が誕生してから45億年とする。
// 2, 誕生当初の地球は1年間に1460回転し、現在は365回転している。
// 3, 平均すると45億年の間、1年間に547回転している事になり、合計で246157 x 10^8回転となる。
// 4, 現在の日時との回転数は、45億年の回転数全体からするともはや誤差の範囲。

// 「ノイマン型コンピューターが生まれてから地球が何回回った時?」と聞かれたら即答する
// ノイマン型コンピューター1号機を"EDVAC"とし、その発表は1945年*月*日になり、これを基準にする。

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

console.log("= 今日の日付 =");
showDate(2018, 8, 28);

console.log("= 誕生日の日付 =");
showDate(2018, 1, 1);

console.log("= 自分基準 =");
let days1 = calcDays(2018, 1, 1);
console.log("誕生日から" + days1 + "日経ちました");

console.log("= ノイマン型コンピューター基準 =");
let days2 = calcDays(1945, 8, 1);
console.log("誕生日から" + days2 + "日経ちました");

function showDate(y, m, d){
	// Dateオブジェクトを作る
	let dObj = new Date();
	dObj.setYear(y);
	dObj.setMonth(m-1);
	dObj.setDate(d);
	// Dateオブジェクトを使う
	let year  = dObj.getFullYear();
	let month = dObj.getMonth() + 1;
	let date  = dObj.getDate();
	let day   = dObj.getDay();
	console.log(year + "年" + month + "月" + date + "日(" + DAYS[day] + ")");
}

function calcDays(y, m, d){
	// Dateオブジェクトを作る
	let dObj = new Date();
	dObj.setYear(y);
	dObj.setMonth(m-1);
	dObj.setDate(d);
	// 今日の日付との差を計算する
	let time   = Date.now() - dObj.getTime();
	let result = Math.floor(time / 1000 / 60 / 60 / 24);
	return result;
}
