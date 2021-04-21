"use strict";

// 終了時刻
let finish;

// インターバルID
let intervalID;

// 開始ボタン
let startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startTimer);// タイマー開始
console.log(startButton);

// 終了ボタン
let stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click", stopTimer);// タイマー終了
console.log(stopButton);

// タイマーを開始する
function startTimer(){
	console.log("startTimer");

	// フォームから値を取得
	let second = document.querySelector("#time-input").value;
	// 終了時刻をグローバル変数に保存
	finish = Date.now() + second * 1000;
	// インターバルIDをグローバル変数に保存
	intervalID = setInterval(checkRemainingTime, 100);

	// 開始ボタンを無効にする
	startButton.disabled = true;
}

// タイマーを終了する
function stopTimer(){
	console.log("stopTimer");

	// インターバルIDを指定してタイマーを停止
	clearInterval(intervalID);

	// 開始ボタンを有効にする
	startButton.disabled = false;
}

// 残り時間をチェックする繰り返し
function checkRemainingTime(){
	// 残り時間を計算する
	let remain = finish - Date.now();
	console.log(remain);
	// 秒に変換する
	let second = Math.floor(remain / 1000) + 1;
	console.log(second);
	// 残り時間を表示する
	setDisplay(second);
	// 残り時間が0になったらタイマーを終了する
	if(remain <= 0){
		stopTimer();// タイマーを終了する
		alert("時間になりました!!");
	}
}

// 残り時間を表示する
function setDisplay(second){
	let countDown = document.querySelector("#count-down");
	countDown.textContent = second;
}

