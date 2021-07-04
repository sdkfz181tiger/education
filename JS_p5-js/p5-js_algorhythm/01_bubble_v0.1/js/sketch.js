
// 変換履歴を格納する配列
let history = [];
let h = 0;// 表示する時に利用するインデックス

// 並び替え前配列
let nums = [9, 6, 2, 5, 4, 3, 7, 1, 8];

function setup(){
	createCanvas(480, 360);
	angleMode(DEGREES);
	noSmooth();
	frameRate(8);

	textAlign(CENTER, CENTER);
	textSize(24);

	// History
	history.push(nums.slice());

	// Bubble sort
	const len = nums.length;
	for(let i=0; i<len; i++){
		for(let j=i+1; j<len; j++){
			if(nums[i] > nums[j]){
				swap(i, j);// 配列の中身を入れ替える
				history.push(nums.slice());// 履歴データに追加する
			}
		}
	}
	console.log(history);
}

// 配列の中身を入れ替える関数
function swap(a, b){
	let tmp = nums[a];
	nums[a] = nums[b];
	nums[b] = tmp;
}

function draw(){
	background(33);

	showBubble(history[h]);// 配列の中身を表示する関数を実行
	if(h < history.length-1){
		h++;
	}else{
		noLoop();
	}
}

// 配列の中身を表示する関数
function showBubble(arr){

	const pX = width / arr.length;
	const sX = width / 2 - (pX * arr.length) / 2;
	const size = 10;
	for(let i=0; i<arr.length; i++){
		let x = sX + pX * i;
		let y = height / 2;
		fill(99);
		circle(x, y, arr[i] * size);
		fill(255);
		text(arr[i], x, y);
	}
}