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

const C0 = [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]];
const C1 = [[1,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0]];
const C2 = [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]];
const C3 = [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]];
const C4 = [[1,0,0],[1,0,0],[1,0,1],[1,1,1],[0,0,1]];
const C5 = [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]];
const C6 = [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]];
const C7 = [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]];
const C8 = [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]];
const C9 = [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]];
const CHARS = [C0, C1, C2, C3, C4, C5, C6, C7, C8, C9];

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

	// 時分秒
	let hour = dObj.getHours();
	let min  = dObj.getMinutes();
	let sec  = dObj.getSeconds();

	console.log(hour + ":" + min + ":" + sec);

	// 2次元配列
	let table = createTable();

	// 時
	let hourL = Math.floor(hour / 10);
	let hourR = hour % 10;
	pushTable(table, 0, hourL);
	pushTable(table, 4, hourR);

	// 分
	let minL = Math.floor(min / 10);
	let minR = min % 10;
	pushTable(table, 10, minL);
	pushTable(table, 14, minR);

	// 秒
	let secL = Math.floor(sec / 10);
	let secR = sec % 10;
	pushTable(table, 20, secL);
	pushTable(table, 24, secR);

	// コロン
	table[1][8]  = "2";
	table[3][8]  = "2";
	table[1][18] = "2";
	table[3][18] = "2";

	displayTable(table);
}

function createTable(){
	let table = [];
	for(let r=0; r<5; r++){
		let arr = [];
		for(let c=0; c<28; c++) arr.push(0);
		table.push(arr);
	}
	return table;
}

function pushTable(table, offset, num){
	for(let r=0; r<5; r++){
		for(let c=0; c<3; c++){
			table[r][c+offset] = CHARS[num][r][c]; 
		}
	}
}

function displayTable(table){
	// Display
	for(let r=0; r<5; r++){
		let line = "";
		for(let c=0; c<table[0].length; c++){
			let mark = table[r][c];
			if(mark == 1){
				line += "#";
			}else if(mark == 2){
				line += ".";
			}else{
				line += " ";
			}
		}
		if(r%2 == 0) line += " ";// important
		console.log(line + "\r\n");
	}
}