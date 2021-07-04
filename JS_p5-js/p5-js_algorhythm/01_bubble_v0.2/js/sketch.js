
// 並び替え前の配列
let nums = [9, 6, 2, 5, 4, 3, 7, 1, 8];

let logger = null;// ロガー

function setup(){
	createCanvas(480, 360);
	angleMode(DEGREES);
	noSmooth();
	frameRate(8);

	textAlign(CENTER, CENTER);
	textSize(24);

	// ロガークラス
	logger = new Logger();

	// バブルソート
	const len = nums.length;
	for(let i=0; i<len; i++){
		for(let j=i+1; j<len; j++){
			if(nums[i] > nums[j]){
				swap(i, j);// 入れ替え処理
				logger.push(nums);// Loggerに配列の状態を追加
			}
		}
	}
}

function draw(){
	background(33);

	const arr = logger.next();// ロガーから1件取り出す

	// 取り出した配列を描画する
	const pX = width / arr.length;
	const sX = width / 2 - (pX * (arr.length-1)) / 2;

	const size = 10;
	for(let i=0; i<arr.length; i++){
		let x = sX + pX * i;// x座標
		let y = height / 2; // y座標
		let n = arr[i];
		fill(99);
		circle(x, y, n * size);
		fill(255);
		text(n, x, y);
	}
}

// 入れ替え処理をする関数
function swap(a, b){
	let tmp = nums[a];
	nums[a] = nums[b];
	nums[b] = tmp;
}

// ロガークラス(配列の様子を記録する)
class Logger{

	constructor(){
		this._logs = [];
		this._idx = 0;
	}
	push(arr){
		this._logs.push(arr.slice());
	}
	next(){
		if(this._idx < this._logs.length-1) this._idx++;
		return this._logs[this._idx];
	}
}