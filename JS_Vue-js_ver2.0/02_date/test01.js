/*

オブジェクトを使ってみよう

	オブジェクトとは!?
		関連のあるデータと命令の集合
		"new"キーワードでオブジェクトを初期化します。
		初期化されたオブジェクトに対し、
		. (ドット)を使って様々な機能を実行する事ができます。

Dateオブジェクトを使ってみよう

	Dateオブジェクトが出来ること
		日付、時間を取得することができる

	年を取得する命令
		getFullYear()
	月を取得する命令
		getMonth()
	日を取得する命令
		getDate()

使い方
	
	1, オブジェクトを初期化する
	2, オブジェクトを実行する

*/

// Dateオブジェクトを初期化
let myDate = new Date();

// 年を取得
let year = myDate.getFullYear();
console.log(year);

// 月を取得
let month = myDate.getMonth() + 1;
console.log(month);

// 日を取得
let date = myDate.getDate();
console.log(date);

// 曜日を取得
let day = myDate.getDay();
console.log(day);

// 曜日
const arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dow = arr[day];
console.log(dow);

// 1970年01月01日からの経過時間(ミリ秒)
let mill = myDate.getTime();
console.log(mill);
